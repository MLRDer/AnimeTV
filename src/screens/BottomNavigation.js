import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';
import Favourites from './Favourites';
import Downloads from './Downloads';

const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'favourites', title: 'Favourites', icon: 'star' },
    { key: 'downloads', title: 'Downloads', icon: 'download' },
];

const Bottom = () => {
    const [index, setIndex] = useState(0);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        favourites: Favourites,
        downloads: Downloads,
    });

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
