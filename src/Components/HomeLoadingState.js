import React from 'react';
import { View, Dimensions } from 'react-native';
import { withTheme } from 'react-native-paper';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const { width, height } = Dimensions.get('window');
const itemWidth = (width - 16) / 2.5;
const itemHeight = itemWidth * 1.5;

const HomeLoadingState = ({ loading, theme }) => {
    return loading ? (
        <View
            style={{
                height,
            }}
        >
            <ShimmerPlaceholder
                style={{
                    borderRadius: 4,
                    margin: 12,
                    marginTop: 16,
                }}
                width={width - 24}
                height={(width - 24) / 1.7}
                shimmerWidthPercent={1.3}
                shimmerColors={theme.colors.shimmerColors}
            />

            <ShimmerPlaceholder
                style={{
                    borderRadius: 4,
                    margin: 12,
                    marginVertical: 8,
                }}
                width={width / 2}
                height={24}
                shimmerWidthPercent={1.3}
                shimmerColors={theme.colors.shimmerColors}
            />

            <View
                style={{
                    flexDirection: 'row',
                    padding: 8,
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

            <ShimmerPlaceholder
                style={{
                    borderRadius: 4,
                    margin: 12,
                    marginVertical: 8,
                }}
                width={width / 2}
                height={24}
                shimmerWidthPercent={1.3}
                shimmerColors={theme.colors.shimmerColors}
            />

            <View
                style={{
                    flexDirection: 'row',
                    padding: 8,
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

export default withTheme(HomeLoadingState);
