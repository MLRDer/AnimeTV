import React, { useEffect, useState } from 'react';
import {
    configureFonts,
    DefaultTheme,
    Provider as PaperProvider,
    DarkTheme,
} from 'react-native-paper';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import AsyncStorage from '@react-native-community/async-storage';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Main from './src/Main';
import IconlyBold from './src/icons/IconlyBold';
import IconlyBroken from './src/icons/IconlyBroken';
import { StatusBar } from 'expo-status-bar';

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'Montserrat Medium',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Montserrat SemiBold',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Montserrat Regular',
            fontWeight: 'normal',
        },
    },
};

const fonts = configureFonts(fontConfig);

const lightTheme = {
    ...DefaultTheme,
    roundness: 4,
    mode: 'adaptive',
    colors: {
        ...DefaultTheme.colors,
        primary: '#ffffff',
        accent: '#2980b9',
        surface: '#ffffff',
        background: '#F5F5F5',
        green: '#2ecc71',
        red: '#E74C3C',
        shimmerColors: ['#ffffff', '#F5F5F5aa', '#ffffff'],
    },
    fonts,
};

const darkTheme = {
    ...DarkTheme,
    roundness: 4,
    mode: 'adaptive',
    colors: {
        ...DarkTheme.colors,
        primary: '#2980b9',
        accent: '#2980b9',
        surface: '#1f1f1f',
        background: '#171717',
        green: '#2ecc71',
        red: '#E74C3C',
        shimmerColors: ['#232323', '#1f1f1f', '#232323'],
    },
    fonts,
};

const themes = {
    light: 'light',
    dark: 'dark',
    auto: 'auto',
};

export default function App() {
    const [scheme, setScheme] = useState(themes.light);
    const systemScheme = useColorScheme();
    console.log('SYSTEM THEME:', systemScheme);

    const saveTheme = async (value) => {
        try {
            await AsyncStorage.setItem('@Cassette:theme', value);
        } catch (error) {
            console.log(error);
        }
    };

    const switchTheme = (value) => {
        setScheme(value);
        saveTheme(value);
    };

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@Cassette:theme');
            if (value !== null) {
                console.log('THEME:', value);
                setScheme(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    useEffect(() => {
        retrieveData();
    }, []);

    let theme = { ...lightTheme, switchTheme };

    if (scheme === themes.light) theme = { ...lightTheme, switchTheme, scheme };
    else if (scheme === themes.dark)
        theme = { ...darkTheme, switchTheme, scheme };
    else if (scheme === themes.auto) {
        if (systemScheme === themes.light)
            theme = { ...lightTheme, switchTheme, scheme };
        else if (systemScheme === themes.dark)
            theme = { ...darkTheme, switchTheme, scheme };
    }

    const [fonstLoaded] = useFonts({
        'Montserrat Regular': require('./assets/fonts/Montserrat-Regular.otf'),
        'Montserrat Medium': require('./assets/fonts/Montserrat-Medium.otf'),
        'Montserrat SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
    });

    return !fonstLoaded ? (
        <AppLoading />
    ) : (
        <AppearanceProvider>
            <StatusBar
                translucent={true}
                style={theme.dark ? 'light' : 'dark'}
                backgroundColor="#00000000"
            />
            <PaperProvider
                settings={{
                    icon: (props) => (
                        <IconlyBroken {...props} style={{ marginTop: 2 }} />
                    ),
                }}
                theme={theme}
            >
                <Main />
            </PaperProvider>
        </AppearanceProvider>
    );
}
