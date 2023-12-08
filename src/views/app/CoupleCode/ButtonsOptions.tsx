import Button from 'components/Buttons/Button';
import React, { useState } from 'react';
import { View, StyleSheet, Share } from 'react-native';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import useTheme from 'hooks/useTheme';
import useShareCode from 'hooks/useShareCode';
import useAlertControl from 'hooks/userAlertControl';

interface ButtonsOptionsProps {
  onIsSharePage: (value: boolean) => void;
}

interface Props extends ButtonsOptionsProps {
  isSharePage: boolean;
}

function ButtonsShare({
  onIsSharePage
}: ButtonsOptionsProps): React.JSX.Element {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const { openAlert } = useAlertControl();
  const { coupleCode } = useShareCode();

  const onShare = async (): Promise<void> => {
    try {
      setLoading(true);
      const link = `https://one-hundred-dates.netlify.app/?code=${coupleCode}`;
      await Share.share({
        message: `Ingresa a ${link} para empezar a crear recuerdos junto a tu pareja 💙. One Hundred Dates`
      });
    } catch (error) {
      openAlert('error', [(error as Error).message]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Button
          loading={loading}
          onPress={() => {
            void onShare();
          }}
          startIcon={
            <Ionicons
              name="share-social-sharp"
              size={22}
              color={theme.palette.primary.contrastText}
            />
          }
        >
          Compartir
        </Button>
      </View>
      <View style={{ width: '100%' }}>
        <Button
          onPress={() => {
            onIsSharePage(false);
          }}
          startIcon={
            <AntDesign
              name="form"
              size={22}
              color={theme.palette.primary.contrastText}
            />
          }
        >
          Ingresar codigo
        </Button>
      </View>
    </View>
  );
}

function ButtonsEnter({
  onIsSharePage
}: ButtonsOptionsProps): React.JSX.Element {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Button
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
            onIsSharePage(true);
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

export default function ButtonsOptions({
  isSharePage,
  onIsSharePage
}: Props): React.JSX.Element {
  return (
    <>
      {isSharePage ? (
        <ButtonsShare onIsSharePage={onIsSharePage} />
      ) : (
        <ButtonsEnter onIsSharePage={onIsSharePage} />
      )}
    </>
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
