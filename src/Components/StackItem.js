import React from 'react';
import { Text } from 'react-native-paper';
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width - 24,
        height: 240,
        borderColor: 'red',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#999',
    },
    imageBackground: { width: '100%', height: '100%' },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 8,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
});

const StackItem = ({ title, image }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.imageBackground}
            >
                <LinearGradient
                    colors={['transparent', '#34495eef']}
                    style={styles.linearGradient}
                >
                    <Text style={styles.title}>{title}</Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default StackItem;
