import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Form from 'components/Form';
import TextField from 'components/Inputs/TextField';
import InputIcon from 'components/Inputs/InputIcon';
import { type LoginUser } from 'models/User.interface';
import { type ValidationField } from 'helpers/Validator';
import ShowPassword from 'components/ShowPassword';
import Button from 'components/Buttons/Button';
import useAlertControl from 'hooks/userAlertControl';
import AuthService from 'services/AuthService';
import { responseIsOk } from 'helpers/request';
import { router } from 'expo-router';

const INIT_USER: LoginUser = {
  email: '',
  password: ''
};

const validations: ValidationField = {
  email: [
    {
      validation: 'required',
      helperText: 'El nombre de usuario es obligatorio'
    }
  ],
  password: [
    {
      validation: 'required',
      helperText: 'La contraseña es obligatoria'
    }
  ]
};

export default function FormLogin(): React.JSX.Element {
  const { openAlert } = useAlertControl();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const redirectTo = (): void => {
    router.replace('/dates');
    setLoading(false);
  };

  const login = async (user: LoginUser): Promise<void> => {
    setLoading(true);
    const authService = new AuthService();
    const response = await authService.login(user);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    redirectTo();
  };

  const onSubmit = (data: LoginUser): void => {
    void login(data);
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initValues={INIT_USER}
        validations={validations}
      >
        {({ handleSubmit }) => (
          <>
            <View style={styles.form}>
              <TextField
                placeholder="Nombre de usuario"
                label="Nombre de usuario o Email"
                name="email"
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
                loading={loading}
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
    </>
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