import React from 'react';
import {
    StyleSheet,
    SectionList,
    View,
    Dimensions,
    Animated,
} from 'react-native';
import FlatlistItem from './FlatlistItem';
import AdmobBanner from './AdmobBanner';

const ContentsSectionList = ({
    sections,
    refreshControl,
    reference,
    ListHeaderComponent,
    handleSelect,
    onScroll,
    containerStyle,
    showAd = true,
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
                    onPress={handleSelect}
                />
            );
        }

        return <View style={styles.row}>{items}</View>;
    };

    return (
        <SectionList
            onScroll={onScroll}
            ref={reference}
            refreshControl={refreshControl}
            ListHeaderComponent={ListHeaderComponent}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            windowSize={8}
            sections={sections}
            style={{ flexGrow: 0 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.container, containerStyle]}
            keyExtractor={(item, index) => item._id + index}
            renderItem={renderItem}
            renderSectionFooter={() =>
                showAd ? <AdmobBanner key="ad" /> : null
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    row: {
        flexDirection: 'row',
    },
});

export default ContentsSectionList;
