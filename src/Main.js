import React from 'react';
import { Animated, Easing } from 'react-native';
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import BottomNavigation from './screens/BottomNavigation';
import PlayerScreen from './screens/Player';
import SeasonsScreen from './screens/Seasons';
import DetailsScreen from './screens/Details';
import CollectionScreen from './screens/Collection';
import SettingsScreen from './screens/Settings';
import * as Linking from 'expo-linking';
import { withTheme } from 'react-native-paper';

const Stack = createStackNavigator();

export default withTheme(({ theme }) => {
    const linking = {
        prefixes: ['https://cassette.muhammadjanov.uz', Linking.makeUrl('/')],
        config: {
            screens: {
                Details: 'movie/:id',
                Collection: 'collection/:id',
            },
        },
    };

    const open = {
        animation: 'timing',
        config: {
            duration: '250',
        },
    };
    const close = {
        animation: 'timing',
        config: {
            duration: '200',
        },
    };

    const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
        const progress = Animated.add(
            current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            }),
            next
                ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                  })
                : 0
        );

        return {
            cardStyle: {
                transform: [
                    {
                        translateX: Animated.multiply(
                            progress.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [
                                    screen.width, // Focused, but offscreen in the beginning
                                    0, // Fully focused
                                    screen.width * -0.3, // Fully unfocused
                                ],
                                extrapolate: 'clamp',
                            }),
                            inverted
                        ),
                    },
                ],
            },
        };
    };

    return (
        <NavigationContainer
            linking={linking}
            theme={theme.dark ? DarkTheme : DefaultTheme}
        >
            <Stack.Navigator
                initialRouteName="BottomNavigation"
                screenOptions={{ headerShown: false }}
                mode="modal"
                headerMode="screen"
            >
                <Stack.Screen
                    name="BottomNavigation"
                    component={BottomNavigation}
                    options={{
                        cardStyleInterpolator: forSlide,
                        transitionSpec: { open, close },
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        cardStyleInterpolator: forSlide,
                        transitionSpec: { open, close },
                    }}
                />
                <Stack.Screen
                    name="Collection"
                    component={CollectionScreen}
                    options={{
                        cardStyleInterpolator: forSlide,
                        transitionSpec: { open, close },
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{
                        cardStyleInterpolator: forSlide,
                        transitionSpec: { open, close },
                    }}
                />
                <Stack.Screen
                    name="Seasons"
                    component={SeasonsScreen}
                    options={{
                        cardStyleInterpolator: forSlide,
                        transitionSpec: { open, close },
                    }}
                />
                <Stack.Screen
                    name="Player"
                    component={PlayerScreen}
                    options={{
                        cardStyleInterpolator: forSlide,
                        transitionSpec: { open, close },
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        cardStyleInterpolator: forSlide,
                        transitionSpec: { open, close },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
});
