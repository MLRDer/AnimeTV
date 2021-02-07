import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { Button, Text, withTheme } from 'react-native-paper';
import * as Linking from 'expo-linking';

const { width } = Dimensions.get('window');

const telegramChannels = {
    cassette: 'https://t.me/cassettebox',
    watchAndEnjoy: 'https://t.me/movies_cartoons_english',
    animeTv: 'https://t.me/Anime_kissanime_japanCartoons',
};

const getLink = () =>
    Object.values(telegramChannels)[
        Math.floor(Math.random() * Object.values(telegramChannels).length)
    ];

const AddPlaceHolder = ({ width, theme }) => {
    const styles = createStyles(theme, width);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.telegramLogo}
                    source={require('../../assets/telegram_logo.png')}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Join our Telegram channel!</Text>
                <Button
                    color={theme.colors.white}
                    mode="contained"
                    labelStyle={styles.buttonLabel}
                    style={styles.button}
                    onPress={() => {
                        Linking.openURL(getLink());
                    }}
                >
                    Open Channel
                </Button>
            </View>
        </View>
    );
};

const createStyles = (theme, width) =>
    StyleSheet.create({
        container: {
            width,
            backgroundColor: theme.colors.telegram,
            height: 88,
            padding: 12,
            justifyContent: 'center',
            flexDirection: 'row',
        },
        logoContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        telegramLogo: {
            marginLeft: 32,
            justifyContent: 'center',
            width: 56,
            height: 56,
        },
        content: {
            alignItems: 'center',
            marginTop: 0,
            flex: 1,
        },
        text: {
            marginBottom: 8,
            textAlign: 'center',
            color: theme.colors.white,
        },
        button: {
            elevation: 0,
            marginTop: 0,
        },
        buttonLabel: {
            color: theme.colors.telegram,
            fontSize: 12,
        },
    });

export default withTheme(AddPlaceHolder);
