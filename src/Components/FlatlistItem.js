import React from 'react';
import { Text, IconButton } from 'react-native-paper';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 280,
        backgroundColor: '#999',
        margin: 4,
        borderRadius: 8,
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

const StackItem = ({ title, image, rating }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text
                style={[
                    styles.rateBadge,
                    {
                        backgroundColor: rating >= 7 ? '#2ecc71' : '#7f8c8d',
                    },
                ]}
            >
                {rating}
            </Text>
            <IconButton
                icon="star"
                style={{
                    position: 'absolute',
                    right: 2,
                    top: 2,
                    zIndex: 10,
                }}
                color="#fff"
                onPress={() => console.log('liked')}
            />
            <View style={styles.container}>
                <ImageBackground
                    source={{ uri: image }}
                    style={styles.imageBackground}
                >
                    <LinearGradient
                        colors={['transparent', '#34495eef']}
                        style={styles.linearGradient}
                    >
                        <Text style={styles.title}>{title}</Text>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </View>
    );
};

export default StackItem;
