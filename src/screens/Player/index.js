import React, { useEffect, useState } from 'react';
import { AdMobInterstitial, setTestDeviceIDAsync } from 'expo-ads-admob';
import NurikPlayer from '../../components/NurikPlayer';

const showAd = async () => {
    await AdMobInterstitial.setAdUnitID(
        'ca-app-pub-3940256099942544/8691691433'
    );
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
    await AdMobInterstitial.showAdAsync();
};

const Player = ({ navigation }) => {
    const { title, source, poster } = navigation.state.params;

    useEffect(() => {
        showAd();
    });

    return (
        <>
            <NurikPlayer
                title={title}
                source={{
                    uri: source,
                }}
                poster={{
                    uri: poster,
                }}
                navigation={navigation}
            />
        </>
    );
};

export default Player;
