import React, { useMemo } from 'react';
import * as Animatable from 'react-native-animatable';

interface Config {
  initScale: number;
  finalScale: number;
  duration: number;
  delay: number;
}

interface Props {
  children: React.ReactNode;
  config?: Partial<Config>;
}

const initConfig: Config = {
  initScale: 0,
  finalScale: 1,
  duration: 400,
  delay: 0
};

export default function PopUp({ children, config }: Props): React.JSX.Element {
  const configAnimation = useMemo(() => {
    return {
      ...initConfig,
      ...config
    };
  }, [config]);

  const getAnimation = (): Animatable.CustomAnimation => {
    return {
      from: {
        transform: [{ scale: configAnimation.initScale }]
      },
      to: {
        transform: [{ scale: configAnimation.finalScale }]
      }
    };
  };

  return (
    <Animatable.View
      animation={getAnimation()}
      delay={configAnimation.delay}
      duration={configAnimation.duration}
      easing="ease"
    >
      {children}
    </Animatable.View>
  );
}
