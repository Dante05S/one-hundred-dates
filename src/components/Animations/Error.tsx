import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import useAnimPopUp from 'hooks/animations/useAnimPopUp';
import { makeStyles } from 'helpers/makeStyles';

export default function Error(): React.JSX.Element {
  const styles = useStyles();
  const animatedStyles = useAnimPopUp(0, 1.1, 400);
  const animatedStylesIcon = useAnimPopUp(0, 1, 450, 135);

  return (
    <View style={styles.containerError}>
      <Animated.View style={[styles.circle, animatedStyles]} />
      <Animated.View style={[styles.containerIcon, animatedStylesIcon]}>
        <AntDesign name="close" size={55} color="#d32f2f" />
      </Animated.View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  containerError: {
    display: 'flex',
    alignItems: 'center'
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 999,
    zIndex: 0,
    position: 'absolute',
    backgroundColor: theme.palette.error
  },
  containerIcon: {
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    zIndex: 10,
    position: 'relative',
    backgroundColor: '#fff'
  }
}));
