import React from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native';
import { Subheading, Button, withTheme } from 'react-native-paper';
const { width } = Dimensions.get('window');

const EmptyState = ({ refresh, text, theme }) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    marginTop: -32,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('../../assets/loupe.png')}
                    resizeMode="contain"
                    fadeDuration={0}
                    style={styles.image}
                />
                <Subheading>{text}</Subheading>
                <Button
                    onPress={refresh}
                    style={[
                        styles.button,
                        {
                            borderColor: theme.colors.primary,
                        },
                    ]}
                    color="#ecf0f1"
                    mode="contained"
                >
                    Refresh
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    image: {
        width: width / 3,
        height: width / 3,
        marginBottom: 24,
        transform: [
            {
                rotate: '-12deg',
            },
        ],
    },
    button: {
        marginTop: 16,
        elevation: 0,
    },
});

export default withTheme(EmptyState);
