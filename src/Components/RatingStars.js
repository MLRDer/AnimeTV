import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-paper';
import IconlyBold from '../icons/IconlyBold';

const RatingStars = ({
    value,
    backGroundColor,
    color,
    starSize,
    style,
    theme,
}) => {
    const starsCount = new Array(10).fill(1);
    const size = starSize ? starSize : 16;
    return (
        <View style={[styles.container, style]}>
            <View style={styles.stars}>
                {starsCount.map((e, index) => (
                    <IconlyBold
                        key={index}
                        color={backGroundColor ? backGroundColor : '#ecf0f1'}
                        size={size}
                        name="star"
                    />
                ))}
            </View>
            <View
                style={[
                    styles.stars,
                    { width: value * size, position: 'absolute' },
                ]}
            >
                {starsCount.map((e, index) => (
                    <IconlyBold
                        key={index}
                        color={color ? color : theme.colors.yellow}
                        size={size}
                        name="star"
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { position: 'relative' },
    stars: { flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
});

export default withTheme(RatingStars);
