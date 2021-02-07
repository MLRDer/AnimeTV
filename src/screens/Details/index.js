import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    Share,
    RefreshControl,
} from 'react-native';
import {
    ActionSheetProvider,
    connectActionSheet,
    useActionSheet,
} from '@expo/react-native-action-sheet';
import { Appbar, Text, Button, withTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import { useNetInfo } from '@react-native-community/netinfo';
import RatingStars from '../../components/RatingStars';
import NoConnection from '../../components/NoConnection';
import AdmobBanner from '../../components/AdmobBanner';
import DetailsLoadingState from '../../components/DetailsLoadingState';
import SourcesLoading from '../../components/SourcesLoading';
import Anime from '../../api';
import Axios from 'axios';

const { width } = Dimensions.get('window');

const onShare = async (id, name) => {
    try {
        await Share.share(
            {
                message: `https://cassette.muhammadjanov.uz/movie/${id}`,
            },
            { dialogTitle: name }
        );
    } catch (error) {
        alert(error.message);
    }
};

const Details = ({ navigation, route, theme }) => {
    const styles = createStyles(theme);
    const source = Axios.CancelToken.source();

    const id = route.params.id;

    const { isConnected } = useNetInfo();
    const [refreshing, setRefreshing] = useState(null);
    const [dynamicSources, setDynamicSources] = useState(null);
    const [adLoaded, setAdLoaded] = useState(false);
    const [sourcesLoading, setSourcesLoading] = useState(false);

    const { showActionSheetWithOptions } = useActionSheet();
    const [details, setDetails] = useState({});

    const { data, loading, error } = details;

    const setData = (data) => {
        setDetails({ ...details, ...data });
        setRefreshing(false);
    };

    const api = new Anime(setData, source);

    useEffect(() => {
        api.getEpisodes(id);

        return () => {
            source.cancel();
        };
    }, [id]);

    const refresh = () => {
        setRefreshing(true);
        api.getEpisodes(id, false);
    };

    const onRefresh = useCallback(refresh, [refreshing]);

    const openPlayer = (source, episodeId, sourceId) => {
        if (isConnected) {
            navigation.navigate('Player', {
                id: data._id,
                title: data.title,
                source,
                episodeId,
                sourceId,
                poster: data.image,
            });
        } else {
            showModal();
        }
    };

    const openActionSheet = async () => {
        try {
            let options, callback;

            if (data.hdrezka) {
                setSourcesLoading(true);

                let sources;
                if (!dynamicSources) {
                    sources = await api.getSources(data.hdrezka);
                    setDynamicSources(sources);
                } else {
                    sources = dynamicSources;
                }

                options = sources.map((source) => source.quality);

                callback = (index) =>
                    sources[index] && openPlayer(sources[index].url);
                setSourcesLoading(false);
            } else {
                options = data.episodes[0].sources.map((source) =>
                    source.quality.toString()
                );

                callback = (index) =>
                    data.episodes[0].sources[index] &&
                    openPlayer(
                        data.episodes[0].sources[index].url,
                        data.episodes[0]._id,
                        data.episodes[0].sources[index]._id
                    );
            }

            showActionSheetWithOptions(
                {
                    options,
                    withTitle: true,
                    title: 'Choose quality: ',
                    cancelButtonIndex: options.length,
                    titleTextStyle: styles.actionSheetText,
                    textStyle: styles.actionSheetText,
                    containerStyle: styles.actionSheetContainer,
                },
                callback
            );
        } catch (error) {
            setSourcesLoading(false);
            console.log(error);
            alert('Something went wrong! Try again later.');
        }
    };

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('BottomNavigation');
        }
    };

    return (
        <View
            style={[
                {
                    backgroundColor: theme.colors.background,
                    flex: 1,
                },
            ]}
        >
            <SourcesLoading loading={sourcesLoading} />

            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.surface,
                }}
            >
                <Appbar.Action icon="arrow---left" onPress={goBack} />
                <Appbar.Content
                    title="Details"
                    style={{
                        marginLeft: -8,
                    }}
                />
                <Appbar.Action
                    icon="send"
                    onPress={() => onShare(id, data.title)}
                />
            </Appbar.Header>

            <DetailsLoadingState loading={loading} />

            {data ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.backgroundImageContainer}>
                        <ImageBackground
                            blurRadius={2}
                            source={{ uri: data.poster }}
                            style={styles.backgroundImage}
                        >
                            <LinearGradient
                                colors={['transparent', theme.colors.accent]}
                                style={styles.linearGradient}
                            >
                                <Image
                                    source={{ uri: data.poster }}
                                    style={styles.poster}
                                ></Image>
                                <Text style={styles.movieTitle}>
                                    {data.title}
                                </Text>
                                <Text style={styles.ratingText}>
                                    IMDb {data.rating.toFixed(1)}
                                </Text>
                                <RatingStars
                                    style={styles.ratingStars}
                                    value={data.rating}
                                />
                            </LinearGradient>
                        </ImageBackground>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.originalTitle}>
                            {data.originalTitle
                                ? data.originalTitle
                                : data.title}{' '}
                            ({data.year})
                        </Text>
                        <Text style={styles.categories}>{data.categories.map(
                            (category) =>
                                category.slice(0, 1).toUpperCase() +
                                category.slice(1)
                        ).join`, `}</Text>

                        {data.isSerial ? (
                            <Button
                                disabled={
                                    !(
                                        data &&
                                        data.episodes &&
                                        data.episodes.length
                                    )
                                }
                                onPress={() =>
                                    navigation.navigate('Seasons', {
                                        episodes: data.episodes,
                                        title: data.title,
                                        image: data.image,
                                        id: data._id,
                                        hdrezka: data.hdrezka,
                                    })
                                }
                                style={styles.watchButton}
                                mode="contained"
                                color={theme.colors.primary}
                                loading={loading}
                            >
                                Series
                            </Button>
                        ) : (
                            <Button
                                disabled={
                                    !data.hdrezka &&
                                    !(
                                        data.episodes.length &&
                                        data.episodes[0].sources.length
                                    )
                                }
                                onPress={() => {
                                    openActionSheet();
                                }}
                                style={styles.watchButton}
                                mode="contained"
                                color={theme.colors.primary}
                                loading={loading}
                            >
                                Watch
                            </Button>
                        )}

                        <View style={styles.admobContainer}>
                            <AdmobBanner
                                width={Dimensions.get('window').width - 40}
                            />
                        </View>

                        <View>
                            <Text style={styles.descriptionHeadline}>
                                Summary
                            </Text>
                            <Text style={styles.description}>
                                {data.description}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            ) : null}

            <NoConnection visible={visible} hideModal={hideModal} />
        </View>
    );
};

const ConnectedApp = connectActionSheet(withTheme(Details));

export default ({ navigation, route }) => {
    return (
        <>
            <ActionSheetProvider>
                <ConnectedApp navigation={navigation} route={route} />
            </ActionSheetProvider>
        </>
    );
};

const createStyles = (theme) =>
    StyleSheet.create({
        poster: {
            width: width / 3,
            height: width / 2,
            borderRadius: 4,
        },
        scrollViewContainer: { paddingBottom: 24 },
        backgroundImageContainer: {
            borderRadius: 8,
            margin: 16,
            overflow: 'hidden',
        },
        backgroundImage: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        linearGradient: {
            flex: 1,
            width: '100%',
            padding: 32,
            flexDirection: 'column',
            alignItems: 'center',
        },
        movieTitle: {
            fontSize: 16,
            marginTop: 32,
            color: '#fff',
            textAlign: 'center',
            paddingHorizontal: 8,
        },
        ratingText: {
            fontSize: 16,
            marginTop: 8,
            color: '#fff',
        },
        ratingStars: {
            marginTop: 12,
        },
        container: { paddingHorizontal: 20 },
        originalTitle: {
            fontSize: 16,
            fontFamily: 'Montserrat SemiBold',
        },
        categories: { fontSize: 14, marginTop: 8 },
        watchButton: {
            marginTop: 16,
            flex: 1,
            elevation: 0,
        },
        admobContainer: {
            backgroundColor: 'transparent',
            alignItems: 'center',
            padding: 0,
            margin: 0,
            borderRadius: 4,
            marginTop: 16,
            overflow: 'hidden',
        },
        descriptionHeadline: {
            fontSize: 16,
            marginTop: 16,
            fontFamily: 'Montserrat SemiBold',
        },
        description: {
            marginTop: 8,
            lineHeight: 20,
        },
        actionSheetContainer: {
            backgroundColor: theme.colors.background,
        },
        actionSheetText: {
            color: theme.colors.text,
        },
    });
