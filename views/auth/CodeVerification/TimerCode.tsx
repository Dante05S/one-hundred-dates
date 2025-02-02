import React, { useState } from 'react';

// Hooks
import useTimer from 'hooks/useTimer';
// import AuthService from 'services/AuthService';
// import usePage from 'hooks/usePage';
// import { type CodeVerificationProps } from 'interfaces/pages/code_verification_props.interface';
// import { responseIsOk } from 'helpers/request';
import useAlertControl from 'hooks/userAlertControl';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import useTheme from 'hooks/useTheme';
import Paragraph from 'components/Paragraph';
import Button from 'components/Buttons/Button';
import AuthService from 'services/AuthService';
import { responseIsOk } from 'helpers/request';
import PopUp from 'components/Animations/PopUp';
import useStorageValue from 'hooks/useStorageValue';

interface ResendCodeProps {
  resendCode: () => Promise<void>;
}

function ResendCode({ resendCode }: ResendCodeProps): React.JSX.Element {
  return (
    <>
      <PopUp config={{ duration: 500 }}>
        <Button
          onPress={() => {
            void resendCode();
          }}
          variant="text"
          paragraphProps={{ style: { fontSize: 16 } }}
        >
          Reenviar código
        </Button>
      </PopUp>
    </>
  );
}

export default function TimerCode(): React.JSX.Element {
  const { timer, startTimer } = useTimer(60);
  const { theme } = useTheme();
  const { openAlert } = useAlertControl();
  const email = useStorageValue('email');

  const [loading, setLoading] = useState<boolean>(false);

  const resendCode = async (): Promise<void> => {
    setLoading(true);
    const authService = new AuthService();
    const response = await authService.resendCode(email ?? '');
    if (!responseIsOk(response.success, response.data, true)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }
    openAlert('success', [
      'Codigo de verificación reenviado, revisa tu correo electronico'
    ]);
    setLoading(false);
    startTimer();
  };

  return (
    <View style={styles.container}>
      <Paragraph>¿No recibiste tu código?</Paragraph>
      {timer !== '00:00' && timer !== '00' ? (
        <Paragraph
          variant="h5"
          style={{ color: theme.palette.primary.main, fontSize: 16 }}
        >
          Enviar otro código en {timer}
        </Paragraph>
      ) : (
        <>
          {!loading ? (
            <ResendCode resendCode={resendCode} />
          ) : (
            <ActivityIndicator color={theme.palette.primary.main} size={25} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 4,
    alignItems: 'center'
  }
});
