import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Subheading, Portal, Modal, Text, withTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

const NoConnection = ({ visible, hideModal, theme }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
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
                <Subheading style={styles.subheading}>
                    {'Probably you are offline'}
                </Subheading>

                <Text style={styles.text}>
                    Check your internet connection and try again
                </Text>
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
});

export default withTheme(NoConnection);
