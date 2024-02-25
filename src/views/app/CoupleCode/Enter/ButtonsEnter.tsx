import React, { useState } from 'react';
import useTheme from 'hooks/useTheme';
import { StyleSheet, View } from 'react-native';
import Button from 'components/Buttons/Button';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CoupleService from 'services/CoupleService';
import useCoupleCode from 'hooks/useCoupleCode';
import { responseIsOk } from 'helpers/request';
import useAlertControl from 'hooks/userAlertControl';

export default function ButtonsEnter(): React.JSX.Element {
  const { theme } = useTheme();
  const router = useRouter();
  const { openAlert } = useAlertControl();
  const [loading, setLoading] = useState<boolean>(false);
  const { inputCode } = useCoupleCode();

  const connect = async (): Promise<void> => {
    setLoading(true);
    const coupleService = new CoupleService();
    const response = await coupleService.create({ couple_code: inputCode });
    if (!responseIsOk(response.success, response.data)) {
      openAlert('error', response.errors);
      setLoading(false);
      return;
    }

    router.replace('/dates');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Button
          loading={loading}
          onPress={() => {
            void connect();
          }}
          startIcon={
            <FontAwesome5
              name="link"
              size={22}
              color={theme.palette.primary.contrastText}
            />
          }
        >
          Conectar
        </Button>
      </View>
      <View style={{ width: '100%' }}>
        <Button
          onPress={() => {
            router.push('/couple-code/share');
          }}
          startIcon={
            <Ionicons
              name="share-social-sharp"
              size={22}
              color={theme.palette.primary.contrastText}
            />
          }
        >
          Compartir codigo
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 13
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
