import React from 'react';
import { Text, Appbar } from 'react-native-paper';
import { View } from 'react-native';

const Favourites = () => {
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Favourites" />
            </Appbar.Header>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Favourites</Text>
            </View>
        </>
    );
};

export default Favourites;
