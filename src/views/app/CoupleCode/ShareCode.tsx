import React, { useState } from 'react';
import InputCode from './InputCode';
import ButtonsOptions from './ButtonsOptions';
import { View, StyleSheet } from 'react-native';
import Paragraph from 'components/Paragraph';
import useTheme from 'hooks/useTheme';

const title = {
  share_page:
    'Comparte este codigo con tu pareja y empieza a crear recuerdos juntos 💙',
  enter_page:
    'Ingresa el codigo de tu pareja y empieza a crear recuerdos juntos 💙'
};

export default function ShareCode(): React.JSX.Element {
  const { theme } = useTheme();
  const [isSharePage, setIsSharePage] = useState<boolean>(true);

  const handleIsSharePage = (value: boolean): void => {
    setIsSharePage(value);
  };

  return (
    <View style={styles.root}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Paragraph
          variant="h5"
          style={{
            color: theme.palette.primary.main,
            marginBottom: 5,
            fontSize: 28
          }}
        >
          Codigo de pareja
        </Paragraph>
        <Paragraph style={{ textAlign: 'center' }}>
          {isSharePage ? title.share_page : title.enter_page}
        </Paragraph>
      </View>
      <InputCode isSharePage={isSharePage} />
      <ButtonsOptions
        isSharePage={isSharePage}
        onIsSharePage={handleIsSharePage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    gap: 30,
    marginTop: 15,
    width: '100%'
  }
});
