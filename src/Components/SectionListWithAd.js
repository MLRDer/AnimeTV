import React from 'react';
import { StyleSheet, SectionList, View, Dimensions } from 'react-native';
import FlatlistItem from './FlatlistItem';

const HomeEmptyState = ({
    sections,
    refreshControl,
    reference,
    ListHeaderComponent,
    SectionFooterComponent,
    handleSelect,
}) => {
    const { width } = Dimensions.get('window');

    const itemWidth = (width - 16) / 2;
    const itemHeight = itemWidth * 1.5;

    const renderItem = ({ section, index }) => {
        const numColumns = 2;

        if (index % numColumns !== 0) return null;

        const items = [];

        for (let i = index; i < index + numColumns; i++) {
            if (i >= section.data.length) {
                break;
            }

            const item = section.data[i];

            items.push(
                <FlatlistItem
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
                    onPress={handleSelect}
                />
            );
        }

        return <View style={styles.row}>{items}</View>;
    };

    return (
        <SectionList
            ref={reference}
            refreshControl={refreshControl}
            ListHeaderComponent={ListHeaderComponent}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            windowSize={11}
            sections={sections}
            style={{ flexGrow: 0 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            keyExtractor={(item, index) => item._id + index}
            renderItem={renderItem}
            renderSectionFooter={SectionFooterComponent}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        paddingTop: 0,
    },
    row: {
        flexDirection: 'row',
    },
});

export default HomeEmptyState;
