import React, { Component } from 'react';
import { Text } from 'react-native-paper';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const itemWidth = (width - 16) / 2;
const itemHeight = itemWidth * 1.5;

class FlatlistItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableWithoutFeedback
                key={this.props._id}
                onPress={() => this.props.onPress(this.props)}
            >
                <View
                    style={{
                        width: itemWidth,
                        height: itemHeight,
                    }}
                >
                    <Text
                        style={[
                            styles.rateBadge,
                            {
                                backgroundColor:
                                    this.props.rating >= 7
                                        ? '#2ecc71'
                                        : this.props.rating < 3
                                        ? '#E74C3C'
                                        : '#7f8c8d',
                            },
                        ]}
                    >
                        {this.props.rating}
                    </Text>
                    <View style={styles.container}>
                        <ImageBackground
                            source={{ uri: this.props.poster }}
                            style={styles.imageBackground}
                        >
                            <LinearGradient
                                colors={['transparent', '#34495eef']}
                                style={styles.linearGradient}
                            >
                                <Text style={styles.title}>
                                    {this.props.title}
                                </Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

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
    qualityBadge: {
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        position: 'absolute',
        top: 16,
        right: 0,
        zIndex: 10,
        borderRadius: 2,
        fontSize: 12,
    },
});

export default FlatlistItem;
