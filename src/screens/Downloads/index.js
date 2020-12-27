import React, { useState } from 'react';
import { Appbar, IconButton, ProgressBar } from 'react-native-paper';
import { FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DownloadsItem from '../../components/DownloadsItem';

const Downloads = ({ navigation }) => {
    const downloads = [
        {
            name: 'Anime name',
            key: '123',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
            episode: 'Episode name',
            size: 432,
            progress: 29,
            downloading: true,
        },
        {
            name: 'Anime name',
            key: '123456',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
            episode: 'Episode name',
            size: 432,
            progress: 29,
            downloading: true,
        },
        {
            name: 'Anime name',
            key: '123456789',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
            episode: 'Episode name',
            size: 432,
            progress: 29,
            downloading: true,
        },
    ];

    return (
        <>
            <StatusBar style="dark" />
            <Appbar.Header>
                <Appbar.Content title="Downloads" />
                <Appbar.Action
                    icon="setting"
                    rippleColor="#afafaf"
                    onPress={() => {}}
                />
            </Appbar.Header>

            <FlatList
                data={downloads}
                contentContainerStyle={{ padding: 8 }}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <DownloadsItem item={item} />}
            />
        </>
    );
};

export default Downloads;
