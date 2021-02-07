import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Appbar, Text, withTheme } from 'react-native-paper';
import { TabBar, TabView } from 'react-native-tab-view';
import FiltersModal from '../../components/FiltersModal';
import Contents from '../../components/Contents';

const Watch = ({ navigation, theme }) => {
    const [index, setIndex] = React.useState(0);
    const [filters, setFilters1] = useState({});

    const setFilters = (filter) => {
        setFilters1(filter);
    };

    const [visible, setVisible] = React.useState(false);
    const [routes] = React.useState([
        { key: 'movie', title: 'Movies' },
        { key: 'anime', title: 'Animes' },
        { key: 'cartoon', title: 'Cartoons' },
    ]);

    const handleSelect = (id) => {
        navigation.navigate('Details', { id });
    };

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            style={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
            }}
            indicatorStyle={{
                backgroundColor: theme.colors.text,
            }}
            renderLabel={({ route, focused }) => <Text>{route.title}</Text>}
        />
    );

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'movie':
                return (
                    <Contents
                        type={route.key}
                        setFilters={setFilters}
                        filters={filters}
                        handleSelect={handleSelect}
                        jumpTo={jumpTo}
                    />
                );
            case 'anime':
                return (
                    <Contents
                        type={route.key}
                        setFilters={setFilters}
                        filters={filters}
                        handleSelect={handleSelect}
                        jumpTo={jumpTo}
                    />
                );
            case 'cartoon':
                return (
                    <Contents
                        type={route.key}
                        setFilters={setFilters}
                        filters={filters}
                        handleSelect={handleSelect}
                        jumpTo={jumpTo}
                    />
                );
        }
    };

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <>
            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.surface,
                    elevation: 0,
                }}
            >
                <Appbar.Content title="Watch" />
                <Appbar.Action icon="filter-2" onPress={showDialog} />
            </Appbar.Header>

            <FiltersModal
                filters={filters}
                setFilters={setFilters}
                visible={visible}
                hideDialog={hideDialog}
            />
            <TabView
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                removeClippedSubviews
                lazy
            />
        </>
    );
};

export default withTheme(Watch);
