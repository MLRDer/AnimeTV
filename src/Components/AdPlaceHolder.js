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

const AddPlaceHolder = ({ style, large, extraData, theme }) => {
    const logoSize = large ? 96 : 64;

    return (
        <View
            style={[
                styles.container,
                style,
                {
                    borderWidth: 0,
                    height: large ? 250 : 100,
                    padding: large ? 32 : 16,
                    justifyContent: large ? 'flex-start' : 'center',
                },
            ]}
        >
            <View
                style={{
                    flexDirection: large ? 'column' : 'row',
                }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={[
                            styles.telegramLogo,
                            { width: logoSize, height: logoSize },
                        ]}
                        source={require('../../assets/telegram_logo.png')}
                    />
                </View>
                <View
                    style={[
                        {
                            alignItems: 'center',
                            marginTop: large ? 24 : 0,
                        },
                        large ? null : { flex: 1 },
                    ]}
                >
                    <Text
                        style={{
                            marginBottom: 8,
                            color: '#fff',
                            textAlign: 'center',
                        }}
                    >
                        Join our Telegram channel!
                    </Text>
                    <Button
                        color={'#fff'}
                        mode="contained"
                        labelStyle={{
                            color: '#31A8DC',
                        }}
                        style={{
                            elevation: 0,
                            marginTop: large ? 4 : 0,
                        }}
                        onPress={() => {
                            Linking.openURL(getLink());
                        }}
                    >
                        Open Channel
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 4,
        marginVertical: 8,
        borderRadius: 4,
        overflow: 'hidden',
        width: width - 24,
        backgroundColor: '#31A8DC',
    },
    telegramLogo: {
        marginLeft: 8,
        justifyContent: 'center',
    },
});

export default withTheme(AddPlaceHolder);
