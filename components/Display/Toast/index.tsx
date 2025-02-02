import FadeIn from 'components/Animations/FadeIn';
import FadeOut from 'components/Animations/FadeOut';
import Paragraph from 'components/Paragraph';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({
  message,
  show,
  onClose
}: Props): React.JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setTimeout(() => {
        onClose();
      }, 2300);
    } else {
      setTimeout(() => {
        setMounted(false);
      }, 500);
    }
  }, [show]);

  return mounted ? (
    <View style={styles.root}>
      {show ? (
        <FadeIn config={{ duration: 500 }}>
          <View style={styles.container}>
            <Paragraph>{message}</Paragraph>
          </View>
        </FadeIn>
      ) : (
        <FadeOut config={{ duration: 500 }}>
          <View style={styles.container}>
            <Paragraph>{message}</Paragraph>
          </View>
        </FadeOut>
      )}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 20,
    zIndex: 1,
    pointerEvents: 'none'
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderRadius: 25,
    backgroundColor: '#caedfa'
  }
});
