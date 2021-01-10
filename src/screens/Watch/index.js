import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Appbar, Text, withTheme } from 'react-native-paper';
import { TabBar, TabView } from 'react-native-tab-view';
import FiltersModal from '../../components/FiltersModal';
import Contents from '../../components/Contents';

const initialLayout = { width: Dimensions.get('window').width };

const Watch = ({ navigation, theme }) => {
    const [index, setIndex] = React.useState(0);
    const [filters, setFilters] = useState({});

    const [visible, setVisible] = React.useState(false);
    const [routes] = React.useState([
        { key: 'movie', title: 'Movies' },
        { key: 'anime', title: 'Animes' },
    ]);

    const handleSelect = (item) => {
        navigation.navigate('Details', { id: item._id });
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
            renderLabel={({ route, focused }) => (
                <Text style={{ margin: 4 }}>{route.title}</Text>
            )}
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
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        </>
    );
};

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

export default withTheme(Watch);
