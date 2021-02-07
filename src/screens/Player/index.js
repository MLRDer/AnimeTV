import React, { useEffect } from 'react';
import { AdMobInterstitial, AdMobRewarded } from 'expo-ads-admob';
import { StatusBar } from 'expo-status-bar';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import NurikPlayer from '../../components/NurikPlayer';
import { sendReport } from '../../api';

const rewardedAdUnitID = 'ca-app-pub-1207589833336849/4408651125';
const screenAdUnitID = 'ca-app-pub-1207589833336849/4199083350';

const showAd = async () => {
    await AdMobRewarded.setAdUnitID(rewardedAdUnitID);
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
    await AdMobRewarded.showAdAsync();
};

const Player = ({ navigation, route }) => {
    const { title, source, poster, id, episodeId, sourceId } = route.params;

    let rewarded = false;

    const goBack = () => {
        navigation.goBack();
    };

    const handleErrorSubmit = ({ error }) => {
        // error && sendReport(id, episodeId, sourceId, error);
        goBack();
    };

    useEffect(() => {
        AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => {
            rewarded = true;
        });
        AdMobRewarded.addEventListener('rewardedVideoDidClose', () => {
            if (!rewarded) goBack();
        });

        // showAd();

        return () => {
            AdMobRewarded.removeAllListeners();
        };
    }, []);

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
                goBack={goBack}
                videoPlayError={handleErrorSubmit}
            />
        </>
    );
};

export default Player;
