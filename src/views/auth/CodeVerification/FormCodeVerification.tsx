import Button from 'components/Buttons/Button';
import useAlertControl from 'hooks/userAlertControl';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CodeInputs, { type ICodeInputs } from './CodeInputs';
import TimerCode from './TimerCode';
import AuthService from 'services/AuthService';
import { responseIsOk } from 'helpers/request';
// import { type TokenUser } from 'models/User.interface';
import { router } from 'expo-router';

export default function FormCodeVerification(): React.JSX.Element {
  const { openAlert } = useAlertControl();
  const [codeInputs, setCodeInputs] = useState<ICodeInputs>({
    sms_token1: '',
    sms_token2: '',
    sms_token3: '',
    sms_token4: ''
  });
  const [loading, setLoading] = useState(false);

  const handleCodeInputs = (newCodeInputs: ICodeInputs): void => {
    setCodeInputs(newCodeInputs);
  };

  const redirectTo = (): void => {
    router.replace('/dates');
    setLoading(false);
  };

  const login = async (): Promise<void> => {
    setLoading(true);
    const data = {
      email: 'dante05s@hotmail.com',
      code_token: `${codeInputs.sms_token1}${codeInputs.sms_token2}${codeInputs.sms_token3}${codeInputs.sms_token4}`
    };

    // Login user
    const authService = new AuthService();
    const response = await authService.validateCode(data);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }

    // const responseData = response.data as TokenUser;

    // // Set cookie token session
    // const [success, errors] = await setToken(responseData.token);
    // if (!success) {
    //   openAlert('error', errors);
    //   setLoading(false);
    //   return;
    // }

    // await authService.deleteCookieEmail();

    // // Set global state app
    // setUser(responseData.user);
    console.log(response);
    redirectTo();
  };

  return (
    <View style={styles.container}>
      <CodeInputs codeInputs={codeInputs} onChange={handleCodeInputs} />
      <View style={styles.button}>
        <Button
          onPress={() => {
            void login();
          }}
          loading={loading}
        >
          Validar código
        </Button>
      </View>
      <TimerCode />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 24
  },
  button: {
    display: 'flex',
    width: '100%'
  }
});
