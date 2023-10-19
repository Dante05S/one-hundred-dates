import React from 'react';
import Paragraph from 'components/Paragraph';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import FormLogin from 'components/Auth/Login/FormLogin';

export default function Login(): React.JSX.Element {
  return (
    <View>
      <Paragraph variant="h1">Bienvenido a 100 Dates!</Paragraph>
      <Paragraph style={{ fontSize: 13 }}>
        Diviértete con tu pareja 💙
      </Paragraph>
      <FormLogin />
      <View style={styles.register}>
        <Paragraph style={{ fontSize: 13 }}>
          ¿Aún no tienes una cuenta?{' '}
          <Link href="/register">
            <Paragraph style={{ color: '#AEE6F8', fontSize: 13 }}>
              Registrate
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
