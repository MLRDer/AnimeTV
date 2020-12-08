import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Subheading,
    Button,
    Dialog,
    Portal,
    Checkbox,
    List,
    Switch,
    ToggleButton,
} from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SwipableViewStack from '../../components/CardStack';
import StackItem from '../../components/StackItem';
import styles from './style';
import SearchableAppbar from './../../components/SearchableAppbar';
import GridList from './../../components/GridList';
import useAnimes from '../../api/Animes';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, loading, error } = useAnimes();

    console.log('******************');
    console.log('LOADING: ', loading);
    console.log('DATA: ', data.length);
    console.log('ERROR: ', error);
    console.log('DATA: ', data[0]);

    const [items] = useState([
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
    ]);

    // const [listItems, setListItems] = useState([
    //     {
    //         id: 1,
    //         liked: false,
    //         rating: 5.3,
    //         title: 'Weathering with you',
    //         key: 'weathering-with-you',
    //         image:
    //             'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
    //     },
    //     {
    //         id: 2,
    //         liked: false,
    //         rating: 7.7,
    //         title: 'Dororo',
    //         key: 'dororo',
    //         image: 'https://kg-portal.ru/img/73607/main.jpg',
    //     },
    //     {
    //         id: 3,
    //         liked: false,
    //         rating: 9.5,
    //         title: 'Your name',
    //         key: 'your-name',
    //         image:
    //             'https://cdn.onebauer.media/one/empire-images/reviews_films/5829f535737b36a41846433e/Your%20Name.png?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
    //     },
    //     {
    //         id: 4,
    //         liked: false,
    //         rating: 5.3,
    //         title: 'Weathering with you',
    //         key: 'weathering-with-you',
    //         image:
    //             'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
    //     },
    // ]);

    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        setListItems(
            data.map((el, index) => ({
                id: el.id,
                liked: el.completed,
                rating: index + 1,
                title: el.title,
                key: el.id,
                image:
                    'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
            }))
        );
    }, [data]);

    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleTermChange = (term) => setSearchTerm(term);

    const handleAddFavourite = (id) => {
        const updatedList = listItems.map((el) => {
            if (el.id == id) {
                el.liked = !el.liked;

                // save to db
            }

            return el;
        });

        setListItems(updatedList);
    };

    const [categories, setCategories] = useState([
        { id: 1, label: 'Male', selected: true },
        { id: 2, label: 'Female', selected: false },
        { id: 3, label: 'Others', selected: false },
    ]);

    const handleSelectCategory = (id) => {
        const updatedList = categories.map((el) => {
            if (el.id == id) {
                el.selected = !el.selected;
            }

            return el;
        });

        setCategories(updatedList);
    };

    const handleClear = () => {
        hideDialog();
        const updatedList = categories.map((el) => {
            el.selected = true;

            return el;
        });

        setCategories(updatedList);
    };

    const [videoQuality, setVideoQuality] = useState('480');

    return (
        <>
            <StatusBar />
            <SearchableAppbar value={searchTerm} onChange={handleTermChange} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <SwipableViewStack
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
                        onPress={showDialog}
                    />
                </View>
                <GridList
                    data={listItems}
                    handleAddFavourite={handleAddFavourite}
                />

                <Portal>
                    <Dialog
                        visible={visible}
                        onDismiss={hideDialog}
                        style={{ maxHeight: '70%' }}
                    >
                        <Dialog.Title>Filter</Dialog.Title>
                        <Dialog.Content>
                            <List.Section>
                                <List.Item
                                    style={{
                                        paddingHorizontal: 0,
                                    }}
                                    title="First Item"
                                    right={() => <Switch value={true} />}
                                />
                                <List.Accordion
                                    theme={{ colors: { primary: '#333' } }}
                                    style={{
                                        paddingHorizontal: 0,
                                    }}
                                    title="Categories"
                                >
                                    <ScrollView style={{ maxHeight: 200 }}>
                                        {categories.map((category, index) => {
                                            return (
                                                <List.Item
                                                    onPress={() =>
                                                        handleSelectCategory(
                                                            category.id
                                                        )
                                                    }
                                                    style={{
                                                        paddingVertical: 2,
                                                    }}
                                                    title={category.label}
                                                    right={() => (
                                                        <Checkbox
                                                            status={
                                                                category.selected
                                                                    ? 'checked'
                                                                    : 'unchecked'
                                                            }
                                                            onPress={() =>
                                                                handleSelectCategory(
                                                                    category.id
                                                                )
                                                            }
                                                        />
                                                    )}
                                                />
                                            );
                                        })}
                                    </ScrollView>
                                </List.Accordion>

                                <ToggleButton.Row
                                    style={{
                                        flex: 1,
                                        marginTop: 12,
                                        marginBottom: 24,
                                    }}
                                    value="left"
                                    onValueChange={(value) => {
                                        console.log(value);
                                        setVideoQuality(value);
                                    }}
                                    value={videoQuality}
                                >
                                    <ToggleButton
                                        style={{ flex: 1 }}
                                        icon={() => {
                                            return <Text>480</Text>;
                                        }}
                                        value="480"
                                    />
                                    <ToggleButton
                                        style={{ flex: 1 }}
                                        icon={() => {
                                            return <Text>720</Text>;
                                        }}
                                        value="720"
                                    />
                                    <ToggleButton
                                        style={{ flex: 1 }}
                                        icon={() => {
                                            return <Text>1080</Text>;
                                        }}
                                        value="1080"
                                    />
                                </ToggleButton.Row>
                            </List.Section>
                        </Dialog.Content>
                        <Dialog.Actions
                            style={{ justifyContent: 'space-between' }}
                        >
                            <Button
                                color="#333"
                                onPress={handleClear}
                                style={{ elevation: 0 }}
                            >
                                Clear
                            </Button>
                            <Button
                                color="#333"
                                onPress={hideDialog}
                                style={{ elevation: 0 }}
                            >
                                Apply
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </>
    );
};

export default Home;
