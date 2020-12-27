import React, { useState, useEffect } from 'react';
import { Appbar, Subheading, Headline, Button, Text } from 'react-native-paper';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Profile = ({ navigation }) => {
    return (
        <>
            <StatusBar style="dark" />
            <Appbar.Header>
                <Appbar.Content title="Profile" />
                <Appbar.Action
                    icon="setting"
                    rippleColor="#afafaf"
                    onPress={() => {}}
                />
            </Appbar.Header>

            <ScrollView>
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        margin: 16,
                        borderRadius: 8,
                        padding: 24,
                    }}
                >
                    <Image
                        source={require('../../../assets/lightning.png')}
                        resizeMode="contain"
                        style={{
                            width: 160,
                            height: 160,
                            marginTop: 8,
                            marginBottom: 24,
                        }}
                    />
                    <Headline
                        style={{
                            fontSize: 20,
                        }}
                    >
                        AnimeTV Premium!
                    </Headline>
                    <Text
                        style={{
                            marginTop: 8,
                            textAlign: 'center',
                        }}
                    >
                        Remove all annoying ads and get a chance to request your
                        loved animes
                    </Text>
                    <Button
                        style={{
                            marginTop: 24,
                            elevation: 0,
                            width: '100%',
                        }}
                        color="#f1c40f"
                        mode="contained"
                        onPress={() => {}}
                    >
                        Get it
                    </Button>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({});

export default Profile;
