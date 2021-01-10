import React from 'react';
import {
    StyleSheet,
    SectionList,
    View,
    Dimensions,
    FlatList,
} from 'react-native';
import { Button, IconButton, Text, withTheme } from 'react-native-paper';
import FlatlistItem from './FlatlistItem';

const CollectionsSectionList = ({
    sections,
    refreshControl,
    reference,
    handleSelect,
    onScroll,
    ListHeaderComponent,
    openCollection,
    theme,
}) => {
    const { width } = Dimensions.get('window');
    const itemWidth = (width - 16) / 2.5;
    const itemHeight = itemWidth * 1.5;

    return (
        <>
            <SectionList
                ListHeaderComponent={ListHeaderComponent}
                onScroll={onScroll}
                ref={reference}
                refreshControl={refreshControl}
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                windowSize={11}
                sections={sections}
                style={{ flexGrow: 0 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
                keyExtractor={(item) => {
                    return item._id;
                }}
                renderSectionHeader={({ section }) => {
                    return section.data.length ? (
                        <View key={section._id}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 4,
                                    marginBottom: -4,
                                    paddingHorizontal: 16,
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        marginLeft: 4,
                                        fontSize: 18,
                                        fontFamily: 'Montserrat SemiBold',
                                    }}
                                >
                                    {section.title}
                                </Text>
                                <Button
                                    compact
                                    contentStyle={{
                                        margin: 0,
                                        height: 32,
                                    }}
                                    mode="text"
                                    color="black"
                                    labelStyle={{
                                        fontSize: 12,
                                    }}
                                    uppercase={false}
                                    onPress={() => openCollection(section._id)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                        }}
                                    >
                                        All
                                    </Text>
                                </Button>
                            </View>

                            <FlatList
                                maxToRenderPerBatch={3}
                                initialNumToRender={3}
                                windowSize={5}
                                data={section.data.slice(0, 4)}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    padding: 8,
                                }}
                                keyExtractor={(_item, index) => _item._id}
                                renderItem={({ item: _item }) => (
                                    <FlatlistItem
                                        width={itemWidth}
                                        height={itemHeight}
                                        _id={_item._id}
                                        categories={_item.categories}
                                        description={_item.description}
                                        year={_item.year}
                                        isSerial={_item.isSerial}
                                        poster={_item.poster}
                                        image={_item.image}
                                        rating={_item.rating}
                                        title={_item.title}
                                        onPress={handleSelect}
                                        horizontal
                                    />
                                )}
                                ListFooterComponent={() => (
                                    <View
                                        style={{
                                            margin: 4,
                                            width: itemWidth - 8,
                                            height: itemHeight - 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IconButton
                                            size={40}
                                            style={{
                                                backgroundColor:
                                                    theme.colors.surface,
                                                elevation: 4,
                                            }}
                                            icon="arrow---right"
                                            onPress={() =>
                                                openCollection(section._id)
                                            }
                                        />
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                marginTop: 8,
                                            }}
                                        >
                                            Show all
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>
                    ) : null;
                }}
                renderItem={() => {
                    return null;
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
});

export default withTheme(CollectionsSectionList);
