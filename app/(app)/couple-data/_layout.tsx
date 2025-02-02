import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Wave from 'views/auth/Wave';
import { Slot } from 'expo-router';
import Paragraph from 'components/Paragraph';
import useTheme from 'hooks/useTheme';
import ProtectedRoute from 'components/ProtectedRoute';
import useApp from 'hooks/useApp';

export default function CoupleCode(): React.JSX.Element {
  const { theme } = useTheme();
  const { user } = useApp();

  const validateUser = (): boolean => {
    return user?.couple !== null && user?.couple.init_date === null;
  };

  return (
    <ProtectedRoute
      redirect="/couple-code/share"
      validate={{ type: 'custom', validate: validateUser }}
    >
      <View style={{ paddingBottom: 20 }}>
        <View style={styles.containerWave}>
          <Wave />
        </View>
        <View style={styles.container}>
          <Image
            style={{ width: 250, height: 162 }}
            source="https://i.ibb.co/KDzJ15D/png-clipart-cinnamoroll-sanrio-cat-like-moominmamma-cinnamoroll-mammal-food-removebg-preview.png"
          />
          <View style={styles.containerSlot}>
            <Paragraph
              variant="h5"
              style={{
                color: theme.palette.primary.main,
                marginBottom: 5,
                fontSize: 28
              }}
            >
              Datos de pareja
            </Paragraph>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 30,
                width: '100%'
              }}
            >
              <Slot />
            </View>
          </View>
        </View>
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
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  containerSlot: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
    width: '100%'
  }
});
