import React from 'react';
import {
    configureFonts,
    DefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import Main from './src/Main';
import IconlyBold from './src/Icons/IconlyBold';
import IconlyBroken from './src/Icons/IconlyBroken';

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'Montserrat Medium',
            fontWeight: '600',
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

const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFF',
        accent: '#070707',
    },
    fonts: configureFonts(fontConfig),
};

export default function App() {
    let [fontsLoaded] = useFonts({
        'Montserrat Regular': require('./assets/fonts/Montserrat-Regular.otf'),
        'Montserrat Medium': require('./assets/fonts/Montserrat-Medium.otf'),
        'Montserrat SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
    });

    return !fontsLoaded ? (
        <AppLoading />
    ) : (
        <PaperProvider
            settings={{
                icon: (props) => (
                    <IconlyBroken {...props} style={{ marginTop: 1.5 }} />
                ),
            }}
            theme={theme}
        >
            <Main />
        </PaperProvider>
    );
}
