import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Form from 'components/Form';
import TextField from 'components/Inputs/TextField';
import InputIcon from 'components/Inputs/InputIcon';
import { type LoginUser } from 'models/User.interface';
import { type ValidationField } from 'helpers/Validator';
import validationsPassword from 'utils/validationsPassword';
import ShowPassword from 'components/ShowPassword';
import Button from 'components/Buttons/Button';

const INIT_USER: LoginUser = {
  name: '',
  password: ''
};

const validations: ValidationField = {
  name: [
    {
      validation: 'required',
      helperText: 'El nombre de usuario es obligatorio'
    }
  ],
  password: validationsPassword
};

export default function FormLogin(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: LoginUser): void => {
    console.log(data);
  };
  return (
    <Form onSubmit={onSubmit} initValues={INIT_USER} validations={validations}>
      {({ handleSubmit }) => (
        <>
          <View style={styles.form}>
            <TextField
              placeholder="Nombre de usuario"
              label="Nombre de usuario o Email"
              name="name"
              required
              endIcon={
                <InputIcon position="end">
                  <FontAwesome5 name="user-alt" size={18} />
                </InputIcon>
              }
            />
            <TextField
              placeholder="Contraseña"
              label="Contraseña"
              name="password"
              required
              secureTextEntry={!showPassword}
              endIcon={
                <InputIcon position="end">
                  <ShowPassword
                    show={showPassword}
                    onPress={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  />
                </InputIcon>
              }
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => {
                handleSubmit();
              }}
            >
              Iniciar sesión
            </Button>
          </View>
        </>
      )}
    </Form>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 25,
    display: 'flex',
    gap: 20
  },
  button: {
    marginTop: 36,
    display: 'flex'
  }
});
