import { Image } from 'expo-image';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShareCode from 'views/app/CoupleCode/ShareCode';
import Wave from 'views/auth/Wave';

export default function CoupleCode(): React.JSX.Element {
  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={styles.containerWave}>
        <Wave />
      </View>
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 162 }}
          source="https://i.ibb.co/KDzJ15D/png-clipart-cinnamoroll-sanrio-cat-like-moominmamma-cinnamoroll-mammal-food-removebg-preview.png"
        />
        <ShareCode />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWave: {
    position: 'relative',
    height: 200,
    marginBottom: 25
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
