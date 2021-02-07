import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import AdPlaceHolder from './AdPlaceHolder';
import { withTheme } from 'react-native-paper';

const adUnitID = 'ca-app-pub-1207589833336849/3077573376';

const AdmobBanner = ({ width, theme }) => {
    const [error, setError] = useState(false);

    const styles = createStyles(theme, width);

    return (
        <View>
            {error ? (
                <AdPlaceHolder
                    width={width || Dimensions.get('window').width}
                />
            ) : (
                <View style={styles.container}>
                    <AdMobBanner
                        adUnitID={adUnitID}
                        style={styles.banner}
                        servePersonalizedAds={true}
                        bannerSize="smartBannerPortrait"
                        onDidFailToReceiveAdWithError={(data) => {
                            setError(true);
                        }}
                    />
                </View>
            )}
        </View>
    );
};

const createStyles = (theme, width) =>
    StyleSheet.create({
        container: {
            margin: 0,
            overflow: 'hidden',
            marginHorizontal: 4,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
        },
        banner: {
            width,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.surface,
        },
    });

export default withTheme(AdmobBanner);
