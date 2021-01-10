import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    Share,
} from 'react-native';
import {
    ActionSheetProvider,
    connectActionSheet,
    useActionSheet,
} from '@expo/react-native-action-sheet';
import { Appbar, Text, Button, withTheme } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import RatingStars from '../../components/RatingStars';
import NoConnection from '../../components/NoConnection';
import AdmobBanner from '../../components/AdmobBanner';
import DetailsLoadingState from '../../components/DetailsLoadingState';
import Anime from '../../api';
import Axios from 'axios';

const { width } = Dimensions.get('window');

const onShare = async (id) => {
    try {
        await Share.share(
            {
                message: `https://cassette.muhammadjanov.uz/movie/${id}`,
            },
            { dialogTitle: 'Cassette 📼' }
        );
    } catch (error) {
        alert(error.message);
    }
};

const Details = ({ navigation, route, theme }) => {
    const source = Axios.CancelToken.source();

    const id = route.params.id;

    const { isConnected } = useNetInfo();

    const { showActionSheetWithOptions } = useActionSheet();
    const [details, setDetails] = useState({});

    const { data, loading, error } = details;

    const setData = (data) => {
        setDetails({ ...details, ...data });
    };

    const anime = new Anime(setData, source);

    useEffect(() => {
        anime.getEpisodes(id);

        return () => {
            source.cancel();
        };
    }, [id]);

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

    const openActionSheet = () => {
        const options = data.episodes[0].sources.map((source) =>
            source.quality.toString()
        );

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: options.length,
                withTitle: true,
                title: 'Choose quality: ',
                containerStyle: {
                    backgroundColor: theme.colors.background,
                },
                textStyle: {
                    color: theme.colors.text,
                },
                titleTextStyle: {
                    color: theme.colors.text,
                },
            },
            (buttonIndex) => {
                data.episodes[0].sources[buttonIndex] &&
                    openPlayer(
                        data.episodes[0].sources[buttonIndex].url,
                        data.episodes[0]._id,
                        data.episodes[0].sources[buttonIndex]._id
                    );
            }
        );
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
                <Appbar.Action icon="send" onPress={() => onShare(id)} />
            </Appbar.Header>

            <DetailsLoadingState loading={loading} />

            {data ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    <View style={styles.backgroundImageContainer}>
                        <ImageBackground
                            blurRadius={3}
                            source={{ uri: data.poster }}
                            style={styles.backgroundImage}
                        >
                            <Image
                                source={{ uri: data.poster }}
                                style={styles.poster}
                            ></Image>
                            <Text style={styles.movieTitle}>{data.title}</Text>
                            <Text style={styles.ratingText}>
                                IMDb {data.rating}
                            </Text>
                            <RatingStars
                                style={styles.ratingStars}
                                value={data.rating}
                            />
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
                                    })
                                }
                                style={styles.watchButton}
                                mode="contained"
                                color={theme.colors.accent}
                                loading={loading}
                            >
                                Seasons
                            </Button>
                        ) : (
                            <Button
                                disabled={
                                    !(
                                        data &&
                                        data.episodes &&
                                        data.episodes.length
                                    )
                                }
                                onPress={() => {
                                    openActionSheet();
                                }}
                                style={styles.watchButton}
                                mode="contained"
                                color={theme.colors.accent}
                                loading={loading}
                            >
                                Watch
                            </Button>
                        )}

                        <View style={styles.admobContainer}>
                            <AdmobBanner style={styles.admob} />
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

const styles = StyleSheet.create({
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
    },
    admob: {
        margin: 0,
        width: width - 40,
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
});
