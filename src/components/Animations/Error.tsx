import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
import { makeStyles } from 'helpers/makeStyles';
import PopUp from './PopUp';

export default function Error(): React.JSX.Element {
  const styles = useStyles();
  // const animatedStyles = useAnimPopUp(0, 1.1, 400);
  // const animatedStylesIcon = useAnimPopUp(0, 1, 450, 135);

  return (
    <View style={styles.containerError}>
      <View style={styles.containerAnimCircle}>
        <PopUp config={{ finalScale: 1.1 }}>
          <View style={styles.circle} />
        </PopUp>
      </View>
      <View style={styles.containerAnimIcon}>
        <PopUp config={{ duration: 700, delay: 135 }}>
          <View style={styles.containerIcon}>
            <AntDesign name="close" size={55} color="#d32f2f" />
          </View>
        </PopUp>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  containerError: {
    display: 'flex',
    alignItems: 'center'
  },
  containerAnimCircle: {
    position: 'absolute',
    zIndex: 0
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: theme.palette.error
  },
  containerAnimIcon: {
    zIndex: 10,
    position: 'relative'
  },
  containerIcon: {
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#fff'
  }
}));
