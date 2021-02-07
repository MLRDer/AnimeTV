import React, { useEffect, useState } from 'react';
import { BottomNavigation, withTheme } from 'react-native-paper';
import Home from './Home';
import Watch from './Watch';
import Search from './Search';

const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'watch', title: 'Watch', icon: 'play' },
    { key: 'search', title: 'Search', icon: 'search' },
];

const Bottom = ({ navigation, route: initalRoute, theme }) => {
    const [index, setIndex] = useState(0);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'home':
                return (
                    <Home
                        navigation={navigation}
                        route={initalRoute}
                        jumpTo={jumpTo}
                    />
                );
            case 'search':
                return (
                    <Search
                        navigation={navigation}
                        route={initalRoute}
                        jumpTo={jumpTo}
                    />
                );
            case 'watch':
                return (
                    <Watch
                        navigation={navigation}
                        route={initalRoute}
                        jumpTo={jumpTo}
                    />
                );
        }
    };

    return (
        <>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                shifting
                barStyle={{
                    backgroundColor: theme.colors.surface,
                }}
            />
        </>
    );
};

export default withTheme(Bottom);
