import React, { useState } from 'react';
import NurikPlayer from '../../components/NurikPlayer';

const Player = ({ navigation }) => {
    const { title, source, poster } = navigation.state.params;

    return (
        <>
            <NurikPlayer
                title={title}
                source={{
                    uri: source,
                }}
                poster={{
                    uri: poster,
                }}
                navigation={navigation}
            />
        </>
    );
};

export default Player;
