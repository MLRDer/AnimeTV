import React, { useState } from 'react';
import { View, StyleSheet, SectionList, Dimensions } from 'react-native';
import {
    Appbar,
    Text,
    IconButton,
    TouchableRipple,
    withTheme,
} from 'react-native-paper';
import {
    useActionSheet,
    ActionSheetProvider,
    connectActionSheet,
} from '@expo/react-native-action-sheet';
import { useNetInfo } from '@react-native-community/netinfo';
import _ from 'lodash';
import IconlyBold from '../../icons/IconlyBold';
import AdmobBanner from '../../components/AdmobBanner';
import NoConnection from '../../components/NoConnection';
import SourcesLoading from '../../components/SourcesLoading';

import Anime from '../../api';
import Axios from 'axios';

const PlayIcon = ({ color }) => (
    <IconlyBold
        name="play-arrow"
        size={32}
        color={color}
        style={[
            {
                marginLeft: 2,
                marginTop: 0,
            },
        ]}
    />
);

const Seasons = ({ navigation, route, theme }) => {
    const styles = createStyles(theme);

    const source = Axios.CancelToken.source();

    const { episodes, image, id, hdrezka } = route.params;
    const { isConnected } = useNetInfo();
    const [sourcesLoading, setSourcesLoading] = useState(false);

    const anime = new Anime(null, source);

    const epz = Object.entries(_.groupBy(episodes, 'season')).map((season) =>
        _.zipObject(['title', 'data'], season)
    );
    const { showActionSheetWithOptions } = useActionSheet();

    const openPlayer = (title, source, episodeId, sourceId) => {
        if (isConnected) {
            navigation.navigate('Player', {
                id,
                title,
                source,
                episodeId,
                sourceId,
                poster: image,
            });
        } else {
            showModal();
        }
    };

    const openActionSheet = async ({ sources, name, _id, season, episode }) => {
        try {
            let options, callback;

            if (hdrezka) {
                setSourcesLoading(true);

                const sources = await anime.getSources(
                    hdrezka,
                    true,
                    season,
                    episode
                );

                options = sources.map((source) => source.quality);

                callback = (index) =>
                    sources[index] && openPlayer(name, sources[index].url);
                setSourcesLoading(false);
            } else {
                options = sources.map((source) => source.quality.toString());

                callback = (index) => {
                    sources[index] &&
                        openPlayer(
                            name,
                            sources[index].url,
                            _id,
                            sources[index]._id
                        );
                };
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

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
                flex: 1,
            }}
        >
            <SourcesLoading loading={sourcesLoading} />

            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.surface,
                }}
            >
                <Appbar.Action
                    icon="arrow---left"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content style={{ marginLeft: -8 }} title="Seasons" />
            </Appbar.Header>
            <SectionList
                sections={epz}
                style={{
                    backgroundColor: theme.colors.background,
                }}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    <TouchableRipple
                        onPress={() => {
                            openActionSheet(item);
                        }}
                    >
                        <View
                            style={[
                                styles.item,
                                {
                                    borderColor: theme.colors.background,
                                    backgroundColor: theme.colors.surface,
                                },
                            ]}
                        >
                            <Text style={styles.title}>
                                {item.episode}. {item.name}
                            </Text>
                            <View style={styles.actions}>
                                <IconButton
                                    style={[
                                        styles.playIcon,
                                        {
                                            backgroundColor:
                                                theme.colors.background,
                                        },
                                    ]}
                                    icon={() => (
                                        <PlayIcon color={theme.colors.text} />
                                    )}
                                    size={24}
                                    onPress={() => {
                                        openActionSheet(item);
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableRipple>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text
                        style={[
                            styles.header,
                            {
                                backgroundColor: theme.colors.background,
                            },
                        ]}
                    >
                        Season {title}
                    </Text>
                )}
            />

            <View style={{}}>
                <AdmobBanner width={Dimensions.get('window').width} />
            </View>

            <NoConnection visible={visible} hideModal={hideModal} />
        </View>
    );
};

const createStyles = (theme) =>
    StyleSheet.create({
        header: {
            paddingVertical: 16,
            paddingHorizontal: 16,
            fontSize: 16,
            textAlign: 'center',
        },
        item: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
        },
        title: {
            flex: 1,
            fontSize: 16,
        },
        actions: {
            flexDirection: 'row',
        },
        playIcon: {
            margin: 0,
        },
        actionSheetContainer: {
            backgroundColor: theme.colors.background,
        },
        actionSheetText: {
            color: theme.colors.text,
        },
    });

const ConnectedApp = connectActionSheet(withTheme(Seasons));

export default ({ navigation, route }) => {
    return (
        <>
            <ActionSheetProvider>
                <ConnectedApp navigation={navigation} route={route} />
            </ActionSheetProvider>
        </>
    );
};
