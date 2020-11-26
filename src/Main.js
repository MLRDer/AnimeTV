import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/Home';
import BottomNavigation from './screens/BottomNavigation';

const navigator = createStackNavigator(
    {
        BottomNavigation: BottomNavigation,
        Home: HomeScreen,
    },
    {
        initialRouteName: 'BottomNavigation',
        defaultNavigationOptions: {
            headerShown: false,
        },
    }
);

export default createAppContainer(navigator);
