/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react';
import { SplashScreen, Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element | null {
  const [fontsLoaded] = useFonts({
    'poppins': Poppins_400Regular,
    'poppins-semibold': Poppins_600SemiBold,
    'dynamic-schematic': require('../../assets/fonts/dynamic-schematic.otf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}
