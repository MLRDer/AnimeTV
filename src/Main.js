import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/Home';
import BottomNavigation from './screens/BottomNavigation';
import PlayerScreen from './screens/Player';
import SeasonsScreen from './screens/Seasons';
import DetailsScreen from './screens/Details';
import { connectActionSheet, useActionSheet } from '@expo/react-native-action-sheet'

const navigator = createStackNavigator(
    {
        BottomNavigation: BottomNavigation,
        Home: HomeScreen,
        Player: PlayerScreen,
        Seasons: SeasonsScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'BottomNavigation',
        defaultNavigationOptions: {
            headerShown: false,
        },
    }
);

export default connectActionSheet(createAppContainer(navigator));
