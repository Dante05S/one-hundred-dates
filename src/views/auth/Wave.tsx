import useTheme from 'hooks/useTheme';
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function Wave(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Svg
        style={styles.wave}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <Path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          fill={theme.palette.primary.main}
        ></Path>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 0,
    transform: 'rotateX(180deg)'
  },
  wave: {
    position: 'relative',
    width: Dimensions.get('window').width * 2 + 1.3,
    height: 200
  }
});
