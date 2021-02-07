import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import IconlyBold from '../../icons/IconlyBold';

const ICON_COLOR = '#FFF';

const style = StyleSheet.create({
    iconStyle: {
        textAlign: 'center',
    },
});

export const PlayIcon = () => (
    <IconlyBold
        name="play-arrow"
        size={48}
        color={ICON_COLOR}
        style={[
            style.iconStyle,
            {
                marginLeft: 4,
                marginTop: 0,
            },
        ]}
    />
);
export const PauseIcon = () => (
    <FontAwesome
        name="pause"
        size={24}
        color={ICON_COLOR}
        style={{ textAlign: 'center' }}
    />
);
export const ForwardIcon = () => (
    <FontAwesome5
        name="forward"
        size={24}
        color={ICON_COLOR}
        style={[
            style.iconStyle,
            {
                marginLeft: 4,
            },
        ]}
    />
);
export const BackwardIcon = () => (
    <FontAwesome5
        name="backward"
        size={24}
        color={ICON_COLOR}
        style={[
            style.iconStyle,
            {
                marginLeft: -4,
            },
        ]}
    />
);

export const Spinner = ({ color }) => (
    <ActivityIndicator color={color} size="large" />
);

export const FullscreenEnterIcon = () => (
    <FontAwesome5
        fadeDuration={0}
        name="expand"
        size={20}
        color={ICON_COLOR}
        style={[style.iconStyle, { marginTop: 2 }]}
    />
);
export const FullscreenExitIcon = () => (
    <FontAwesome5
        fadeDuration={0}
        name="compress"
        size={20}
        color={ICON_COLOR}
        style={[style.iconStyle, { marginTop: 2 }]}
    />
);
export const ReplayIcon = () => (
    <FontAwesome
        name="repeat"
        size={24}
        color={ICON_COLOR}
        style={style.iconStyle}
    />
);
