import React, { useState, useCallback, useEffect } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import ContentsSectionList from './ContentsSectionList';
import WatchLoadingState from './WatchLoadingState';
import EmptyState from './EmptyState';
import AdmobBanner from './AdmobBanner';
import Api from '../api';
import Axios from 'axios';

const Contents = ({ handleSelect, filters, setFilters, type }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const source = Axios.CancelToken.source();

    // *** API CALL SECTION - START *** //
    const [state, setState] = useState({
        loading: true,
        data: [],
        count: 0,
    });
    const { data, loading, error } = state;

    const setData = (data) => {
        setState({ ...state, ...data });
        setRefreshing(false);
        setLoadingMore(false);
    };

    const api = new Api(setData, source);

    useEffect(() => {
        refresh();
    }, [filters]);

    const refresh = () => {
        setRefreshing(true);
        api.getAll({
            type,
            page: 1,

            ...filters,
        });
        setPage(1);
    };

    const onRefresh = useCallback(refresh, [refreshing]);

    const onEndReached = () => {
        if (state.count > state.data.length) {
            setLoadingMore(true);

            api.getAll(
                {
                    type,
                    page: page + 1,

                    ...filters,
                },
                true,
                state.data,
                () => setPage(page + 1)
            );
        }
    };
    // *** API CALL SECTION - END*** //

    return (
        <View
            style={{
                position: 'relative',
            }}
        >
            {!data && !loading && (
                <EmptyState
                    text={`Oops.. No ${type}s were found!`}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    refresh={() => {
                        setRefreshing(true);
                    }}
                />
            )}
            <WatchLoadingState loading={loading} />

            <ContentsSectionList
                data={data}
                loading={loadingMore}
                handleSelect={handleSelect}
                onEndReached={onEndReached}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                }}
            >
                <AdmobBanner width={Dimensions.get('window').width} />
            </View>
        </View>
    );
};

export default Contents;
