import React, { useState, useEffect } from 'react';
import { Dimensions, Share, View } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import ContentsSectionList from '../../components/ContentsSectionList';
import WatchLoadingState from '../../components/WatchLoadingState';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Api from '../../api';
import Axios from 'axios';

const { width } = Dimensions.get('window');

const onShare = async (id) => {
    try {
        const result = await Share.share(
            {
                message: `https://cassette.muhammadjanov.uz/collection/${id}`,
            },
            { dialogTitle: 'Cassette 📼' }
        );
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};

const Collection = ({ navigation, route, theme }) => {
    const source = Axios.CancelToken.source();

    console.log(theme.colors.shimmerColors);

    const { id } = route.params;

    const [collection, setCollection] = useState({});

    const { data, loading, error } = collection;

    const setData = (data) => {
        setCollection({ ...collection, ...data });
    };

    const anime = new Api(setData, source);

    useEffect(() => {
        anime.getCollection(id);

        return () => {
            source.cancel();
        };
    }, [id]);

    const handleSelect = (item) => {
        navigation.navigate('Details', { id: item._id });
    };

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('BottomNavigation');
        }
    };

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
                flex: 1,
            }}
        >
            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.surface,
                }}
            >
                <Appbar.Action icon="arrow---left" onPress={goBack} />
                {loading ? (
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <ShimmerPlaceholder
                            style={{
                                borderRadius: 4,
                                margin: 4,
                            }}
                            width={width / 2.5}
                            height={28}
                            shimmerWidthPercent={1.3}
                            shimmerColors={theme.colors.shimmerColors}
                        />
                    </View>
                ) : (
                    <Appbar.Content
                        title={data && data.title ? data.title : 'Collection'}
                        style={{
                            marginLeft: -8,
                        }}
                    />
                )}
                <Appbar.Action icon="send" onPress={() => onShare(id)} />
            </Appbar.Header>
            <WatchLoadingState loading={loading} />

            {data && (
                <ContentsSectionList
                    handleSelect={handleSelect}
                    sections={[data]}
                />
            )}
        </View>
    );
};

export default withTheme(Collection);
