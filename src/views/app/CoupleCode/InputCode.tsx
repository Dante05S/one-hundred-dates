import React from 'react';
import Paragraph from 'components/Paragraph';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconButton from 'components/Buttons/IconButton';
import useTheme from 'hooks/useTheme';
import TextField from 'components/Inputs/TextField';
import InputIcon from 'components/Inputs/InputIcon';

interface Props {
  isSharePage: boolean;
}

function CopyCode(): React.JSX.Element {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Paragraph
        variant="h6"
        style={{ letterSpacing: 2, fontSize: 22, lineHeight: 27 }}
      >
        361H26351HDGAV
      </Paragraph>
      <IconButton>
        <Ionicons name="copy" size={23} color={theme.palette.primary.main} />
      </IconButton>
    </View>
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
