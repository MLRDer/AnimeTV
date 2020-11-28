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
import FlatlistItem from '../../Components/FlatlistItem';
import styles from './style';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [scroll, setScroll] = useState(true);
    const [offset, setOffset] = useState(0);
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
            rating: 5.3,
            title: 'Weathering with you',
            key: 'weathering-with-you',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
        {
            rating: 7.7,
            title: 'Dororo',
            key: 'dororo',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
        },
        {
            rating: 9.5,
            title: 'Your name',
            key: 'your-name',
            image:
                'https://cdn.onebauer.media/one/empire-images/reviews_films/5829f535737b36a41846433e/Your%20Name.png?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
        },
        {
            rating: 5.3,
            title: 'Weathering with you',
            key: 'weathering-with-you',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
        {
            rating: 7.7,
            title: 'Dororo',
            key: 'dororo',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
        },
        {
            rating: 6.5,
            title: 'Your name',
            key: 'your-name',
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
                style={{ height: 100 }}
            >
                <View style={styles.container}>
                    <SwipableViewStack
                        // onSwipeStart={() => {
                        //     setScroll(false);
                        // }}
                        // onSwipeEnd={() => {
                        //     setScroll(true);
                        // }}
                        // onTouchStart={() => {
                        //     setScroll(false);
                        // }}
                        // onTouchEnd={() => {
                        //     setScroll(true);
                        // }}
                        // onTouchCancel={() => {
                        //     setScroll(true);
                        // }}
                        onSwipe={() => setScroll(!false)}
                        initialSelectedIndex={1}
                        data={items}
                        renderItem={(element) => <StackItem {...element} />}
                        onItemClicked={(element) => console.log(element.title)}
                        stackSpacing={-20}
                    />
                </View>
                <View style={styles.heading}>
                    <Subheading style={styles.headingText}>Animes</Subheading>
                    <IconButton
                        rippleColor="#afafaf"
                        icon="filter"
                        onPress={() => console.log('asd')}
                    />
                </View>
                <FlatList
                    numColumns="2"
                    style={styles.flatlist}
                    showsVerticalScrollIndicator={true}
                    onEndReached={() => console.log('Test')}
                    onEndReachedThreshold={0.8}
                    data={listItems}
                    renderItem={({ item }) => <FlatlistItem {...item} />}
                    keyExtractor={(item) => item.key}
                />
            </ScrollView>
        </>
    );
};

export default Home;
