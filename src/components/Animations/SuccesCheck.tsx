import { makeStyles } from 'helpers/makeStyles';
import useAnimLineTip from 'hooks/animations/useAnimLineTip';
import useAnimPopUp from 'hooks/animations/useAnimPopUp';
import useAnimLineLong from 'hooks/animations/useAnimeLineLong';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function SuccesCheck(): React.JSX.Element {
  const styles = useStyles();
  const animatedStylesTip = useAnimLineTip();
  const animatedStylesLong = useAnimLineLong();
  const animatedStylesPopup = useAnimPopUp(0, 1, 500);

  return (
    <View style={styles.containerSuccesCheck}>
      <Animated.View style={[styles.containerAnimation, animatedStylesPopup]}>
        <View style={styles.container}>
          <View style={styles.containerCheck}>
            <Animated.View style={[styles.lineTip, animatedStylesTip]} />
            <Animated.View style={[styles.lineLong, animatedStylesLong]} />
          </View>
        </View>
      </Animated.View>
    </View>
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
    zIndex: 10
  },
  lineLong: {
    backgroundColor: '#fff',
    height: 6,
    borderRadius: 6,
    position: 'absolute',
    zIndex: 10
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
