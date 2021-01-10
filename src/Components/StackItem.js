import React from 'react';
import { Text, withTheme } from 'react-native-paper';
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StackItem = ({ title, image, theme }) => {
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background,
                },
            ]}
        >
            <ImageBackground
                source={{ uri: image }}
                style={styles.imageBackground}
            >
                <LinearGradient
                    colors={['transparent', theme.colors.accent]}
                    style={styles.linearGradient}
                >
                    <Text style={styles.title}>{title}</Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width - 24,
        height: (width - 24) / 1.7,
        borderColor: 'red',
        borderRadius: 4,
        overflow: 'hidden',
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
        paddingBottom: 16,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
});

export default withTheme(StackItem);
