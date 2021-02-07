import React from 'react';
import { View, Dimensions } from 'react-native';
import { withTheme } from 'react-native-paper';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const { width, height } = Dimensions.get('window');
const itemWidth = (width - 16) / 2.5;
const itemHeight = itemWidth * 1.5;

const DetailsLoadingState = ({ loading, theme }) => {
    return loading ? (
        <View
            style={{
                height,
            }}
        >
            <ShimmerPlaceholder
                style={{
                    borderRadius: 8,
                    margin: 16,
                }}
                width={width - 32}
                height={width - 32}
                shimmerWidthPercent={1.3}
                shimmerColors={theme.colors.shimmerColors}
            />

            <ShimmerPlaceholder
                style={{
                    borderRadius: 4,
                    margin: 20,
                    marginVertical: 8,
                }}
                width={width / 1.5}
                height={32}
                shimmerWidthPercent={1.3}
                shimmerColors={theme.colors.shimmerColors}
            />

            <ShimmerPlaceholder
                style={{
                    borderRadius: 4,
                    margin: 20,
                    marginVertical: 8,
                    marginTop: 16,
                }}
                width={width - 40}
                height={36}
                shimmerWidthPercent={1.3}
                shimmerColors={theme.colors.shimmerColors}
            />

            <ShimmerPlaceholder
                style={{
                    borderRadius: 4,
                    margin: 16,
                    marginVertical: 8,
                    marginTop: 16,
                }}
                width={width - 40}
                height={88}
                shimmerWidthPercent={1.3}
                shimmerColors={theme.colors.shimmerColors}
            />

            <View
                style={{
                    marginTop: 0,
                    margin: 20,
                }}
            >
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        marginVertical: 12,
                    }}
                    width={width / 1.5}
                    height={20}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,
                        marginVertical: 8,
                        marginTop: 4,
                    }}
                    width={width - 56}
                    height={14}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,

                        marginVertical: 8,
                        marginTop: 4,
                    }}
                    width={width - 40}
                    height={14}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,

                        marginVertical: 8,
                        marginTop: 4,
                    }}
                    width={width - 72}
                    height={14}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
                <ShimmerPlaceholder
                    style={{
                        borderRadius: 4,

                        marginVertical: 8,
                        marginTop: 4,
                    }}
                    width={width - 48}
                    height={14}
                    shimmerWidthPercent={1.3}
                    shimmerColors={theme.colors.shimmerColors}
                />
            </View>
        </View>
    ) : null;
};

export default withTheme(DetailsLoadingState);
