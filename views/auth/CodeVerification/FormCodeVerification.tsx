import Button from 'components/Buttons/Button';
import useAlertControl from 'hooks/userAlertControl';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CodeInputs, { type ICodeInputs } from './CodeInputs';
import TimerCode from './TimerCode';
import AuthService from 'services/AuthService';
import { responseIsOk } from 'helpers/request';
import { useRouter } from 'expo-router';
import useStorageValue from 'hooks/useStorageValue';
import { storage } from 'utils/storageMmkv';
import { save, saveRefresh } from 'utils/secureStorage';
import { type TokenUser } from 'models/User.interface';
import useApp from 'hooks/useApp';

export default function FormCodeVerification(): React.JSX.Element {
  const router = useRouter();
  const { onChangeUser } = useApp();
  const email = useStorageValue('email');
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
    router.replace('/couple-code/share');
    setLoading(false);
  };

  const login = async (): Promise<void> => {
    setLoading(true);
    const data = {
      email: email ?? '',
      codeToken: `${codeInputs.sms_token1}${codeInputs.sms_token2}${codeInputs.sms_token3}${codeInputs.sms_token4}`
    };

    // Login user
    const authService = new AuthService();
    const response = await authService.validateCode(data);
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    const responseData = response.data as TokenUser;

    // Set token session
    await Promise.all([
      save(responseData.token),
      saveRefresh(responseData.refresh_token)
    ]);
    storage.delete('email');
    storage.delete('name');

    // Set global state app
    onChangeUser(responseData.user);
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
