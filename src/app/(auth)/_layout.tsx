import Footer from 'views/auth/Footer';
import Wave from 'views/auth/Wave';
import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProtectedRoute from 'components/ProtectedRoute';

export default function AuthLayout(): React.JSX.Element {
  return (
    <ProtectedRoute
      redirect="/dates"
      validate={{ type: 'session', validateOpen: false }}
    >
      <View style={styles.containerWave}>
        <Wave />
      </View>
      <View style={styles.containerView}>
        <Slot />
      </View>
      <View style={styles.containerFooter}>
        <Footer />
      </View>
    </ProtectedRoute>
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
