import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Form from 'components/Form';
import TextField from 'components/Inputs/TextField';
import InputIcon from 'components/Inputs/InputIcon';
import { type User, type RegisterUser } from 'models/User.interface';
import { type ValidationField } from 'helpers/Validator';
import validationsPassword from 'utils/validationsPassword';
import ShowPassword from 'components/ShowPassword';
import Button from 'components/Buttons/Button';
import AuthService from 'services/AuthService';
import { responseIsOk } from 'helpers/request';
import useAlertControl from 'hooks/userAlertControl';
import { setValueStorage } from 'utils/storageMmkv';

const INIT_USER: RegisterUser = {
  name: '',
  email: '',
  password: ''
};

const validations: ValidationField = {
  name: [
    {
      validation: 'required',
      helperText: 'El nombre de usuario es obligatorio'
    }
  ],
  email: [
    {
      validation: 'required',
      helperText: 'El email es obligatorio'
    },
    {
      validation: 'email',
      helperText: 'El email es invalido'
    }
  ],
  password: validationsPassword
};

export default function FormRegister(): React.JSX.Element {
  const router = useRouter();
  const { openAlert } = useAlertControl();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const redirectTo = (): void => {
    router.replace('/code-verification');
    setLoading(false);
  };

  const register = async (user: RegisterUser): Promise<void> => {
    setLoading(true);
    const authService = new AuthService();
    const response = await authService.register(user);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    const responseData = response.data as User;
    setValueStorage('email', responseData.email, 60 * 5);
    setValueStorage('name', responseData.name, 60 * 5);
    redirectTo();
  };

  const onSubmit = (data: RegisterUser): void => {
    void register(data);
  };

  return (
    <Form onSubmit={onSubmit} initValues={INIT_USER} validations={validations}>
      {({ handleSubmit }) => (
        <>
          <View style={styles.form}>
            <TextField
              placeholder="Nombre de usuario"
              label="Nombre de usuario"
              name="name"
              required
              endIcon={
                <InputIcon position="end">
                  <FontAwesome5 name="user-alt" size={18} />
                </InputIcon>
              }
            />
            <TextField
              placeholder="Email"
              label="Email"
              name="email"
              type="email"
              required
              endIcon={
                <InputIcon position="end">
                  <MaterialIcons name="email" size={22} />
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
              Crear cuenta
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
