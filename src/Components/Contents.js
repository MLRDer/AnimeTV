import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import ContentsSectionList from './ContentsSectionList';
import WatchLoadingState from './WatchLoadingState';
import EmptyState from './EmptyState';
import Api from '../api';
import Axios from 'axios';

const Contents = ({ handleSelect, filters, setFilters, type }) => {
    const [refreshing, setRefreshing] = useState(false);
    const source = Axios.CancelToken.source();

    // *** API CALL SECTION - START *** //
    const [state, setState] = useState({});
    const { data, loading, error } = state;

    const setData = (data) => {
        setState({ ...state, ...data });
        setRefreshing(false);
    };

    const api = new Api(setData, source, {
        type,
        ...filters,
    });

    useEffect(() => {
        api.getAll();

        return () => {
            source.cancel();
        };
    }, [filters]);

    const refresh = () => {
        api.getAll(false);
        setRefreshing(true);
    };

    const onRefresh = useCallback(refresh, [refreshing]);
    // *** API CALL SECTION - END*** //

    return (
        <>
            <WatchLoadingState loading={loading} />

            <ContentsSectionList
                handleSelect={handleSelect}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                sections={data}
            />
            {!(data && data.length) && !loading && (
                <EmptyState
                    text={`Oops.. No ${type}s were found!`}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    refresh={() => {
                        setFilters({});
                        setRefreshing(true);
                    }}
                />
            )}
        </>
    );
};

export default Contents;
