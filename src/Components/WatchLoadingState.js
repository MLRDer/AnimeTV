import React from 'react';
import { View, Dimensions } from 'react-native';
import { withTheme } from 'react-native-paper';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const { width, height } = Dimensions.get('window');
const itemWidth = (width - 16) / 2;
const itemHeight = itemWidth * 1.5;

const WatchLoadingState = ({ loading, theme }) => {
    return loading ? (
        <View
            style={{
                padding: 8,
                height,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        margin: 4,
                    }}
                    width={itemWidth - 8}
                    height={itemHeight - 8}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        margin: 4,
                    }}
                    width={itemWidth - 8}
                    height={itemHeight - 8}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        margin: 4,
                    }}
                    width={itemWidth - 8}
                    height={itemHeight - 8}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        margin: 4,
                    }}
                    width={itemWidth - 8}
                    height={itemHeight - 8}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        margin: 4,
                    }}
                    width={itemWidth - 8}
                    height={itemHeight - 8}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        margin: 4,
                    }}
                    width={itemWidth - 8}
                    height={itemHeight - 8}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
            </View>
        </View>
    ) : null;
};

export default withTheme(WatchLoadingState);
