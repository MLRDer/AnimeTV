import React from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native';
import { Subheading, Button } from 'react-native-paper';

const HomeEmptyState = ({ refresh }) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    marginTop: -32,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('../../assets/loupe.png')}
                    resizeMode="contain"
                    fadeDuration={0}
                    style={styles.image}
                />
                <Subheading>{'Oops.. No animes were found'}</Subheading>
                <Button
                    onPress={refresh}
                    style={styles.button}
                    rippleColor="red"
                    color="#ecf0f1"
                    mode="contained"
                >
                    Reset filters
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 16,
        transform: [
            {
                rotate: '-12deg',
            },
        ],
    },
    button: {
        marginTop: 16,
        elevation: 0,
        borderColor: '#2c3e50',
    },
});

export default HomeEmptyState;
