import React, { PureComponent, Component } from 'react';
import { Text, withTheme } from 'react-native-paper';
import {
    View,
    ImageBackground,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class StackItem extends Component {
    constructor(props) {
        super(props);
        this.theme = this.props.theme;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps) {
            return true;
        }

        if (this.state.title !== nextState.title) {
            return true;
        }

        if (this.state.image !== nextState.image) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View
                    style={[
                        styles.container,
                        {
                            backgroundColor: this.theme.colors.background,
                        },
                    ]}
                >
                    <ImageBackground
                        source={{ uri: this.props.image }}
                        style={styles.imageBackground}
                    >
                        <LinearGradient
                            colors={['transparent', this.theme.colors.accent]}
                            style={styles.linearGradient}
                        >
                            <Text style={styles.title}>{this.props.title}</Text>
                        </LinearGradient>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width - 24,
        height: (width - 24) / 1.7,
        borderColor: 'red',
        borderRadius: 4,
        overflow: 'hidden',
    },
    imageBackground: { width: '100%', height: '100%' },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 8,
        paddingBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
});

export default withTheme(StackItem);
