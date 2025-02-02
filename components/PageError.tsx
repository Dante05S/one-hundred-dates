/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Wave from '../views/auth/Wave';
import Paragraph from './Paragraph';
import Button from './Buttons/Button';
import { type ErrorBoundaryProps } from 'expo-router';
import Wizard, { type WizardProps } from './Display/Wizard';
import useModal from 'hooks/useModal';
import Error from './Animations/Error';
import ThemeProvider from 'context/ThemeContext/ThemeProvider';
import theme from 'theme';
import useTheme from 'hooks/useTheme';

type PropsModalErrors = Pick<WizardProps, 'isOpen' | 'onClose'> & {
  message: string;
  stack?: string;
};

function ModalErrors({
  isOpen,
  onClose,
  message,
  stack = ''
}: PropsModalErrors): React.JSX.Element {
  const { theme } = useTheme();
  return (
    <Wizard isOpen={isOpen} onClose={onClose}>
      <View style={styles.modalView}>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Error />
          <View style={{ marginTop: 8 }}>
            <Paragraph variant="h5" style={{ color: theme.palette.error }}>
              Que mal
            </Paragraph>
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <Paragraph
            variant="h5"
            style={{ color: theme.palette.error, fontSize: 18 }}
          >
            Error:
          </Paragraph>
          <View style={{ marginLeft: 8 }}>
            <Paragraph style={{ fontSize: 14 }}>{message}</Paragraph>
          </View>
          {stack.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Paragraph
                variant="h5"
                style={{ color: theme.palette.error, fontSize: 18 }}
              >
                Call Stack:
              </Paragraph>
              <View style={{ marginLeft: 8 }}>
                <Paragraph style={{ fontSize: 14 }}>{stack}</Paragraph>
              </View>
            </View>
          )}
        </View>
      </View>
    </Wizard>
  );
}

export default function PageError(
  props: ErrorBoundaryProps
): React.JSX.Element {
  const [isOpen, toggle] = useModal();

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.layout}>
        <View style={styles.containerWave}>
          <Wave />
        </View>
        <View style={styles.viewError}>
          <View style={{ width: 200, height: 170 }}>
            <Image
              width={200}
              height={200}
              source={require('../assets/images/Oops.png')}
            />
          </View>
          <Paragraph
            variant="h5"
            style={{ color: theme.palette?.primary?.main, fontSize: 40 }}
          >
            Sorry!
          </Paragraph>
          <Paragraph style={{ textAlign: 'center' }}>
            Algo salio mal {'):'}, estamos trabajando en ello y lo
            solucionaremos lo antes posible. 💙
          </Paragraph>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
            <View style={styles.containerButton}>
              <Button
                onPress={() => {
                  void props.retry();
                }}
              >
                Regresar
              </Button>
            </View>
            <View style={styles.containerButton}>
              <Button
                onPress={() => {
                  toggle();
                }}
              >
                Ver errores
              </Button>
            </View>
          </View>
        </View>
        <ModalErrors
          isOpen={isOpen}
          onClose={toggle}
          message={props.error.message}
          stack={props.error.stack}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#fff'
  },
  containerWave: {
    width: '100%',
    height: 200
  },
  viewError: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  containerButton: {
    marginTop: 10,
    width: 150
  },
  modalView: {
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
