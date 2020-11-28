import React from 'react';
import { Text, Appbar } from 'react-native-paper';
import { View } from 'react-native';

const Home = () => {
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Downloads" />
                <Appbar.Action
                    icon="setting"
                    rippleColor="#afafaf"
                    onPress={() => console.log('Settings pressed!')}
                />
            </Appbar.Header>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Downloads</Text>
            </View>
        </>
    );
};

export default Home;
