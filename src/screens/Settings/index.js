import React from 'react';
import {
    Appbar,
    Headline,
    Button,
    Text,
    withTheme,
    Switch,
    List,
} from 'react-native-paper';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 80) / 3;

const Settings = ({ navigation, theme }) => {
    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('BottomNavigation');
        }
    };

    return (
        <>
            <Appbar.Header
                style={{
                    backgroundColor: theme.colors.surface,
                }}
            >
                <Appbar.Action icon="arrow---left" onPress={goBack} />

                <Appbar.Content
                    title="Settings"
                    style={{
                        marginLeft: -8,
                    }}
                />
            </Appbar.Header>

            <ScrollView
                style={{
                    backgroundColor: theme.colors.background,
                }}
                contentContainerStyle={{
                    paddingVertical: 16,
                }}
            >
                <View
                    style={{
                        backgroundColor: theme.colors.surface,
                        padding: 16,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        Color theme
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            marginTop: 16,
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => theme.switchTheme('light')}
                        >
                            <View style={{}}>
                                <Image
                                    style={[
                                        styles.themeItem(
                                            theme.colors.background
                                        ),
                                        theme.scheme === 'light'
                                            ? styles.active(theme.colors.accent)
                                            : null,
                                    ]}
                                    source={require('../../../assets/light.png')}
                                />
                                <Text
                                    style={{
                                        color:
                                            theme.scheme === 'light'
                                                ? theme.colors.text
                                                : theme.colors.disabled,
                                        marginTop: 8,
                                        fontSize: 12,
                                    }}
                                >
                                    Light
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => theme.switchTheme('dark')}
                        >
                            <View>
                                <Image
                                    style={[
                                        styles.themeItem(
                                            theme.colors.background
                                        ),
                                        theme.scheme === 'dark'
                                            ? styles.active(theme.colors.accent)
                                            : null,
                                    ]}
                                    source={require('../../../assets/dark.png')}
                                />
                                <Text
                                    style={{
                                        color:
                                            theme.scheme === 'dark'
                                                ? theme.colors.text
                                                : theme.colors.disabled,
                                        marginTop: 8,
                                        fontSize: 12,
                                    }}
                                >
                                    Dark
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => theme.switchTheme('auto')}
                        >
                            <View>
                                <Image
                                    style={[
                                        styles.themeItem(
                                            theme.colors.background
                                        ),
                                        theme.scheme === 'auto'
                                            ? styles.active(theme.colors.accent)
                                            : null,
                                    ]}
                                    source={require('../../../assets/auto.png')}
                                />
                                <Text
                                    style={{
                                        color:
                                            theme.scheme === 'auto'
                                                ? theme.colors.text
                                                : theme.colors.disabled,
                                        marginTop: 8,
                                        fontSize: 12,
                                    }}
                                >
                                    System default
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    themeItem: (disabled) => ({
        width: imageSize,
        height: imageSize,
        borderColor: disabled,
        borderWidth: 2,
        borderRadius: 8,
        overflow: 'hidden',
    }),
    active: (primary) => ({
        borderColor: primary,
    }),
    image: {
        width: width / 3,
        height: width / 3,
        marginTop: 8,
        marginBottom: 24,
        borderRadius: 24,
    },
    heading: {
        fontSize: 20,
    },
    subHeading: {
        marginTop: 8,
        textAlign: 'center',
    },
    button: {
        marginTop: 24,
        elevation: 0,
        width: '100%',
    },
});

export default withTheme(Settings);
