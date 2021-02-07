import React from 'react';
import { Text } from 'react-native';
import { ActivityIndicator, Portal, Modal } from 'react-native-paper';

const SourcesLoading = ({ loading }) => {
    return (
        <Portal>
            <Modal visible={loading}>
                <ActivityIndicator size="large" />
            </Modal>
        </Portal>
    );
};

export default SourcesLoading;
