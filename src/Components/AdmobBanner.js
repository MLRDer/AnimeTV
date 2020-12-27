import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

// const adUnitID = 'ca-app-pub-3940256099942544/6300978111';
const adUnitID = 'ca-app-pub-3813010680847679/3101185765';

const AdmobBanner = () => {
    const { width } = Dimensions.get('window');

    return (
        <AdMobBanner
            bannerSize="largeBanner"
            style={[styles.container, { width: width - 24 }]}
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
        margin: 4,
        marginVertical: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
});

export default AdmobBanner;
