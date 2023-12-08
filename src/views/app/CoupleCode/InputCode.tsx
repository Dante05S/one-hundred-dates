import React, { useState } from 'react';
import Paragraph from 'components/Paragraph';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconButton from 'components/Buttons/IconButton';
import useTheme from 'hooks/useTheme';
import TextField from 'components/Inputs/TextField';
import InputIcon from 'components/Inputs/InputIcon';
import Loading from 'components/Loading';
import * as Clipboard from 'expo-clipboard';
import useToastControl from 'hooks/useToastControl';
import useShareCode from 'hooks/useShareCode';

interface Props {
  isSharePage: boolean;
}

function CopyCode(): React.JSX.Element {
  const { theme } = useTheme();
  const { alertToast } = useToastControl();
  const { coupleCode, loading } = useShareCode();
  const [loadingCopy, setLoadingCopy] = useState<boolean>(false);

  const copyCoupleCode = async (): Promise<void> => {
    setLoadingCopy(true);
    await Clipboard.setStringAsync(coupleCode);
    setLoadingCopy(false);
    alertToast('Codigo copiado correctamente!');
  };

  return (
    <Loading loading={loading} size={40}>
      <View style={styles.container}>
        <Paragraph
          variant="h6"
          style={{ letterSpacing: 2, fontSize: 22, lineHeight: 28 }}
        >
          {coupleCode}
        </Paragraph>
        <View style={{ width: 30 }}>
          <Loading loading={loadingCopy} size={23}>
            <IconButton
              onPress={() => {
                void copyCoupleCode();
              }}
            >
              <Ionicons
                name="copy"
                size={23}
                color={theme.palette.primary.main}
              />
            </IconButton>
          </Loading>
        </View>
      </View>
    </Loading>
  );
}

function EnterCode(): React.JSX.Element {
  return (
    <TextField
      placeholder="Ingresar codigo de pareja"
      name="email"
      required
      endIcon={
        <InputIcon position="end">
          <Ionicons name="code-slash" size={22} />
        </InputIcon>
      }
    />
  );
}

export default function InputCode({ isSharePage }: Props): React.JSX.Element {
  return <>{isSharePage ? <CopyCode /> : <EnterCode />}</>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  }
});
