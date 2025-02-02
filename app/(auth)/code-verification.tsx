import Paragraph from 'components/Paragraph';
import ProtectedRoute from 'components/ProtectedRoute';
import { Image } from 'expo-image';
import useStorageValue from 'hooks/useStorageValue';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FormCodeVerification from 'views/auth/CodeVerification/FormCodeVerification';

export default function CodeVerification(): React.JSX.Element {
  const { theme } = useTheme();
  const email = useStorageValue('email');
  const name = useStorageValue('name');

  return (
    <ProtectedRoute
      redirect="/register"
      validate={{ type: 'storage', keyStorage: 'email' }}
    >
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Paragraph variant="h5" style={styles.centerText}>
            Verifica tu correo electronico💙
          </Paragraph>
          <Paragraph style={styles.centerText}>
            Verifica el codigo que se te envio a tu correo electronico para
            completar el inicio de sesión
          </Paragraph>
        </View>
        <Image
          style={{ width: 180, height: 180 }}
          source="https://i.ibb.co/k1N8XGW/pin-2.png"
        />
        <View style={styles.containerMessage}>
          <Paragraph style={styles.centerText}>
            Hola{' '}
            <Paragraph
              style={{
                color: theme.palette.primary.main
              }}
            >
              {name}
            </Paragraph>
            , se ha enviado un mensaje al correo electronico{' '}
            <Paragraph
              style={{
                color: theme.palette.primary.main
              }}
            >
              {email}
            </Paragraph>{' '}
            con un código para verificar tu cuenta.
          </Paragraph>
          <FormCodeVerification />
        </View>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  },
  containerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    marginBottom: 12
  },
  containerMessage: {
    width: '100%',
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    marginTop: 12
  },
  centerText: {
    textAlign: 'center'
  }
});
