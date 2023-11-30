import React from 'react';
import Paragraph from 'components/Paragraph';
import { StyleSheet, View } from 'react-native';
import FormRegister from 'views/auth/Register/FormRegister';
import { Link } from 'expo-router';
import useTheme from 'hooks/useTheme';
import ProtectedRoute from 'components/ProtectedRoute';

export default function Register(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <ProtectedRoute
      redirect="/code-verification"
      validate={{
        type: 'storage',
        keyStorage: 'email',
        redirectWhenExist: true
      }}
    >
      <View>
        <Paragraph variant="h5">Registrate Gratis!</Paragraph>
        <Paragraph>Conecta con tu pareja 💙</Paragraph>
        <FormRegister />
        <View style={styles.register}>
          <Paragraph style={{ textAlign: 'center' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login">
              <Paragraph style={{ color: theme.palette.primary.main }}>
                Inicia sesión
              </Paragraph>
            </Link>
          </Paragraph>
        </View>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  register: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 25
  }
});
