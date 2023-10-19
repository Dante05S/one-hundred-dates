import React from 'react';
import Paragraph from 'components/Paragraph';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import FormRegister from 'components/Auth/Register/FormRegister';

export default function Register(): React.JSX.Element {
  return (
    <View>
      <Paragraph variant="h1">Registrate Gratis!</Paragraph>
      <Paragraph style={{ fontSize: 13 }}>Conecta con tu pareja 💙</Paragraph>
      <FormRegister />
      <View style={styles.register}>
        <Paragraph style={{ fontSize: 13 }}>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login">
            <Paragraph style={{ color: '#AEE6F8', fontSize: 13 }}>
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
