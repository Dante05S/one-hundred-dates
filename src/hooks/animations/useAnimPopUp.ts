import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';

interface AnimatedStyles {
  transform: Array<{
    scale: number;
  }>;
}

export default function useAnimPopUp(
  initScale = 0,
  finishScale = 1,
  duration = 700,
  delay = 0
): AnimatedStyles {
  const scaleValue = useSharedValue(initScale);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }]
    };
  });

  const animationScale = (): void => {
    scaleValue.value = withDelay(
      delay,
      withTiming(finishScale, {
        duration,
        easing: Easing.ease
      })
    );
  };

  useEffect(() => {
    animationScale();
  }, []);

  return animatedStyles;
}
