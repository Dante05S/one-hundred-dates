import React from 'react';
import Paragraph from 'components/Paragraph';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import FormLogin from 'views/auth/Login/FormLogin';
import useTheme from 'hooks/useTheme';
import ProtectedRoute from 'components/ProtectedRoute';

export default function Login(): React.JSX.Element {
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
        <Paragraph variant="h5">Bienvenido a 100 Dates!</Paragraph>
        <Paragraph>Diviértete con tu pareja 💙</Paragraph>
        <FormLogin />
        <View style={styles.register}>
          <Paragraph style={{ textAlign: 'center' }}>
            ¿Aún no tienes una cuenta?{' '}
            <Link href="/register">
              <Paragraph style={{ color: theme.palette.primary.main }}>
                Registrate
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
