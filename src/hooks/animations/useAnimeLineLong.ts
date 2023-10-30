import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const initWidth = 0;
const initRight = 46;
const initTop = 54;
const firstStep = 487.5;
const secondStep = 142.5;
const thirdStep = 120;

interface AnimatedStyles {
  width: number;
  top: number;
  right: number;
  transform: Array<{
    rotate: string;
  }>;
}

export default function useAnimLineLong(): AnimatedStyles {
  const widthValue = useSharedValue(0);
  const rightValue = useSharedValue(1);
  const topValue = useSharedValue(19);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: widthValue.value,
      top: topValue.value,
      right: rightValue.value,
      transform: [{ rotate: '-45deg' }]
    };
  });

  const animationWidth = (): void => {
    widthValue.value = withSequence(
      withTiming(initWidth, {
        duration: firstStep,
        easing: Easing.linear
      }),
      withTiming(55, {
        duration: secondStep,
        easing: Easing.ease
      }),
      withTiming(47, {
        duration: thirdStep,
        easing: Easing.ease
      })
    );
  };

  const animationRight = (): void => {
    rightValue.value = withSequence(
      withTiming(initRight, {
        duration: firstStep,
        easing: Easing.linear
      }),
      withTiming(0, {
        duration: secondStep,
        easing: Easing.ease
      }),
      withTiming(8, {
        duration: thirdStep,
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
      withTiming(35, {
        duration: secondStep,
        easing: Easing.ease
      }),
      withTiming(38, {
        duration: thirdStep,
        easing: Easing.ease
      })
    );
  };

  useEffect(() => {
    animationWidth();
    animationRight();
    animationTop();
  }, []);

  return animatedStyles;
}
