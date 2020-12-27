import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

// const adUnitID = 'ca-app-pub-3940256099942544/6300978111';
const adUnitID = 'ca-app-pub-3813010680847679/3101185765';

const AdmobBannerLarge = () => {
    return (
        <AdMobBanner
            bannerSize="mediumRectangle"
            style={styles.container}
            adUnitID={adUnitID}
            servePersonalizedAds={false}
            onDidFailToReceiveAdWithError={(data) => console.log(data)}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 4,
        margin: 12,
        overflow: 'hidden',
    },
});

export default AdmobBannerLarge;
