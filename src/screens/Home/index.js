import React, { useState, useCallback, useEffect } from 'react';
import { View, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

import CollectionsSectionList from '../../components/CollectionsSectionList';
import HomeLoadingState from '../../components/HomeLoadingState';
import EmptyState from '../../components/EmptyState';
import StackItem from '../../components/StackItem';
import Api from '../../api';
import Axios from 'axios';

const { width, height } = Dimensions.get('window');

class ListHeaderComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.data &&
                this.props.data.card &&
                this.props.data.card.length ? (
                    <View style={styles.container} key="CardStack">
                        <Carousel
                            containerCustomStyle={{
                                height: width / 1.7 + 20,
                            }}
                            data={this.props.data.card}
                            renderItem={(element) => {
                                return (
                                    <StackItem
                                        onPress={() =>
                                            this.props.handleSelect(
                                                element.item._id
                                            )
                                        }
                                        title={element.item.title}
                                        image={element.item.image}
                                        index={element.index}
                                    />
                                );
                            }}
                            slideStyle={{ padding: 12 }}
                            initialNumToRender={24}
                            loopClonesPerSide={8}
                            sliderWidth={width}
                            itemWidth={width}
                            layout="tinder"
                            layoutCardOffset={12}
                            loop
                            sliderHeight={height}
                            autoplay
                            firstItem={0}
                            useScrollView={false}
                            autoplayDelay={5000}
                            autoplayInterval={5000}
                        />
                    </View>
                ) : null}
            </>
        );
    }
}

const Home = ({ navigation, theme, active }) => {
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

    const handleSelect = (id) => {
        navigation.navigate('Details', { id });
    };

    const openCollection = (id) => {
        navigation.navigate('Collection', { id });
    };

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
                    ListHeaderComponent={
                        <ListHeaderComponent
                            handleSelect={handleSelect}
                            data={data}
                        />
                    }
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
        zIndex: 100,
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
