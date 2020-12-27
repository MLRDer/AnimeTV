import React, { useState, useEffect } from 'react';
import {
    Appbar,
    IconButton,
    Searchbar,
    ActivityIndicator,
} from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AdmobBanner from '../../components/AdmobBanner';
import AdmobBannerLarge from '../../components/AdmobBannerLarge';

import SectionListWithAd from '../../components/SectionListWithAd';
import Anime from '../../api';

const Search = ({ navigation }) => {
    let sectionlist = null;

    const [value, setValue] = useState('');
    const [apiState, setApiState] = useState({});

    const { data, loading, error } = apiState;

    useEffect(() => {
        if (value && value.length) {
            anime.search(value);
        } else {
            setResults({ data: null });
        }
    }, [value]);

    const setResults = (d) => {
        setApiState({ ...apiState, ...d });
    };

    const anime = new Anime(setResults);

    const handleSelect = (item) => {
        navigation.navigate('Details', item);
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
            <StatusBar style="dark" />
            <Appbar.Header>
                <Appbar.Content title="Search" onPress={scrollToTop} />
            </Appbar.Header>

            <Searchbar
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                }}
                placeholder={'Search'}
                icon={() =>
                    loading ? (
                        <ActivityIndicator color="#333" />
                    ) : (
                        <IconButton rippleColor="#afafaf" icon="search" />
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

            {data && data.length ? (
                <SectionListWithAd
                    handleSelect={handleSelect}
                    reference={(component) => {
                        sectionlist = component;
                    }}
                    sections={data}
                    SectionFooterComponent={() => <AdmobBanner />}
                />
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        paddingBottom: 4,
                    }}
                >
                    <AdmobBannerLarge />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        elevation: 0,
        borderWidth: 0,
        padding: 0,
        height: 56,
        margin: 12,
        marginBottom: 8,
    },
});

export default Search;
