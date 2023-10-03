/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Image, type ImageStyle } from 'expo-image';
import React, { useEffect } from 'react';
import {
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { type Color } from 'types/color';
import { type Pin } from 'types/pin';

interface Props {
  color: Color;
  pin: Pin;
  couple: number;
}

const initialValue = 5;
const widthFrame = 197;
const heightFrame = 257;
const border = 17;
const borderDown = 55;
const sizePin = 18;

export default function Frame({
  color,
  pin,
  couple
}: Props): React.JSX.Element {
  const rotateValue = useSharedValue(initialValue);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -(heightFrame + border + borderDown) / 2 },
        { rotate: `${rotateValue.value}deg` },
        { translateY: (heightFrame + border + borderDown) / 2 }
      ]
    };
  });

  useEffect(() => {
    rotateValue.value = withRepeat(
      withSequence(
        withTiming(initialValue, {
          duration: 1500,
          easing: Easing.inOut(Easing.quad)
        }),
        withTiming(-5, {
          duration: 1500,
          easing: Easing.inOut(Easing.quad)
        })
      ),
      -1,
      true
    );
  }, []);

  return (
    <View
      style={{
        ...styles.containerFrame,
        alignItems: couple === 0 ? 'flex-start' : 'flex-end'
      }}
    >
      <Animated.View style={[colorFrame(color), animatedStyles]}>
        <View
          style={{
            ...styles.drawingPin,
            backgroundColor: '#fff'
          }}
        />
        <View
          style={{
            borderStyle: 'solid',
            borderColor: color === 'primary' ? '#AEE6F8' : '#FACFE4',
            backgroundColor: color === 'primary' ? '#AEE6F8' : '#FACFE4'
          }}
        >
          <Image
            style={styles.image}
            source={
              couple === 0
                ? require('../../../assets/images/Yo.jpg')
                : require('../../../assets/images/Ella.jpg')
            }
            contentFit="cover"
          />
        </View>
        <View
          style={{
            ...styles.containerPin,
            right: couple === 1 ? 8 : undefined,
            left: couple === 0 ? 8 : undefined
          }}
        >
          <Image
            style={styles.pin}
            source={
              pin === 'first'
                ? require('../../../assets/images/pin-1.webp')
                : require('../../../assets/images/pin-2.webp')
            }
            contentFit="cover"
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFrame: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: '100%',
    display: 'flex'
  },
  frame: {
    width: widthFrame,
    height: heightFrame,
    borderStyle: 'solid',
    borderWidth: border,
    borderBottomWidth: borderDown,
    borderRadius: 10,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6
  },
  containerPin: {
    position: 'absolute',
    bottom: -15
  },
  pin: {
    width: 55,
    height: 55
  },
  image: {
    width: widthFrame - border * 2,
    height: heightFrame - (border + borderDown),
    borderRadius: 10
  },
  drawingPin: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    width: sizePin,
    height: sizePin,
    borderRadius: 9999,
    position: 'absolute',
    zIndex: 1,
    top: -24,
    transform: `translateX(${(widthFrame - border * 2 - 15) / 2}px)`
  },
  primary: {
    borderColor: '#AEE6F8'
  },
  secondary: {
    borderColor: '#FACFE4'
  }
});

const colorFrame = (
  color: keyof typeof styles
): StyleProp<ViewStyle | TextStyle | ImageStyle> => {
  return StyleSheet.compose(styles.frame, styles[color]);
};
