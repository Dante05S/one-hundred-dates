/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

export default function LoadingPage({
  loading,
  children
}: Props): React.JSX.Element {
  return (
    <>
      {loading ? (
        <View style={styles.root}>
          <Image
            style={{ width: 180, height: 180 }}
            source={require('../assets/gifts/loading.gif')}
          />
        </View>
      ) : (
        children
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  }
});
