import Footer from 'views/auth/Footer';
import Wave from 'views/auth/Wave';
import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AuthLayout(): React.JSX.Element {
  return (
    <>
      <View style={styles.containerWave}>
        <Wave />
      </View>
      <View style={styles.containerView}>
        <Slot />
      </View>
      <View style={styles.containerFooter}>
        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerWave: {
    position: 'relative',
    height: 200,
    marginBottom: 25
  },
  containerView: {
    paddingHorizontal: 20,
    flexGrow: 1
  },
  containerFooter: {
    marginTop: 20,
    width: '100%'
  }
});
