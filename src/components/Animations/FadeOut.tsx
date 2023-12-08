import React, { useMemo } from 'react';
import * as Animatable from 'react-native-animatable';

interface Config {
  duration: number;
  delay: number;
}

interface Props {
  children: React.ReactNode;
  config?: Partial<Config>;
}

const initConfig: Config = {
  duration: 400,
  delay: 0
};

export default function FadeOut({
  children,
  config
}: Props): React.JSX.Element {
  const configAnimation = useMemo(() => {
    return {
      ...initConfig,
      ...config
    };
  }, [config]);

  return (
    <Animatable.View
      animation="fadeOut"
      delay={configAnimation.delay}
      duration={configAnimation.duration}
      easing="ease"
    >
      {children}
    </Animatable.View>
  );
}
