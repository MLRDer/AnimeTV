import { ThemeProvider } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import {
    Subheading,
    Portal,
    Modal,
    Text,
    Button,
    withTheme,
} from 'react-native-paper';

const { width } = Dimensions.get('window');

const VideoError = ({ visible, onSubmit, error, theme }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                contentContainerStyle={[
                    styles.container,
                    {
                        backgroundColor: theme.colors.surface,
                    },
                ]}
            >
                <Image
                    source={require('../../assets/compass.png')}
                    resizeMode="contain"
                    fadeDuration={0}
                    style={styles.image}
                />
                <Subheading
                    style={styles.subheading}
                >{`Something went wrong!`}</Subheading>

                <Text style={styles.text}>{error}</Text>

                <Button
                    mode="contained"
                    color={theme.colors.primary}
                    style={styles.button}
                    onPress={onSubmit}
                >
                    Go back
                </Button>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        margin: 24,
        borderRadius: 4,
        alignItems: 'center',
    },
    image: {
        width: width / 3,
        height: width / 3,
        marginBottom: 16,
    },
    text: {
        marginBottom: 8,
        marginTop: 8,
        textAlign: 'center',
    },
    subheading: {
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
        width: '100%',
    },
});

export default withTheme(VideoError);
