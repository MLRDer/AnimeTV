import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FlatlistItem from './FlatlistItem';

const ContentsSectionListTest = ({
    data,
    loading,
    refreshControl,
    onEndReached,
    handleSelect,
}) => {
    const { width } = Dimensions.get('window');
    const [height, setHeight] = useState(0);

    const itemWidth = (width - 16) / 2;
    const itemHeight = itemWidth * 1.5;

    const onLayout = ({
        nativeEvent: {
            layout: { height },
        },
    }) => {
        setHeight(height);
    };

    const onEndReachedThreshold = () => {
        return 0.3;
        return height ? (width * (3 / 4)) / height : 0;
    };

    return (
        <FlatList
            data={data}
            // onLayout={onLayout}
            numColumns={2}
            refreshControl={refreshControl}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            onEndReached={onEndReached}
            onEndReachedThreshold={onEndReachedThreshold()}
            keyExtractor={(item, index) => item._id + index}
            renderItem={({ item, index }) => (
                <FlatlistItem
                    index={index}
                    key={item._id}
                    width={itemWidth}
                    height={itemHeight}
                    _id={item._id}
                    categories={item.categories}
                    description={item.description}
                    year={item.year}
                    isSerial={item.isSerial}
                    poster={item.poster}
                    image={item.image}
                    rating={item.rating}
                    title={item.title}
                    onPress={() => handleSelect(item._id)}
                />
            )}
            ListFooterComponent={() => {
                return (
                    <View
                        style={{
                            padding: 24,
                            opacity: loading ? 1 : 0,
                        }}
                    >
                        <ActivityIndicator size="small" />
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        paddingBottom: 96,
    },
});

export default ContentsSectionListTest;
