import React, { Component, PureComponent } from 'react';
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

class FlatlistItem extends PureComponent {
    constructor(props) {
        super(props);
        this.theme = this.props.theme;
        this.styles = createStyles(this.theme);
    }

    render() {
        return (
            <TouchableWithoutFeedback
                key={this.props._id}
                onPress={this.props.onPress}
            >
                <View
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                >
                    <Text
                        style={[
                            this.styles.rateBadge,
                            {
                                backgroundColor:
                                    this.props.rating >= 7
                                        ? this.theme.colors.green
                                        : this.props.rating >= 3
                                        ? this.theme.colors.yellow
                                        : this.theme.colors.red,
                            },
                        ]}
                    >
                        {this.props.rating.toFixed(1)}
                    </Text>
                    <View
                        style={[
                            this.styles.container,
                            {
                                backgroundColor: this.theme.colors.surface,
                            },
                        ]}
                    >
                        <ImageBackground
                            defaultSource={require('../../assets/defaultImage.png')}
                            source={{ uri: this.props.poster }}
                            style={this.styles.imageBackground}
                        >
                            <LinearGradient
                                colors={[
                                    'transparent',
                                    this.theme.colors.accent,
                                ]}
                                style={this.styles.linearGradient}
                            >
                                <Text style={this.styles.title}>
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

const createStyles = (theme) =>
    StyleSheet.create({
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
            bottom: -1,
            height: '30%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 8,
            paddingBottom: 8,
        },
        title: {
            color: theme.colors.white,
            fontSize: 14,
            textAlign: 'center',
        },
        rateBadge: {
            color: theme.colors.white,
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
