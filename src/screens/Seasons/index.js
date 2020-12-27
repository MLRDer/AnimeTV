import React, { useEffect, useState } from 'react';
import {
    Animated,
    View,
    ScrollView,
    ImageBackground,
    StyleSheet,
    SectionList,
    Image,
    TouchableNativeFeedback,
} from 'react-native';
import {
    Appbar,
    Text,
    Button,
    IconButton,
    TouchableRipple,
    Portal,
    Modal,
    Subheading,
} from 'react-native-paper';
import {
    useActionSheet,
    ActionSheetProvider,
    connectActionSheet,
} from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from '@react-native-community/netinfo';
import _ from 'lodash';
import IconlyBold from '../../icons/IconlyBold';
import AdmobBanner from '../../components/AdmobBanner';

const PlayIcon = () => (
    <IconlyBold
        name="play-arrow"
        size={32}
        color={'#34495e'}
        style={[
            {
                marginLeft: 2,
                marginTop: 0,
            },
        ]}
    />
);

const Seasons = ({ navigation }) => {
    const { episodes, image } = navigation.state.params;
    const { isConnected } = useNetInfo();

    const epz = Object.entries(_.groupBy(episodes, 'season')).map((season) =>
        _.zipObject(['title', 'data'], season)
    );
    const { showActionSheetWithOptions } = useActionSheet();

    const openPlayer = (title, source) => {
        if (isConnected) {
            navigation.navigate('Player', {
                title,
                poster: image,
                source,
            });
        } else {
            showModal();
        }
    };

    const openActionSheet = ({ sources, name }) => {
        const options = sources.map((source) => source.quality.toString());

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: options.length,
                withTitle: true,
                title: 'Choose quality: ',
            },
            (buttonIndex) => {
                sources[buttonIndex] &&
                    openPlayer(name, sources[buttonIndex].url);
            }
        );
    };

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <>
            <View style={styles.container}>
                <SectionList
                    sections={epz}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({ item }) => (
                        <TouchableRipple
                            onPress={() => {
                                openActionSheet(item);
                            }}
                            rippleColor="#34495e"
                        >
                            <View style={styles.item}>
                                <Text style={styles.title}>
                                    {item.episode}. {item.name}
                                </Text>
                                <View style={styles.actions}>
                                    <IconButton
                                        style={{
                                            backgroundColor: '#fcfcfc',
                                            margin: 0,
                                        }}
                                        icon={() => <PlayIcon />}
                                        size={24}
                                        rippleColor="#999"
                                        onPress={() => {
                                            openActionSheet(item);
                                        }}
                                    />
                                </View>
                            </View>
                        </TouchableRipple>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>Season {title}</Text>
                    )}
                    renderSectionFooter={() => <AdmobBanner />}
                />
            </View>
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
    container: {
        backgroundColor: '#fff',
    },
    header: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#ecf0f1',
    },
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 0.3,
        borderColor: '#bdc3c7',
    },
    title: {
        flex: 1,
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
    },
});

const ConnectedApp = connectActionSheet(Seasons);

export default ({ navigation }) => {
    return (
        <>
            <StatusBar />
            <Appbar.Header>
                <Appbar.Action
                    icon="arrow---left"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content style={{ marginLeft: -8 }} title="Seasons" />
            </Appbar.Header>
            <ActionSheetProvider>
                <ConnectedApp navigation={navigation} />
            </ActionSheetProvider>
        </>
    );
};
