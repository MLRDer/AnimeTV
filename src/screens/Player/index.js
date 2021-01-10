import React, { useEffect } from 'react';
import { AdMobInterstitial } from 'expo-ads-admob';
import { StatusBar } from 'expo-status-bar';
import NurikPlayer from '../../components/NurikPlayer';
import { sendReport } from '../../api';

const showAd = async () => {
    await AdMobInterstitial.setAdUnitID(
        'ca-app-pub-3813010680847679/4578769025'
    );
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
    await AdMobInterstitial.showAdAsync();
};

const Player = ({ navigation, route }) => {
    const { title, source, poster, id, episodeId, sourceId } = route.params;

    useEffect(() => {
        showAd();
    });

    const handleErrorSubmit = ({ error }) => {
        sendReport(id, episodeId, sourceId, error);
        navigation.goBack();
    };

    return (
        <>
            <StatusBar style="light" />
            <NurikPlayer
                title={title}
                source={{
                    uri: source,
                }}
                poster={{
                    uri: poster,
                }}
                navigation={navigation}
                videoPlayError={handleErrorSubmit}
            />
        </>
    );
};

export default Player;
