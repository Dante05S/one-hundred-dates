/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Image } from 'expo-image';
import { makeStyles } from 'helpers/makeStyles';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { View } from 'react-native';
import { type Color } from 'types/color';
import { type Pin } from 'types/pin';
import * as Animatable from 'react-native-animatable';

interface Props {
  color: Color;
  pin: Pin;
  couple: number;
}

const widthFrame = 197;
const heightFrame = 257;
const border = 17;
const borderDown = 55;
const sizePin = 18;

const pendulum: Animatable.CustomAnimation = {
  from: {
    transform: [{ rotate: `5deg` }, { translateX: -15 }]
  },
  to: {
    transform: [{ rotate: `-5deg` }, { translateX: 15 }]
  }
};

export default function Frame({
  color,
  pin,
  couple
}: Props): React.JSX.Element {
  const { theme } = useTheme();
  const styles = useStyles({ color });

  return (
    <View
      style={{
        ...styles.containerFrame,
        alignItems: couple === 0 ? 'flex-start' : 'flex-end'
      }}
    >
      <Animatable.View
        duration={1500}
        easing="ease-in-out-quad"
        direction="alternate"
        iterationCount="infinite"
        animation={pendulum}
      >
        <View style={[styles.frame]}>
          <View
            style={{
              ...styles.drawingPin,
              backgroundColor: '#fff'
            }}
          />
          <View
            style={{
              borderStyle: 'solid',
              borderColor: theme.palette[color].main,
              backgroundColor: theme.palette[color].main
            }}
          >
            <Image
              style={styles.image}
              source={
                couple === 0
                  ? require('../../assets/images/Yo.jpg')
                  : require('../../assets/images/Ella.jpg')
              }
              contentFit="cover"
            />
          </View>
          <View
            style={{
              ...styles.containerPin,
              right: couple === 1 ? 8 : undefined,
              left: couple === 0 ? 8 : undefined
            }}
          >
            <Image
              style={styles.pin}
              source={
                pin === 'first'
                  ? require('../../assets/images/pin-1.webp')
                  : require('../../assets/images/pin-2.webp')
              }
              contentFit="cover"
            />
          </View>
        </View>
      </Animatable.View>
    </View>
  );
}

const useStyles = makeStyles((theme, props: Pick<Props, 'color'>) => ({
  containerFrame: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: '100%',
    display: 'flex'
  },
  frame: {
    width: widthFrame,
    height: heightFrame,
    borderStyle: 'solid',
    borderWidth: border,
    borderBottomWidth: borderDown,
    borderRadius: 10,
    borderColor: theme.palette[props.color].main,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6
  },
  containerPin: {
    position: 'absolute',
    bottom: -15
  },
  pin: {
    width: 55,
    height: 55
  },
  image: {
    width: widthFrame - border * 2,
    height: heightFrame - (border + borderDown),
    borderRadius: 10
  },
  drawingPin: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    width: sizePin,
    height: sizePin,
    borderRadius: 9999,
    position: 'absolute',
    zIndex: 1,
    top: -24,
    transform: `translateX(${(widthFrame - border * 2 - 15) / 2}px)`
  }
}));
