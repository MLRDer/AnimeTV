import React from 'react';
import { Text, IconButton, ProgressBar } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import IconlyBold from '../icons/IconlyBold';

const PlayIcon = () => (
    <IconlyBold
        name="play-arrow"
        size={32}
        style={[
            {
                marginLeft: 2,
                marginTop: 0,
            },
        ]}
    />
);

const DeleteIcon = () => <IconlyBold name="delete" size={24} color="#E74C3C" />;

const FlatlistItem = ({ item }) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                padding: 8,
                backgroundColor: '#fff',
                marginVertical: 4,
                borderRadius: 4,
            }}
        >
            <Image
                style={{
                    width: 56,
                    height: 84,
                    borderRadius: 4,
                }}
                source={{
                    uri: item.image,
                }}
            />
            <View
                style={{
                    justifyContent: 'space-between',
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 14,
                                marginLeft: 12,
                            }}
                        >
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,

                                marginLeft: 12,
                            }}
                        >
                            {item.episode}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            style={{
                                backgroundColor: '#fcfcfc',
                                margin: 0,
                                marginRight: 12,
                            }}
                            icon={() => <PlayIcon />}
                            size={24}
                            rippleColor="#999"
                            onPress={() => {
                                console.log('Play');
                            }}
                        />
                        <IconButton
                            style={{
                                backgroundColor: '#fcfcfc',
                                margin: 0,
                            }}
                            icon={() => <DeleteIcon />}
                            size={24}
                            rippleColor="#E74C3C"
                            onPress={() => {
                                console.log('Play');
                            }}
                        />
                    </View>
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                marginLeft: 12,
                                textTransform: 'uppercase',
                            }}
                        >
                            {item.size} mb
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                marginLeft: 12,
                                textTransform: 'uppercase',
                            }}
                        >
                            {item.progress} %
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginVertical: 4,
                            marginLeft: 12,
                        }}
                    >
                        <ProgressBar
                            progress={item.progress / 100}
                            color="#2C3E50"
                            style={{
                                borderRadius: 1,
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 280,
        backgroundColor: '#999',
        margin: 4,
        borderRadius: 4,
        overflow: 'hidden',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 8,
        paddingBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    rateBadge: {
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        position: 'absolute',
        top: 16,
        left: 0,
        zIndex: 10,
        borderRadius: 2,
        fontSize: 12,
    },
});

export default FlatlistItem;
