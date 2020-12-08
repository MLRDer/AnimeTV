import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Appbar, IconButton } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import Slider from '@react-native-community/slider';
import { useNetInfo } from '@react-native-community/netinfo';
import { Audio, Video } from 'expo-av';
import { withDefaultProps } from 'with-default-props';
import {
    FullscreenEnterIcon,
    FullscreenExitIcon,
    PauseIcon,
    ForwardIcon,
    BackwardIcon,
    PlayIcon,
    ReplayIcon,
    Spinner,
} from './icons';

// UI states
var ControlStates;
(function (ControlStates) {
    ControlStates['Shown'] = 'Show';
    ControlStates['Showing'] = 'Showing';
    ControlStates['Hidden'] = 'Hidden';
    ControlStates['Hiding'] = 'Hiding';
})(ControlStates || (ControlStates = {}));
var PlaybackStates;
(function (PlaybackStates) {
    PlaybackStates['Loading'] = 'Loading';
    PlaybackStates['Playing'] = 'Playing';
    PlaybackStates['Paused'] = 'Paused';
    PlaybackStates['Buffering'] = 'Buffering';
    PlaybackStates['Error'] = 'Error';
    PlaybackStates['Ended'] = 'Ended';
})(PlaybackStates || (PlaybackStates = {}));
var SeekStates;
(function (SeekStates) {
    SeekStates['NotSeeking'] = 'NotSeeking';
    SeekStates['Seeking'] = 'Seeking';
    SeekStates['Seeked'] = 'Seeked';
})(SeekStates || (SeekStates = {}));
var ErrorSeverity;
(function (ErrorSeverity) {
    ErrorSeverity['Fatal'] = 'Fatal';
    ErrorSeverity['NonFatal'] = 'NonFatal';
})(ErrorSeverity || (ErrorSeverity = {}));

const defaultProps = {
    videoRef: null,
    children: null,
    debug: false,
    inFullscreen: false,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    fadeInDuration: 200,
    fadeOutDuration: 1000,
    quickFadeOutDuration: 200,
    hideControlsTimerDuration: 5000,
    seekTime: 5000,
    spinnerShowDelay: 200,
    playIcon: PlayIcon,
    replayIcon: ReplayIcon,
    pauseIcon: PauseIcon,
    forwardIcon: ForwardIcon,
    backwardIcon: BackwardIcon,
    spinner: Spinner,
    fullscreenEnterIcon: FullscreenEnterIcon,
    fullscreenExitIcon: FullscreenExitIcon,
    showFullscreenButton: true,
    thumbImage: null,
    iosTrackImage: null,
    videoBackground: '#000',
    sliderColor: '#fff',
    errorCallback: (error) =>
        console.error('Error: ', error.message, error.type, error.obj),
    showControlsOnLoad: true,
    disableSlider: false,
};

const setAudio = async (errorCallback) => {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: false,
        });
    } catch (e) {
        errorCallback({
            type: ErrorSeverity.NonFatal,
            message: 'setAudioModeAsync error',
            obj: e,
        });
    }
};

const rotateScreen = (landscape) => {
    ScreenOrientation.lockAsync(
        landscape
            ? ScreenOrientation.OrientationLock.PORTRAIT
            : ScreenOrientation.OrientationLock.LANDSCAPE
    );
};

const isPlayingOrBufferingOrPaused = (status) => {
    if (!status.isLoaded) {
        return PlaybackStates.Error;
    }
    if (status.isPlaying) {
        return PlaybackStates.Playing;
    }
    if (status.isBuffering) {
        return PlaybackStates.Buffering;
    }
    return PlaybackStates.Paused;
};

const getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = String(Math.floor(totalSeconds % 60));
    const minutes = String(Math.floor((totalSeconds % 3600) / 60));
    const hours = String(Math.floor(totalSeconds / 3600));
    return (
        hours.padStart(2, '0') +
        ':' +
        minutes.padStart(2, '0') +
        ':' +
        seconds.padStart(2, '0')
    );
};

const VideoPlayer = ({
    title,
    source,
    poster,
    navigation,
    fadeInDuration,
    fadeOutDuration,
    quickFadeOutDuration,
    hideControlsTimerDuration,
    seekTime,
    spinnerShowDelay,
    playIcon: VideoPlayIcon,
    replayIcon: VideoReplayIcon,
    pauseIcon: VideoPauseIcon,
    forwardIcon: VideoForwardIcon,
    backwardIcon: VideoBackwardIcon,
    spinner: VideoSpinner,
    fullscreenEnterIcon: VideoFullscreenEnterIcon,
    fullscreenExitIcon: VideoFullscreenExitIcon,
    thumbImage,
    iosTrackImage,
    videoBackground,
    sliderColor,
    errorCallback,
}) => {
    let playbackInstance = null;
    let showingAnimation = null;
    let hideAnimation = null;
    let shouldPlayAtEndOfSeek = true;
    let controlsTimer = null;
    const { isConnected } = useNetInfo();
    const [playbackState, setPlaybackState] = useState(PlaybackStates.Loading);
    const [lastPlaybackStateUpdate, setLastPlaybackStateUpdate] = useState(
        Date.now()
    );
    const [seekState, setSeekState] = useState(SeekStates.NotSeeking);
    const [playbackInstancePosition, setPlaybackInstancePosition] = useState(0);
    const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState(0);
    const [shouldPlay, setShouldPlay] = useState(false);
    const [error, setError] = useState('');
    const [controlsState, setControlsState] = useState(ControlStates.Shown);
    const [controlsOpacity] = useState(new Animated.Value(1));

    const [landscape, setLandscape] = useState(false);

    useEffect(() => {
        if (source === null) {
            console.error('`Source` is a required property');
            throw new Error('`Source` is required');
        }
        setAudio(errorCallback);
    });

    const updatePlaybackState = (newPlaybackState) => {
        if (playbackState !== newPlaybackState) {
            setPlaybackState(newPlaybackState);
            setLastPlaybackStateUpdate(Date.now());
        }
    };

    const updateSeekState = (newSeekState) => {
        setSeekState(newSeekState);
        if (newSeekState === SeekStates.Seeking) {
            controlsTimer && clearTimeout(controlsTimer);
        } else {
            resetControlsTimer();
        }
    };

    const updatePlaybackCallback = (status) => {
        if (!status.isLoaded) {
            if (status.error) {
                updatePlaybackState(PlaybackStates.Error);
                const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
                setError(errorMsg);
                errorCallback({
                    type: ErrorSeverity.Fatal,
                    message: errorMsg,
                    obj: {},
                });
            }
        } else {
            setPlaybackInstancePosition(status.positionMillis || 0);
            setPlaybackInstanceDuration(status.durationMillis || 0);
            setShouldPlay(status.shouldPlay);
            if (
                seekState === SeekStates.NotSeeking &&
                playbackState !== PlaybackStates.Ended
            ) {
                if (status.didJustFinish && !status.isLooping) {
                    updatePlaybackState(PlaybackStates.Ended);
                } else {
                    if (!isConnected && status.isBuffering) {
                        updatePlaybackState(PlaybackStates.Error);
                        setError(
                            'You are probably offline.' +
                                'Please make sure you are connected to the Internet to watch this video'
                        );
                    } else {
                        updatePlaybackState(
                            isPlayingOrBufferingOrPaused(status)
                        );
                    }
                }
            }
        }
    };

    const getSeekSliderPosition = () =>
        playbackInstancePosition / playbackInstanceDuration || 0;

    const onSeekSliderValueChange = async () => {
        if (playbackInstance !== null && seekState !== SeekStates.Seeking) {
            updateSeekState(SeekStates.Seeking);
            shouldPlayAtEndOfSeek =
                seekState === SeekStates.Seeked
                    ? shouldPlayAtEndOfSeek
                    : shouldPlay;
            await playbackInstance.setStatusAsync({ shouldPlay: false });
        }
    };

    const onSeekSliderSlidingComplete = async (value) => {
        if (playbackInstance !== null) {
            updateSeekState(SeekStates.Seeked);
            updatePlaybackState(
                shouldPlayAtEndOfSeek
                    ? PlaybackStates.Buffering
                    : PlaybackStates.Paused
            );
            try {
                const playback = await playbackInstance.setStatusAsync({
                    positionMillis: value * playbackInstanceDuration,
                    shouldPlay: shouldPlayAtEndOfSeek,
                });
                updateSeekState(SeekStates.NotSeeking);
                updatePlaybackState(isPlayingOrBufferingOrPaused(playback));
            } catch (e) {
                console.error('Seek error: ', e);
            }
        }
    };

    const replay = async () => {
        if (playbackInstance !== null) {
            await playbackInstance.setStatusAsync({
                shouldPlay: true,
                positionMillis: 0,
            });
            setPlaybackState(PlaybackStates.Playing);
        }
    };

    const togglePlay = async () => {
        if (controlsState === ControlStates.Hidden) {
            return;
        }
        const shouldPlay = playbackState !== PlaybackStates.Playing;
        if (playbackInstance !== null) {
            await playbackInstance.setStatusAsync({ shouldPlay });
        }
    };

    const seekHandle = async (seek) => {
        if (playbackInstance !== null) {
            updateSeekState(SeekStates.Seeked);
            updatePlaybackState(
                shouldPlayAtEndOfSeek
                    ? PlaybackStates.Buffering
                    : PlaybackStates.Paused
            );
            try {
                const playback = await playbackInstance.setStatusAsync({
                    positionMillis: playbackInstancePosition + seek,
                    shouldPlay: shouldPlayAtEndOfSeek,
                });
                updateSeekState(SeekStates.NotSeeking);
                updatePlaybackState(isPlayingOrBufferingOrPaused(playback));
            } catch (e) {
                console.error('Seek error: ', e);
            }
        }
    };

    const toggleControls = () => {
        switch (controlsState) {
            case ControlStates.Shown:
                // If the controls are currently Shown, a tap should hide controls quickly
                setControlsState(ControlStates.Hiding);
                hideControls(true);
                break;
            case ControlStates.Hidden:
                // If the controls are currently, show controls with fade-in animation
                setControlsState(ControlStates.Shown);
                showControls();
                break;
            case ControlStates.Hiding:
                // If controls are fading out, a tap should reverse, and show controls
                setControlsState(ControlStates.Shown);
                showControls();
                break;
            case ControlStates.Showing:
                // A tap when the controls are fading in should do nothing
                break;
        }
    };

    const showControls = () => {
        showingAnimation = Animated.timing(controlsOpacity, {
            toValue: 1,
            duration: fadeInDuration,
            useNativeDriver: true,
        });
        showingAnimation.start(({ finished }) => {
            if (finished) {
                setControlsState(ControlStates.Shown);
                resetControlsTimer();
            }
        });
    };

    const hideControls = (immediately = false) => {
        if (controlsTimer) {
            clearTimeout(controlsTimer);
        }
        hideAnimation = Animated.timing(controlsOpacity, {
            toValue: 0,
            duration: immediately ? quickFadeOutDuration : fadeOutDuration,
            useNativeDriver: true,
        });
        hideAnimation.start(({ finished }) => {
            if (finished) {
                setControlsState(ControlStates.Hidden);
            }
        });
    };

    const onTimerDone = () => {
        // After the controls timer runs out, fade away the controls slowly
        setControlsState(ControlStates.Hiding);
        hideControls();
    };

    const resetControlsTimer = () => {
        if (controlsTimer) {
            clearTimeout(controlsTimer);
        }
        controlsTimer = setTimeout(
            () => onTimerDone(),
            hideControlsTimerDuration
        );
    };

    const Control = ({ callback, children }) => {
        return (
            <IconButton
                size={32}
                rippleColor="#333"
                onPress={callback}
                icon={() => children}
            />
        );
    };

    const CenteredView = ({ children }) => {
        return (
            <Animated.View style={styles.centeredView}>
                {children}
            </Animated.View>
        );
    };

    const ErrorText = ({ text }) => (
        <Text style={[styles.textStyle, { textAlign: 'center' }]}>{text}</Text>
    );

    return (
        <View style={styles.container}>
            <Video
                source={source}
                posterSource={poster}
                ref={(component) => (playbackInstance = component)}
                onPlaybackStatusUpdate={updatePlaybackCallback}
                style={{
                    flex: 1,
                    backgroundColor: videoBackground,
                }}
                resizeMode="contain"
                usePoster={true}
                shouldPlay={true}
            />

            <View style={styles.mainContainer}>
                <TouchableWithoutFeedback
                    style={styles.flex}
                    onPress={toggleControls}
                >
                    <View style={styles.innerContainer}>
                        <StatusBar style="light" />

                        {((playbackState === PlaybackStates.Buffering &&
                            Date.now() - lastPlaybackStateUpdate >
                                spinnerShowDelay) ||
                            playbackState === PlaybackStates.Loading) && (
                            <CenteredView>
                                <VideoSpinner />
                            </CenteredView>
                        )}

                        {playbackState === PlaybackStates.Ended && (
                            <CenteredView>
                                <Control callback={replay}>
                                    <VideoReplayIcon />
                                </Control>
                            </CenteredView>
                        )}

                        {playbackState === PlaybackStates.Error && (
                            <CenteredView>
                                <ErrorText text={error} />
                            </CenteredView>
                        )}

                        <Animated.View
                            pointerEvents={
                                controlsState === ControlStates.Hidden
                                    ? 'none'
                                    : 'auto'
                            }
                            style={{
                                opacity: controlsOpacity,
                            }}
                        >
                            <Appbar.Header style={styles.appbarHeader}>
                                <Appbar.Action
                                    icon="arrow---left"
                                    rippleColor="#fff"
                                    color="#fff"
                                    onPress={() => {
                                        ScreenOrientation.lockAsync(
                                            ScreenOrientation.OrientationLock
                                                .PORTRAIT
                                        );
                                        navigation.navigate('BottomNavigation');
                                    }}
                                />
                                <Appbar.Content
                                    title={title}
                                    titleStyle={styles.appbarText}
                                />

                                <Appbar.Action
                                    icon={() => {
                                        console.log(landscape);
                                        if (landscape)
                                            return <VideoFullscreenExitIcon />;
                                        return <VideoFullscreenEnterIcon />;
                                    }}
                                    rippleColor="#fff"
                                    color="#fff"
                                    onPress={() => {
                                        rotateScreen(landscape);
                                        setLandscape(!landscape);
                                    }}
                                />
                            </Appbar.Header>
                        </Animated.View>

                        <Animated.View
                            pointerEvents={
                                controlsState === ControlStates.Hidden
                                    ? 'none'
                                    : 'auto'
                            }
                            style={{
                                opacity: controlsOpacity,
                                alignItems: 'center',
                            }}
                        >
                            <View style={styles.controlButtons}>
                                <Control callback={() => seekHandle(-seekTime)}>
                                    <VideoBackwardIcon />
                                </Control>
                                <Control callback={togglePlay}>
                                    {playbackState ===
                                    PlaybackStates.Playing ? (
                                        <VideoPauseIcon />
                                    ) : (
                                        <VideoPlayIcon />
                                    )}
                                </Control>
                                <Control callback={() => seekHandle(seekTime)}>
                                    <VideoForwardIcon />
                                </Control>
                            </View>

                            <View style={styles.seekBar}>
                                <Text
                                    style={[
                                        styles.textStyle,
                                        {
                                            width: 60,
                                        },
                                    ]}
                                >
                                    {getMMSSFromMillis(
                                        playbackInstancePosition
                                    )}
                                </Text>
                                <View style={styles.flex}>
                                    <Slider
                                        style={styles.slider}
                                        thumbTintColor={sliderColor}
                                        minimumTrackTintColor={sliderColor}
                                        maximumTrackTintColor={'#eee'}
                                        trackImage={iosTrackImage}
                                        thumbImage={thumbImage}
                                        value={getSeekSliderPosition()}
                                        onValueChange={onSeekSliderValueChange}
                                        onSlidingComplete={
                                            onSeekSliderSlidingComplete
                                        }
                                        disabled={
                                            playbackState ===
                                                PlaybackStates.Loading ||
                                            playbackState ===
                                                PlaybackStates.Error
                                        }
                                    />
                                </View>

                                <Text
                                    style={[
                                        styles.textStyle,
                                        styles.durationText,
                                    ]}
                                >
                                    {getMMSSFromMillis(
                                        playbackInstanceDuration
                                    )}
                                </Text>
                            </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, position: 'relative', backgroundColor: '#000' },
    mainContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    innerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    appbarHeader: { backgroundColor: 'transparent' },
    appbarText: { color: '#fff' },
    textStyle: {
        color: '#FFF',
        fontSize: 12,
    },
    slider: {
        flex: 1,
        marginHorizontal: -16,
    },
    durationText: {
        width: 60,
        textAlign: 'right',
    },
    controlButtons: {
        flexDirection: 'row',
    },
    flex: { flex: 1 },
    seekBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 24,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default withDefaultProps(VideoPlayer, defaultProps);
