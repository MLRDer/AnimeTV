import React, { useEffect, useState } from 'react';
import {
    View,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    BackHandler,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    withTheme,
    Text,
    ActivityIndicator,
    Appbar,
    Button,
    IconButton,
} from 'react-native-paper';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNetInfo } from '@react-native-community/netinfo';
import Slider from '@react-native-community/slider';
import { Audio, Video } from 'expo-av';
import Constants from 'expo-constants';
import {
    PlayIcon,
    PauseIcon,
    BackwardIcon,
    ForwardIcon,
    FullscreenEnterIcon,
    FullscreenExitIcon,
} from './icons';
import VideoError from '../VideoError';
import { log } from 'react-native-reanimated';

const formatMillis = (millis) => {
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

const setAudio = async () => {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: false,
            shouldDuckAndroid: true,
            interruptionModeAndroid:
                Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: false,
        });
    } catch (e) {
        console.log({
            type: ErrorSeverity.NonFatal,
            message: 'setAudioModeAsync error',
            obj: e,
        });
    }
};

const NurikVideoPlayer = ({
    title,
    source,
    poster,
    goBack,
    videoPlayError,
    theme,
}) => {
    const styles = createStyles(theme);

    let player = null;
    let showingAnimation = null;
    let hideAnimation = null;

    const { isConnected } = useNetInfo();

    const [viewOpacity] = useState(new Animated.Value(1));
    const [backwardOpacity] = useState(new Animated.Value(0));
    const [forwardOpacity] = useState(new Animated.Value(0));
    const [hidden, setHidden] = useState(false);
    const [timer, setTimer] = useState(null);
    const [countBackward, setCountBackward] = useState(0);
    const [countForward, setCountForward] = useState(0);
    const [lastPressBackward, setLastPressBackward] = useState(0);
    const [lastPressForward, setLastPressForward] = useState(0);

    const [landscape, setLandscape] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [errorText, setErrorText] = useState(null);
    const [error, setError] = useState(null);
    const [duration, setDuration] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [progress, setProgress] = useState(0);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [visible, setVisible] = useState(false);

    const { width, height } = {
        width: landscape ? dimensions.height : dimensions.width,
        height: landscape ? dimensions.width : dimensions.height,
    };

    useEffect(() => {
        if (player !== null) {
            player.loadAsync(source, { shouldPlay: true }, false).catch((e) => {
                console.log('Load error: ', e);
            });
        }
        resetTimer();

        return () => {
            player && player.unloadAsync();
            clearTimeout(timer);
        };
    }, [player]);

    useEffect(() => {
        if (error) setVisible(true);
    }, [error]);

    useEffect(() => {
        setAudio();
        activateKeepAwake();

        return () => {
            deactivateKeepAwake();
        };
    });

    useEffect(() => {
        const backAction = () => {
            handleBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onPlaybackStatusUpdate = ({
        isLoaded,
        error,
        positionMillis,
        durationMillis,
        playableDurationMillis,
        isPlaying,
        isBuffering,
    }) => {
        if (!isLoaded && error) {
            setError(error);
            setErrorText(
                !isConnected
                    ? 'You are probably offline. Please make sure you are connected to the Internet'
                    : 'After analysing the issue, we will fix it as soon as possible!'
            );
        } else {
            setDuration(durationMillis || 0);
            setProgress(positionMillis || 0);
            setLoaded(playableDurationMillis || 0);
            setPlaying(isPlaying || false);

            if (!isConnected && isBuffering) {
                setErrorText(
                    'You are probably offline.' +
                        'Please make sure you are connected to the Internet to watch this video'
                );
            }
        }
    };

    const resetTimer = () => {
        timer && clearTimeout(timer);

        setTimer(setTimeout(hideControls, 15000));
    };

    const rotateScreen = (force = false) => {
        ScreenOrientation.lockAsync(
            landscape || force
                ? ScreenOrientation.OrientationLock.PORTRAIT
                : ScreenOrientation.OrientationLock.LANDSCAPE
        );

        setLandscape(force ? false : !landscape);
    };

    const hideModal = () => {
        if (!error) setVisible(false);
    };

    const showControls = () => {
        setHidden(false);
        resetTimer();

        showingAnimation = Animated.timing(viewOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        });
        showingAnimation.start();
    };

    const hideControls = () => {
        hideAnimation = Animated.timing(viewOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        });
        hideAnimation.start();

        clearTimeout(timer);
        setHidden(true);
    };

    const toggleControls = () => {
        if (hidden) showControls();
        else hideControls();
    };

    const togglePlayer = () => {
        if (player !== null) {
            try {
                player.setStatusAsync({
                    shouldPlay: !playing,
                });
            } catch (e) {
                console.error('Seek error: ', e);
            }
        }
    };

    const seek = (factor) => {
        if (player !== null) {
            try {
                player.setPositionAsync(progress + 5000 * factor);
                player.setStatusAsync({
                    shouldPlay: playing,
                });
            } catch (e) {
                console.error('Seek error: ', e);
            }
        }
    };

    const slideComplete = (value) => {
        if (player !== null) {
            try {
                player.setStatusAsync({
                    positionMillis: value * duration,
                    shouldPlay: playing,
                });
            } catch (e) {
                console.error('Seek error: ', e);
            }
        }
    };

    var handleBack = () => {
        rotateScreen(true);
        goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar
                style="light"
                backgroundColor="transparent"
                hidden={landscape}
            />
            <VideoError
                visible={visible}
                hideModal={hideModal}
                onSubmit={() => {
                    setVisible(false);
                    videoPlayError({ error });
                }}
                error={errorText}
            />

            <View
                style={[
                    styles.controls,
                    {
                        flex: 1,
                        justifyContent: 'space-between',
                    },
                ]}
            >
                <Animated.View
                    style={{
                        opacity: viewOpacity,
                    }}
                    pointerEvents={hidden ? 'none' : 'auto'}
                >
                    <Appbar
                        style={{
                            backgroundColor: 'transparent',
                            width,
                            marginTop: landscape
                                ? 0
                                : Constants.statusBarHeight,
                        }}
                    >
                        <Appbar.Action
                            icon="arrow---left"
                            color={theme.colors.white}
                            onPress={handleBack}
                        />
                        <Appbar.Content
                            title={title}
                            style={{
                                marginLeft: -8,
                            }}
                            titleStyle={{
                                color: theme.colors.white,
                                fontSize: 18,
                                fontFamily: 'Montserrat Regular',
                            }}
                            onPress={toggleControls}
                        />
                        <Appbar.Action
                            icon={
                                landscape
                                    ? FullscreenExitIcon
                                    : FullscreenEnterIcon
                            }
                            color={theme.colors.white}
                            onPress={() => {
                                rotateScreen();
                            }}
                        />
                    </Appbar>
                </Animated.View>

                <View
                    style={{
                        flex: 1,
                        width,
                    }}
                >
                    <TouchableWithoutFeedback onPress={toggleControls}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                position: 'relative',
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    zIndex: 13,
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        borderRadius: 1000,
                                        width: height / 1.5,
                                        height: height / 1.5,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            var delta =
                                                new Date().getTime() -
                                                lastPressBackward;

                                            console.log(
                                                lastPressBackward,
                                                delta
                                            );

                                            if (delta < 500) {
                                                console.log('DOUBLE TAP');
                                                seek(-1);
                                                showingAnimation = Animated.timing(
                                                    backwardOpacity,
                                                    {
                                                        toValue: 1,
                                                        duration: 50,
                                                        useNativeDriver: true,
                                                    }
                                                );
                                                showingAnimation.start(() => {
                                                    hideAnimation = Animated.timing(
                                                        backwardOpacity,
                                                        {
                                                            toValue: 0,
                                                            duration: 0,
                                                            useNativeDriver: true,
                                                        }
                                                    );
                                                    hideAnimation.start(() => {
                                                        showingAnimation = Animated.timing(
                                                            backwardOpacity,
                                                            {
                                                                toValue: 1,
                                                                duration: 50,
                                                                useNativeDriver: true,
                                                            }
                                                        );
                                                        showingAnimation.start(
                                                            () => {
                                                                hideAnimation = Animated.timing(
                                                                    backwardOpacity,
                                                                    {
                                                                        toValue: 0,
                                                                        duration: 0,
                                                                        useNativeDriver: true,
                                                                    }
                                                                );
                                                                hideAnimation.start();
                                                            }
                                                        );
                                                    });
                                                });
                                            }

                                            setLastPressBackward(
                                                new Date().getTime()
                                            );
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: height / 1.5,
                                                height: height / 1.5,
                                            }}
                                        >
                                            <Animated.View
                                                style={{
                                                    width: height / 1.5,
                                                    height: height / 1.5,
                                                    // opacity: backwardOpacity,
                                                }}
                                                pointerEvents={
                                                    hidden ? 'none' : 'auto'
                                                }
                                            >
                                                <View
                                                    style={{
                                                        width: height / 1.5,
                                                        height: height / 1.5,
                                                        backgroundColor: 'red',
                                                    }}
                                                ></View>
                                            </Animated.View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                                <View
                                    style={{
                                        borderRadius: 1000,
                                        width: height / 1.5,
                                        height: height / 1.5,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            var delta =
                                                new Date().getTime() -
                                                lastPressForward;

                                            console.log(
                                                lastPressForward,
                                                delta
                                            );

                                            if (delta < 500) {
                                                console.log('DOUBLE TAP');
                                                seek(1);
                                                showingAnimation = Animated.timing(
                                                    forwardOpacity,
                                                    {
                                                        toValue: 1,
                                                        duration: 50,
                                                        useNativeDriver: true,
                                                    }
                                                );
                                                showingAnimation.start(() => {
                                                    hideAnimation = Animated.timing(
                                                        forwardOpacity,
                                                        {
                                                            toValue: 0,
                                                            duration: 0,
                                                            useNativeDriver: true,
                                                        }
                                                    );
                                                    hideAnimation.start(() => {
                                                        showingAnimation = Animated.timing(
                                                            forwardOpacity,
                                                            {
                                                                toValue: 1,
                                                                duration: 50,
                                                                useNativeDriver: true,
                                                            }
                                                        );
                                                        showingAnimation.start(
                                                            () => {
                                                                hideAnimation = Animated.timing(
                                                                    forwardOpacity,
                                                                    {
                                                                        toValue: 0,
                                                                        duration: 0,
                                                                        useNativeDriver: true,
                                                                    }
                                                                );
                                                                hideAnimation.start();
                                                            }
                                                        );
                                                    });
                                                });
                                            }

                                            setLastPressForward(
                                                new Date().getTime()
                                            );
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: height / 1.5,
                                                height: height / 1.5,
                                            }}
                                        >
                                            <Animated.View
                                                style={{
                                                    width: height / 1.5,
                                                    height: height / 1.5,
                                                    opacity: forwardOpacity,
                                                }}
                                                pointerEvents={
                                                    hidden ? 'none' : 'auto'
                                                }
                                            >
                                                <View
                                                    style={{
                                                        width: height / 1.5,
                                                        height: height / 1.5,
                                                        backgroundColor: 'red',
                                                    }}
                                                ></View>
                                            </Animated.View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </View>

                            {error ? (
                                <Text style={styles.errorContainer}>
                                    {error}
                                </Text>
                            ) : loaded - progress < (playing ? 1000 : 5000) ? (
                                <ActivityIndicator
                                    size="large"
                                    color={theme.colors.primary}
                                />
                            ) : null}
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <Animated.View
                    style={{
                        opacity: viewOpacity,
                    }}
                    pointerEvents={hidden ? 'none' : 'auto'}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            width,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: 8,
                            }}
                        >
                            <IconButton
                                size={32}
                                onPress={() => seek(-1)}
                                icon={BackwardIcon}
                            />
                            <IconButton
                                size={32}
                                onPress={togglePlayer}
                                icon={playing ? PauseIcon : PlayIcon}
                            />
                            <IconButton
                                size={32}
                                onPress={() => seek(1)}
                                icon={ForwardIcon}
                            />
                        </View>
                        <View style={styles.bottomControls}>
                            <Text style={styles.time}>
                                {formatMillis(progress)}
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <Slider
                                    style={styles.slider}
                                    thumbTintColor={theme.colors.primary}
                                    minimumTrackTintColor={theme.colors.primary}
                                    maximumTrackTintColor={'transparent'}
                                    value={progress / duration || 0}
                                    onSlidingComplete={slideComplete}
                                />
                                <Slider
                                    style={{
                                        flex: 1,
                                    }}
                                    thumbTintColor={'transparent'}
                                    minimumTrackTintColor={theme.colors.gray}
                                    maximumTrackTintColor={
                                        theme.colors.disabled
                                    }
                                    value={loaded / duration || 0}
                                />
                            </View>
                            <Text style={styles.time}>
                                {formatMillis(duration)}
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
            <Video
                ref={(component) => {
                    player = component;
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay={true}
                isLooping
                style={{ width, height }}
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                usePoster={true}
                posterSource={poster}
            />
        </View>
    );
};

const createStyles = (theme) => ({
    container: {
        flex: 1,
        backgroundColor: '#000',
        position: 'relative',
    },
    controls: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    errorContainer: {
        textAlign: 'center',
        backgroundColor: theme.colors.red,
        color: '#fff',
        padding: 16,
        margin: 8,
        borderRadius: 4,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    slider: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    time: {
        width: 64,
        textAlign: 'center',
        color: theme.colors.white,
    },
});

export default withTheme(NurikVideoPlayer);
