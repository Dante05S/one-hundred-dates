import { makeStyles } from 'helpers/makeStyles';
import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PopUp from './PopUp';

const lineLong: Animatable.CustomAnimation = {
  0: {
    width: 0,
    right: 46,
    top: 54
  },
  0.65: {
    width: 0,
    right: 46,
    top: 54
  },
  0.84: {
    width: 55,
    right: 0,
    top: 35
  },
  1: {
    width: 47,
    right: 8,
    top: 38
  }
};

const lineTip: Animatable.CustomAnimation = {
  0: {
    width: 0,
    left: 1,
    top: 19
  },
  0.54: {
    width: 0,
    left: 1,
    top: 19
  },
  0.7: {
    width: 50,
    left: -8,
    top: 37
  },
  0.84: {
    width: 17,
    left: 21,
    top: 48
  },
  1: {
    width: 25,
    left: 14,
    top: 45
  }
};

export default function SuccesCheck(): React.JSX.Element {
  const styles = useStyles();

  return (
    <PopUp config={{ duration: 500 }}>
      <View style={styles.containerSuccesCheck}>
        <Animatable.View style={styles.containerAnimation}>
          <View style={styles.container}>
            <View style={styles.containerCheck}>
              <Animatable.View animation={lineTip} style={styles.lineTip} />
              <Animatable.View animation={lineLong} style={styles.lineLong} />
            </View>
          </View>
        </Animatable.View>
      </View>
    </PopUp>
  );
}

const useStyles = makeStyles((theme) => ({
  containerSuccesCheck: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerAnimation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.success,
    borderRadius: 999,
    padding: 8
  },
  lineTip: {
    backgroundColor: '#fff',
    height: 5,
    borderRadius: 6,
    position: 'absolute',
    zIndex: 10,
    transform: [{ rotate: '45deg' }]
  },
  lineLong: {
    backgroundColor: '#fff',
    height: 6,
    borderRadius: 6,
    position: 'absolute',
    zIndex: 10,
    transform: [{ rotate: '-45deg' }]
  },
  container: {
    marginHorizontal: 0,
    marginVertical: 'auto',
    width: 80,
    height: 80
  },
  containerCheck: {
    position: 'relative',
    width: 80,
    height: 80
  }
}));
