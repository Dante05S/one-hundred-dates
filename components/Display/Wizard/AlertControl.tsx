import React from 'react';
import { StyleSheet, View } from 'react-native';
import useModal from 'hooks/useModal';
import useAlert from 'hooks/useAlert';
import { type Severity } from 'types/severity.type';
import AlertControlContext from 'context/AlertControlContext';
import ModalAlert from './ModalAlert';
import Paragraph from 'components/Paragraph';
import { AntDesign } from '@expo/vector-icons';
import useTheme from 'hooks/useTheme';

interface Props {
  children: React.ReactNode;
}

export default function AlertControl({ children }: Props): React.JSX.Element {
  const { theme } = useTheme();
  const [isOpen, onClose] = useModal();
  const { messages, severity, alert } = useAlert();

  const openAlert = (severity: Severity, messages: string[]): void => {
    alert(severity, messages, onClose);
  };

  const handleErrorPusher = (channelName: string, message: string): void => {
    openAlert('error', [`Pusher error channel: ${channelName} ${message}`]);
  };

  return (
    <AlertControlContext.Provider
      value={{
        messages,
        severity,
        openAlert,
        handleErrorPusher
      }}
    >
      {children}
      <ModalAlert severity={severity} isOpen={isOpen} onClose={onClose}>
        <View style={styles.container}>
          {messages.map((msg, index) => (
            <View style={styles.containerMessage} key={index}>
              <View>
                {severity === 'error' && (
                  <AntDesign
                    name="closecircleo"
                    size={20}
                    color={theme.palette.error}
                  />
                )}
                {severity === 'success' && (
                  <AntDesign
                    name="checkcircleo"
                    size={20}
                    color={theme.palette.success}
                  />
                )}
              </View>
              <View style={styles.message}>
                <Paragraph style={{ fontSize: 13.5, lineHeight: 14 }}>
                  {msg}
                </Paragraph>
              </View>
            </View>
          ))}
        </View>
      </ModalAlert>
    </AlertControlContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 6,
    justifyContent: 'center',
    marginTop: 2
  },
  containerMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  message: {
    marginLeft: 6
  }
});
