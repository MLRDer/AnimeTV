import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FlatlistItem from './FlatlistItem';

const GridList = ({ data, handleAddFavourite }) => {
    return (
        <FlatList
            data={data}
            numColumns="2"
            style={{ flex: 1 }}
            contentContainerStyle={styles.flatlist}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <FlatlistItem
                    {...item}
                    handleAddFavourite={handleAddFavourite}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    flatlist: {
        padding: 8,
    },
});

export default GridList;
