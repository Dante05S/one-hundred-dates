import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const initWidth = 0;
const initLeft = 1;
const initTop = 19;
const firstStep = 405;
const secondStep = 120;
const thirdStep = 110;
const fourthStep = 115;

interface AnimatedStyles {
  width: number;
  top: number;
  left: number;
  transform: Array<{
    rotate: string;
  }>;
}

export default function useAnimLineTip(): AnimatedStyles {
  const widthValue = useSharedValue(initWidth);
  const leftValue = useSharedValue(initLeft);
  const topValue = useSharedValue(initTop);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: widthValue.value,
      top: topValue.value,
      left: leftValue.value,
      transform: [{ rotate: '45deg' }]
    };
  });

  const animationWidth = (): void => {
    widthValue.value = withSequence(
      withTiming(initWidth, {
        duration: firstStep,
        easing: Easing.linear
      }),
      withTiming(50, {
        duration: secondStep,
        easing: Easing.ease
      }),
      withTiming(17, {
        duration: thirdStep,
        easing: Easing.ease
      }),
      withTiming(25, {
        duration: fourthStep,
        easing: Easing.ease
      })
    );
  };

  const animationLeft = (): void => {
    leftValue.value = withSequence(
      withTiming(initLeft, {
        duration: firstStep,
        easing: Easing.linear
      }),
      withTiming(-8, {
        duration: secondStep,
        easing: Easing.ease
      }),
      withTiming(21, {
        duration: thirdStep,
        easing: Easing.ease
      }),
      withTiming(14, {
        duration: fourthStep,
        easing: Easing.ease
      })
    );
  };

  const animationTop = (): void => {
    topValue.value = withSequence(
      withTiming(initTop, {
        duration: firstStep,
        easing: Easing.linear
      }),
      withTiming(37, {
        duration: secondStep,
        easing: Easing.ease
      }),
      withTiming(48, {
        duration: thirdStep,
        easing: Easing.ease
      }),
      withTiming(46, {
        duration: fourthStep,
        easing: Easing.ease
      })
    );
  };

  useEffect(() => {
    animationWidth();
    animationLeft();
    animationTop();
  }, []);

  return animatedStyles;
}
