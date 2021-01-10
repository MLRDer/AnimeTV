import React, { Component } from 'react';
import { Text, withTheme } from 'react-native-paper';
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
        this.theme = this.props.theme;
    }

    render() {
        return (
            <TouchableWithoutFeedback
                key={this.props._id}
                onPress={() => this.props.onPress(this.props)}
            >
                <View
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                >
                    <Text
                        style={[
                            styles.rateBadge,
                            {
                                backgroundColor:
                                    this.props.rating >= 7
                                        ? this.theme.colors.green
                                        : this.props.rating < 3
                                        ? this.theme.colors.red
                                        : this.theme.colors.disabled,
                            },
                        ]}
                    >
                        {this.props.rating}
                    </Text>
                    <View
                        style={[
                            styles.container,
                            {
                                backgroundColor: this.theme.colors.surface,
                            },
                        ]}
                    >
                        <ImageBackground
                            source={{ uri: this.props.poster }}
                            style={styles.imageBackground}
                        >
                            <LinearGradient
                                colors={[
                                    'transparent',
                                    'transparent',
                                    this.theme.colors.accent,
                                ]}
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

FlatlistItem.defaultProps = {
    width: itemWidth,
    height: itemHeight,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 280,
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

export default withTheme(FlatlistItem);
