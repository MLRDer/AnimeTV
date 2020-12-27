import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
} from 'react-native';
import {
    Appbar,
    Text,
    Button,
    Portal,
    Modal,
    Subheading,
} from 'react-native-paper';
import {
    ActionSheetProvider,
    connectActionSheet,
    useActionSheet,
} from '@expo/react-native-action-sheet';
import RatingStars from '../../components/RatingStars';
import Anime from '../../api';
import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from '@react-native-community/netinfo';

const Details = ({ navigation }) => {
    const { isConnected } = useNetInfo();

    const item = navigation.state.params;
    const { showActionSheetWithOptions } = useActionSheet();
    const [apiState, setApiState] = useState({});

    const { data, loading, error } = apiState;

    const setEpisodes = (d) => {
        setApiState({ ...apiState, ...d });
    };

    const anime = new Anime(setEpisodes);

    useEffect(() => {
        anime.getEpisodes(item._id);
    }, []);

    const openPlayer = (source) => {
        if (isConnected) {
            navigation.navigate('Player', {
                title: item.title,
                poster: item.image,
                source,
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
            },
            (buttonIndex) => {
                data.episodes[0].sources[buttonIndex] &&
                    openPlayer(data.episodes[0].sources[buttonIndex].url);
            }
        );
    };

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: '#fff', paddingBottom: 24 }}
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                <View
                    style={{ borderRadius: 8, margin: 16, overflow: 'hidden' }}
                >
                    <ImageBackground
                        blurRadius={8}
                        source={{ uri: item.poster }}
                        style={{
                            flex: 1,
                            padding: 24,
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={{ uri: item.poster }}
                            style={styles.poster}
                        ></Image>
                        <Text
                            style={{
                                fontSize: 16,
                                marginTop: 24,
                                color: '#fff',
                                textAlign: 'center',
                                paddingHorizontal: 8,
                            }}
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                marginTop: 8,
                                color: '#fff',
                            }}
                        >
                            IMDb {item.rating}
                        </Text>
                        <RatingStars
                            style={{ marginTop: 12 }}
                            value={item.rating}
                        />
                    </ImageBackground>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 8, flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'Montserrat SemiBold',
                        }}
                    >
                        {item.originalTitle ? item.originalTitle : item.title} (
                        {item.year})
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: 8 }}>{item
                        .categories.join`, `}</Text>

                    <View
                        style={{
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            marginTop: 16,
                        }}
                    >
                        {item.isSerial ? (
                            <>
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
                                            image: item.image,
                                        })
                                    }
                                    style={{ flex: 1, elevation: 0 }}
                                    mode="contained"
                                    color="#34495e"
                                    loading={loading}
                                >
                                    Seasons
                                </Button>
                            </>
                        ) : (
                            <>
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
                                    style={{
                                        flex: 1,
                                        elevation: 0,
                                    }}
                                    mode="contained"
                                    color="#34495e"
                                    loading={loading}
                                >
                                    Watch
                                </Button>
                            </>
                        )}
                    </View>

                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginTop: 16,
                                fontFamily: 'Montserrat SemiBold',
                            }}
                        >
                            Summary
                        </Text>
                        <Text
                            style={{
                                marginTop: 8,
                                lineHeight: 20,
                                textAlign: 'justify',
                            }}
                        >
                            {item.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={{
                        backgroundColor: '#fff',
                        padding: 24,
                        margin: 32,
                        borderRadius: 4,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={require('../../../assets/compass.png')}
                        resizeMode="contain"
                        fadeDuration={0}
                        style={{
                            width: 160,
                            height: 160,
                            marginBottom: 16,
                        }}
                    />
                    <Subheading>{'Probably you are offline'}</Subheading>

                    <Text
                        style={{
                            marginBottom: 8,
                            marginTop: 8,
                            textAlign: 'center',
                        }}
                    >
                        Check your internet connection and try again
                    </Text>
                </Modal>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    poster: {
        width: 160,
        height: 240,
        borderRadius: 4,
    },
});

const ConnectedApp = connectActionSheet(Details);

export default ({ navigation }) => {
    return (
        <>
            <StatusBar />
            <Appbar.Header>
                <Appbar.Action
                    icon="arrow---left"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content style={{ marginLeft: -8 }} title="Detail" />
            </Appbar.Header>
            <ActionSheetProvider>
                <ConnectedApp navigation={navigation} />
            </ActionSheetProvider>
        </>
    );
};
