import React from 'react';
import Paragraph from 'components/Paragraph';
import { StyleSheet, View } from 'react-native';
import FormRegister from 'components/Auth/Register/FormRegister';
import { Link } from 'expo-router';
import useTheme from 'hooks/useTheme';

export default function Register(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <View>
      <Paragraph variant="h5">Registrate Gratis!</Paragraph>
      <Paragraph>Conecta con tu pareja 💙</Paragraph>
      <FormRegister />
      <View style={styles.register}>
        <Paragraph>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login">
            <Paragraph style={{ color: theme.palette.primary.main }}>
              Inicia sesión
            </Paragraph>
          </Link>
        </Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 25
  }
});
