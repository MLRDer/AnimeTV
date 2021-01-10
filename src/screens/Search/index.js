import React, { useState, useEffect } from 'react';
import {
    Appbar,
    IconButton,
    Searchbar,
    ActivityIndicator,
    withTheme,
} from 'react-native-paper';
import { StyleSheet, ScrollView, Keyboard, View } from 'react-native';
import AdmobBanner from '../../components/AdmobBanner';
import ContentsSectionList from '../../components/ContentsSectionList';
import WatchLoadingState from '../../components/WatchLoadingState';
import Anime from '../../api';
import Axios from 'axios';

const Search = ({ navigation, theme }) => {
    const source = Axios.CancelToken.source();
    let sectionlist = null;

    const [visible, setVisible] = useState(true);
    const [value, setValue] = useState('');
    const [apiState, setApiState] = useState({});

    const { data, loading, error } = apiState;

    const setResults = (d) => {
        setApiState({ ...apiState, ...d });
    };

    const anime = new Anime(setResults, source);

    useEffect(() => {
        if (value && value.length) {
            anime.search(value);
        } else {
            setResults({ data: null });
        }

        // cleanup function
        return () => {
            source.cancel();
        };
    }, [value]);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardOpened);
        Keyboard.addListener('keyboardDidHide', keyboardClosed);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow');
            Keyboard.removeListener('keyboardDidHide');
        };
    }, []);

    const keyboardOpened = () => setVisible(false);

    const keyboardClosed = () => setVisible(true);

    const handleSelect = (item) => {
        navigation.navigate('Details', { id: item._id });
    };

    const scrollToTop = () => {
        sectionlist &&
            sectionlist.scrollToLocation({
                animated: true,
                sectionIndex: 0,
                itemIndex: 0,
                viewOffset: 500,
            });
    };

    return (
        <>
            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.surface,
                }}
            >
                <Appbar.Content title="Search" onPress={scrollToTop} />
                <Appbar.Action
                    icon="setting"
                    rippleColor="#afafaf"
                    onPress={() => navigation.navigate('Settings')}
                />
            </Appbar.Header>

            <Searchbar
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                }}
                placeholder={'Search'}
                icon={() =>
                    loading ? (
                        <ActivityIndicator color={theme.colors.text} />
                    ) : (
                        <IconButton icon="search" />
                    )
                }
                clearIcon={() =>
                    value.length ? (
                        <IconButton
                            rippleColor="#afafaf"
                            icon="close-square"
                            onPress={() => {
                                setValue('');
                            }}
                        />
                    ) : null
                }
                style={styles.searchBar}
                onSubmitEditing={() => {
                    anime.search(value);
                }}
            />

            <WatchLoadingState loading={loading} />

            {data && data.length ? (
                <>
                    <ContentsSectionList
                        handleSelect={handleSelect}
                        reference={(component) => {
                            sectionlist = component;
                        }}
                        containerStyle={{
                            paddingBottom: 116,
                        }}
                        sections={data}
                        showAd={false}
                    />

                    {visible ? (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                padding: 8,
                                paddingBottom: 0,
                            }}
                        >
                            <AdmobBanner />
                        </View>
                    ) : null}
                </>
            ) : visible ? (
                <ScrollView style={styles.largeAdContainer}>
                    <AdmobBanner large />
                </ScrollView>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    largeAdContainer: {
        paddingBottom: 8,
        paddingHorizontal: 8,
    },
    searchBar: {
        elevation: 0,
        borderWidth: 0,
        padding: 0,
        height: 56,
        margin: 12,
        marginBottom: 8,
    },
});

export default withTheme(Search);
