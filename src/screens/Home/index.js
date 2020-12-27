import React, { useState, useCallback, useEffect } from 'react';
import {
    Appbar,
    IconButton,
    Subheading,
    Button,
    Dialog,
    Portal,
    Checkbox,
    Text,
    List,
    Switch,
    ToggleButton,
} from 'react-native-paper';
import { View, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SwipableViewStack from '../../components/CardStack';
import AdmobBanner from '../../components/AdmobBanner';
import StackItem from '../../components/StackItem';
import HomeEmptyState from '../../components/HomeEmptyState';
import SectionListWithAd from '../../components/SectionListWithAd';
import Anime from '../../api';
import styles from './style';
import _, { fill } from 'lodash';

const Home = ({ navigation }) => {
    let sectionlist = null;

    const [refreshing, setRefreshing] = useState(false);
    const [visible, setVisible] = useState(false);
    const [initialCardIndex, setInitialCardIndex] = useState(0);

    // *** FILTERS - START *** //
    const [onlySerial, setOnlySerial] = useState(false);
    const [videoQuality, setVideoQuality] = useState(null);
    const [categories, setCategories] = useState([
        { id: 1, label: 'Action', selected: false },
        { id: 2, label: 'Comedy', selected: false },
        { id: 3, label: 'Crime', selected: false },
        { id: 4, label: 'Drama', selected: false },
        { id: 5, label: 'Historical', selected: false },
        { id: 6, label: 'Sci-Fi', selected: false },
        { id: 7, label: 'Romance', selected: false },
    ]);

    const filters = () => {
        const filter = {
            isSerial: onlySerial,
            quality: videoQuality,
            categories: categories
                .filter((el) => el.selected)
                .map((el) => el.label)
                .join(','),
        };

        const options = {};

        Object.keys(filter).map((key) => {
            filter[key] && (options[key] = filter[key]);
        });

        console.log(options);

        return options;
    };
    // *** FILTERS - END *** //

    // *** API CALL SECTION - START *** //
    const [animeState, setAnimeState] = useState({});
    const [cardState, setCardState] = useState({});
    const { data, loading, error } = animeState;
    const { data: cards } = cardState;

    const setAnimes = (d) => {
        setAnimeState({ ...animeState, ...d });
        setRefreshing(false);
    };

    const setCards = (d) => {
        setCardState({ ...cardState, ...d });
    };

    const anime = new Anime(setAnimes, setCards);

    useEffect(() => {
        anime.getAll(filters());
        anime.getCardStack();
    }, []);

    const refresh = () => {
        anime.getAll(filters(), false);
        setRefreshing(true);
        anime.getCardStack(false);
    };

    const onRefresh = useCallback(refresh, [refreshing]);
    // *** API CALL SECTION - END*** //

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleSelectCategory = (id) => {
        const updatedList = categories.map((el) => {
            if (el.id === id) {
                el.selected = !el.selected;
            }

            return el;
        });

        setCategories(updatedList);
    };

    const handleApplyFilters = () => {
        anime.getAll(filters(), false);
        hideDialog();
    };

    const handleClear = () => {
        hideDialog();

        setCategories([
            { id: 1, label: 'Action', selected: false },
            { id: 2, label: 'Comedy', selected: false },
            { id: 3, label: 'Crime', selected: false },
            { id: 4, label: 'Drama', selected: false },
            { id: 5, label: 'Historical', selected: false },
            { id: 6, label: 'Sci-Fi', selected: false },
            { id: 7, label: 'Romance', selected: false },
        ]);

        setVideoQuality(null);
        setOnlySerial(false);

        anime.getAll({}, false);
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

    const handleSelect = (item) => {
        navigation.navigate('Details', item);
    };

    const ListHeaderComponent = () => (
        <>
            {cards && cards.length ? (
                <View style={styles.container} key="CardStack">
                    <SwipableViewStack
                        initialSelectedIndex={initialCardIndex}
                        onSwipe={setInitialCardIndex}
                        data={cards}
                        renderItem={(element) => <StackItem {...element} />}
                        onItemClicked={(element) => handleSelect(element)}
                        stackSpacing={-20}
                    />
                </View>
            ) : null}

            {!(!(data && data.length) && !(cards && cards.length)) ? (
                <View style={styles.heading}>
                    <Subheading style={styles.headingText}>Animes</Subheading>
                    <IconButton
                        rippleColor="#afafaf"
                        icon="filter"
                        onPress={showDialog}
                    />
                </View>
            ) : null}
        </>
    );

    return (
        <>
            <StatusBar />
            <Appbar.Header>
                <Appbar.Content title="AnimeTV" onPress={scrollToTop} />
            </Appbar.Header>

            <SectionListWithAd
                handleSelect={handleSelect}
                reference={(component) => {
                    sectionlist = component;
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListHeaderComponent={<ListHeaderComponent />}
                sections={data}
                SectionFooterComponent={() => <AdmobBanner key="ad" />}
            />

            {!(data && data.length) && !loading && (
                <HomeEmptyState
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    refresh={() => {
                        handleClear();
                        setRefreshing(true);
                    }}
                />
            )}

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
                                title="Only series"
                                right={() => (
                                    <Switch
                                        value={onlySerial}
                                        onValueChange={setOnlySerial}
                                    />
                                )}
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
                                                key={index}
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

                            <List.Item
                                style={{
                                    paddingHorizontal: 0,
                                }}
                                title="Quality"
                            />

                            <ToggleButton.Row
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 16,
                                    marginBottom: 24,
                                }}
                                onValueChange={(value) => {
                                    setVideoQuality(value);
                                }}
                                value={videoQuality}
                            >
                                <ToggleButton
                                    style={{ flex: 1 }}
                                    icon={() => {
                                        return <Text>480</Text>;
                                    }}
                                    value={480}
                                />
                                <ToggleButton
                                    style={{ flex: 1 }}
                                    icon={() => {
                                        return <Text>720</Text>;
                                    }}
                                    value={720}
                                />
                                <ToggleButton
                                    style={{ flex: 1 }}
                                    icon={() => {
                                        return <Text>1080</Text>;
                                    }}
                                    value={1080}
                                />
                            </ToggleButton.Row>
                        </List.Section>
                    </Dialog.Content>
                    <Dialog.Actions style={{ justifyContent: 'space-between' }}>
                        <Button
                            color="#333"
                            onPress={handleClear}
                            style={{ elevation: 0 }}
                        >
                            Clear
                        </Button>
                        <Button
                            color="#333"
                            onPress={handleApplyFilters}
                            style={{ elevation: 0 }}
                        >
                            Apply
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default Home;
