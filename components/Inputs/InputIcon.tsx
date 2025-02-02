import { makeStyles } from 'helpers/makeStyles';
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  children: React.ReactNode;
  position: 'start' | 'end';
}

export default function InputIcon({
  children,
  position
}: Props): React.JSX.Element {
  const styles = useStyles();
  return (
    <View style={[styles.container, styles[position]]}>
      <Text style={styles.icon}>{children}</Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  icon: {
    color: theme.palette.text.placeholder
  },
  start: {
    left: 0,
    paddingLeft: 20
  },
  end: {
    right: 0,
    paddingRight: 20
  }
}));
