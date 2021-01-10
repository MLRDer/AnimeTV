import React, { useState, useCallback, useEffect } from 'react';
import { View, RefreshControl, StyleSheet } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import CollectionsSectionList from '../../components/CollectionsSectionList';
import HomeLoadingState from '../../components/HomeLoadingState';
import SwipableViewStack from '../../components/CardStack';
import EmptyState from '../../components/EmptyState';
import StackItem from '../../components/StackItem';
import Api from '../../api';
import Axios from 'axios';

const Home = ({ navigation, theme }) => {
    let sectionlist = null;
    const source = Axios.CancelToken.source();

    const [refreshing, setRefreshing] = useState(false);

    // *** API CALL SECTION - START *** //
    const [state, setState] = useState({});
    const { data, loading, error } = state;

    const setData = (data) => {
        setState({ ...state, ...data });
        setRefreshing(false);
    };

    const api = new Api(setData, source);

    useEffect(() => {
        api.getHome(true);

        return () => {
            source.cancel();
        };
    }, []);

    const refresh = () => {
        api.getHome(false);
        setRefreshing(true);
    };

    const onRefresh = useCallback(refresh, [refreshing]);
    // *** API CALL SECTION - END*** //

    const scrollToTop = () => {
        sectionlist &&
            sectionlist.scrollToLocation({
                animated: true,
                sectionIndex: 0,
                itemIndex: 0,
                viewOffset: 500,
            });
    };

    const handleSelect = (item) => {
        navigation.navigate('Details', { id: item._id });
    };

    const openCollection = (id) => {
        navigation.navigate('Collection', { id });
    };

    const ListHeaderComponent = () => (
        <>
            {data && data.card && data.card.length ? (
                <View style={styles.container} key="CardStack">
                    <SwipableViewStack
                        data={data.card}
                        renderItem={(element) => <StackItem {...element} />}
                        onItemClicked={(element) => handleSelect(element)}
                        stackSpacing={-20}
                    />
                </View>
            ) : null}
        </>
    );

    const NoData = () => {
        if (data && data.collections && data.collections.length) return null;
        else if (!loading && !refreshing)
            return (
                <EmptyState
                    text={'Oops.. Nothing to show!'}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    refresh={() => {
                        refresh();
                        setRefreshing(true);
                    }}
                />
            );
        else return null;
    };

    return (
        <>
            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.surface,
                }}
            >
                <Appbar.Content title="Cassette" onPress={scrollToTop} />
            </Appbar.Header>

            <HomeLoadingState loading={loading} />

            {data ? (
                <CollectionsSectionList
                    openCollection={openCollection}
                    handleSelect={handleSelect}
                    reference={(component) => {
                        sectionlist = component;
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ListHeaderComponent={<ListHeaderComponent />}
                    sections={data.collections}
                />
            ) : null}

            <NoData />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 64,
        zIndex: 100,
        marginTop: -4,
    },
    heading: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headingText: { fontSize: 20 },
});

export default withTheme(Home);
