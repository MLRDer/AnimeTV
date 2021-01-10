import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import AdPlaceHolder from './AdPlaceHolder';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { withTheme } from 'react-native-paper';

const adUnitID = 'ca-app-pub-3813010680847679/3101185765';
const { width } = Dimensions.get('window');

const AdmobBanner = ({ style, large, theme }) => {
    const [extra, setExtra] = useState('');
    const [error, setError] = useState(false);
    const [shimmer, setShimmer] = useState(false);

    const shimmerColors = [
        theme.colors.surface,
        `${theme.colors.background}aa`,
        theme.colors.surface,
    ];

    return (
        <View>
            {error ? (
                <AdPlaceHolder extraData={extra} large={large} style={style} />
            ) : (
                <View
                    style={[
                        {
                            position: 'relative',
                            margin: 0,
                            overflow: 'hidden',
                            borderRadius: 4,
                            marginHorizontal: 4,
                        },
                    ]}
                >
                    <ShimmerPlaceholder
                        style={[
                            {
                                borderRadius: 4,
                                position: 'absolute',
                                top: 9,
                                zIndex: 1,
                            },
                            style,
                        ]}
                        visible={shimmer}
                        width={width - 24}
                        height={large ? 250 : 100}
                        shimmerWidthPercent={1.3}
                        shimmerColors={shimmerColors}
                    />
                    <AdMobBanner
                        bannerSize={large ? 'mediumRectangle' : 'largeBanner'}
                        style={[
                            styles.container,
                            {
                                backgroundColor: theme.colors.surface,
                            },
                            style,
                        ]}
                        adUnitID={adUnitID}
                        servePersonalizedAds={false}
                        onDidFailToReceiveAdWithError={(data) => {
                            setError(true);
                            console.log(data);
                            setExtra(data);
                        }}
                        onAdViewDidReceiveAd={() => {
                            setShimmer(true);
                            console.log('recieved!!!');
                        }}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 4,
        overflow: 'hidden',
        width: width - 24,
    },
    adPlaceholder: {
        height: 100,
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: '#31A8DC',
    },
    telegramLogo: {
        width: 64,
        height: 64,
        marginLeft: 8,
    },
});

export default withTheme(AdmobBanner);
