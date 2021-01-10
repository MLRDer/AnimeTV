import React, { useState } from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
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
    const { episodes, image, id } = route.params;
    const { isConnected } = useNetInfo();

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

    const openActionSheet = ({ sources, name, _id }) => {
        const options = sources.map((source) => source.quality.toString());

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
                sources[buttonIndex] &&
                    openPlayer(
                        name,
                        sources[buttonIndex].url,
                        _id,
                        sources[buttonIndex]._id
                    );
            }
        );
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
                renderSectionFooter={() => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <AdmobBanner />
                    </View>
                )}
            />
            <NoConnection visible={visible} hideModal={hideModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
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
