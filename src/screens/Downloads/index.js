import React from "react";
import { Text, Appbar } from "react-native-paper";
import { View } from "react-native";
import { Video } from "expo-av";

const Home = () => {
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Downloads" />
                <Appbar.Action
                    icon="setting"
                    rippleColor="#afafaf"
                    onPress={() => console.log("Settings pressed!")}
                />
            </Appbar.Header>

            <Video
                source={{
                    uri:
                        "http://s14.bitdl.ir/Series/One.Piece.1080/One%20Piece.001.1080p.x265.bitdownload.ir.mkv",
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                useNativeControls
                isLooping
                style={{ width: 300, height: 300 }}
            />
        </>
    );
};

export default Home;
