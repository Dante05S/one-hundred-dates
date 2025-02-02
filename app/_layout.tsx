/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'expo-dev-client';
import { useEffect } from 'react';
import { SplashScreen, Slot, type ErrorBoundaryProps } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import AlertControl from 'components/Display/Wizard/AlertControl';
import PageError from 'components/PageError';
import ThemeProvider from 'context/ThemeContext/ThemeProvider';
import theme from 'theme';
import { ScrollView, StyleSheet } from 'react-native';
import Paragraph from 'components/Paragraph';
import ToastControl from 'components/Display/Toast/ToastControl';
import AppProvider from 'context/AppContext/AppProvider';

SplashScreen.preventAutoHideAsync();

export function ErrorBoundary(props: ErrorBoundaryProps): React.JSX.Element {
  return <PageError {...props} />;
}

export default function RootLayout(): React.JSX.Element | null {
  const [fontsLoaded] = useFonts({
    'poppins': Poppins_400Regular,
    'poppins-medium': Poppins_500Medium,
    'poppins-semibold': Poppins_600SemiBold,
    'dynamic-schematic': require('../assets/fonts/dynamic-schematic.otf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Paragraph>Hola</Paragraph>;
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastControl>
        <AlertControl>
          <AppProvider>
            <ScrollView contentContainerStyle={styles.rootContainer}>
              <Slot />
            </ScrollView>
          </AppProvider>
        </AlertControl>
      </ToastControl>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: theme.palette?.background,
    display: 'flex',
    minHeight: '100%'
  }
});
