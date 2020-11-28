import React, { useState, useEffect, createRef } from 'react';
import { Appbar, Searchbar, IconButton, Subheading } from 'react-native-paper';
import {
    View,
    Keyboard,
    FlatList,
    Text,
    SectionList,
    ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SwipableViewStack from '../../Components/CardStack';
import StackItem from '../../Components/StackItem';
import styles from './style';

const Home = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const items = [
        {
            title: 'Dororo',
            key: 'dororo',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
        },
        {
            title: 'Your name',
            key: 'your-name',
            image:
                'https://cdn.onebauer.media/one/empire-images/reviews_films/5829f535737b36a41846433e/Your%20Name.png?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
        },
        {
            title: 'Weathering with you',
            key: 'weathering-with-you',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
    ];

    const listItems = [
        {
            title: 'Weathering with you',
            key: 'weathering-with-you',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
        {
            title: 'Dororo',
            key: 'dororo',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
        },
        {
            title: 'Your name',
            key: 'your-name',
            image:
                'https://cdn.onebauer.media/one/empire-images/reviews_films/5829f535737b36a41846433e/Your%20Name.png?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
        },
        {
            title: 'Weathering with you',
            key: 'weathering-with-you-1',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
        {
            title: 'Dororo',
            key: 'dororo-1',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
        },
        {
            title: 'Your name',
            key: 'your-name-1',
            image:
                'https://cdn.onebauer.media/one/empire-images/reviews_films/5829f535737b36a41846433e/Your%20Name.png?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
        },
    ];

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            setShowSearch(false);
        });

        // cleanup
        return () => {
            Keyboard.removeListener('keyboardDidHide');
        };
    }, []);

    return (
        <>
            <StatusBar />
            {showSearch ? (
                <Appbar.Header>
                    <Searchbar
                        value={searchTerm}
                        onChangeText={(value) => setSearchTerm(value)}
                        autoFocus
                        placeholder="Search"
                        icon="search"
                        clearIcon={() => (
                            <IconButton
                                rippleColor="#afafaf"
                                icon="close-square"
                                onPress={() => {
                                    searchTerm.length
                                        ? setSearchTerm('')
                                        : setShowSearch(false);
                                }}
                            />
                        )}
                        style={styles.searchBar}
                    />
                </Appbar.Header>
            ) : (
                <Appbar.Header>
                    <Appbar.Content title="AnimeTV" />
                    <Appbar.Action
                        icon="search"
                        rippleColor="#afafaf"
                        onPress={() => {
                            setShowSearch(true);
                        }}
                    />
                </Appbar.Header>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={scroll}
            >
                <View style={styles.container}>
                    <SwipableViewStack
                        onSwipeStart={() => {
                            console.log('started');
                            setScroll(false);
                        }}
                        onSwipeEnd={() => {
                            console.log('ended');
                            setScroll(true);
                        }}
                        onSwipe={() => setScroll(!false)}
                        initialSelectedIndex={1}
                        data={items}
                        renderItem={(element) => <StackItem {...element} />}
                        onItemClicked={(element) => console.log(element.title)}
                        stackSpacing={-20}
                    />
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Subheading style={{ fontSize: 20 }}>Animes</Subheading>

                    <IconButton
                        rippleColor="#afafaf"
                        icon="filter"
                        onPress={() => console.log('asd')}
                    />
                </View>
                <FlatList
                    numColumns="2"
                    style={{ flex: 1, paddingHorizontal: 8 }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => console.log('Test')}
                    onEndReachedThreshold={0.7}
                    data={listItems}
                    renderItem={(rowData) => (
                        <View
                            style={{
                                flex: 1,
                                height: 300,
                                backgroundColor: 'red',
                                margin: 4,
                                borderRadius: 8,
                            }}
                        ></View>
                    )}
                    keyExtractor={(item) => item.key.toString()}
                />
            </ScrollView>

            {/* <SectionList
                numColumns="2"
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.title + index}
                sections={[
                    {
                        data: [{}],
                        renderItem: () => (
                            <>
                                <View style={styles.container}>
                                    <SwipableViewStack
                                        onSwipe={() => setScroll(false)}
                                        initialSelectedIndex={1}
                                        data={items}
                                        renderItem={(element) => (
                                            <StackItem {...element} />
                                        )}
                                        onItemClicked={(element) =>
                                            console.log(element.title)
                                        }
                                        stackSpacing={-20}
                                    />
                                </View>
                                <View
                                    style={{
                                        paddingHorizontal: 16,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Subheading style={{ fontSize: 20 }}>
                                        Animes
                                    </Subheading>

                                    <IconButton
                                        rippleColor="#afafaf"
                                        icon="filter"
                                        onPress={() => console.log('asd')}
                                    />
                                </View>
                            </>
                        ),
                    },
                    {
                        data: [{}],
                        renderItem: ({}) => (
                            <FlatList
                                numColumns="2"
                                style={{ flex: 1, paddingHorizontal: 8 }}
                                showsVerticalScrollIndicator={false}
                                onEndReached={() => console.log('Test')}
                                onEndReachedThreshold={0.7}
                                data={listItems}
                                renderItem={(rowData) => (
                                    <View
                                        style={{
                                            flex: 1,
                                            height: 300,
                                            backgroundColor: 'red',
                                            margin: 4,
                                            borderRadius: 8,
                                        }}
                                    ></View>
                                )}
                                keyExtractor={(item) => item.key.toString()}
                            />
                        ),
                    },
                ]}
            /> */}

            {/* <FlatList
                numColumns="2"
                style={{ flex: 1, paddingHorizontal: 8 }}
                showsVerticalScrollIndicator={false}
                onEndReached={() => console.log('Test')}
                onEndReachedThreshold={0.7}
                data={listItems}
                renderItem={(rowData) => (
                    <View
                        style={{
                            flex: 1,
                            height: 300,
                            backgroundColor: 'red',
                            margin: 4,
                            borderRadius: 8,
                        }}
                    ></View>
                )}
                keyExtractor={(item) => item.key.toString()}
            /> */}
        </>
    );
};

export default Home;
