import React from 'react';
import { View, StyleSheet } from 'react-native';
import SuccesCheck from 'components/Animations/SuccesCheck';
import Error from 'components/Animations/Error';
import Wizard from '.';
import Paragraph from 'components/Paragraph';
import useTheme from 'hooks/useTheme';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  severity?: 'success' | 'error';
}

export default function ModalAlert({
  children,
  isOpen,
  onClose,
  severity = 'success'
}: Props): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <Wizard isOpen={isOpen} onClose={onClose}>
      <View style={styles.alertView}>
        <View style={styles.containerSeverity}>
          {severity === 'success' && <SuccesCheck />}
          {severity === 'error' && <Error />}
          <View style={{ marginTop: 8 }}>
            <Paragraph
              variant="h5"
              style={{ fontSize: 18, color: theme.palette[severity] }}
            >
              <>{severity === 'success' ? 'Genial' : 'Que mal'}</>
            </Paragraph>
          </View>
        </View>
        {children}
      </View>
    </Wizard>
  );
}

const styles = StyleSheet.create({
  alertView: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    display: 'flex',
    alignItems: 'center'
  },
  containerSeverity: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 2
  }
});
