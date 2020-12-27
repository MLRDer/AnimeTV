import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';
import Favourites from './Favourites';
import Downloads from './Downloads';
import Search from './Search';
import Profile from './Profile';

const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'search', title: 'Search', icon: 'search' },
    { key: 'profile', title: 'Profile', icon: 'profile' },
];

const Bottom = ({ navigation }) => {
    const [index, setIndex] = useState(0);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'home':
                return <Home navigation={navigation} jumpTo={jumpTo} />;
            case 'search':
                return <Search navigation={navigation} jumpTo={jumpTo} />;
            case 'profile':
                return <Profile navigation={navigation} jumpTo={jumpTo} />;
        }
    };

    return (
        <>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                shifting
            />
        </>
    );
};

export default Bottom;
