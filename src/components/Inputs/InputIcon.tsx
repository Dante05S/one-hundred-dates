import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface Props {
  children: React.ReactNode;
  position: keyof Pick<typeof styles, 'start' | 'end'>;
}

export default function InputIcon({
  children,
  position
}: Props): React.JSX.Element {
  return (
    <View style={[styles.container, styles[position]]}>
      <Text style={styles.icon}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  icon: {
    color: '#d1d5db'
  },
  start: {
    left: 0,
    paddingLeft: 20
  },
  end: {
    right: 0,
    paddingRight: 20
  }
});
