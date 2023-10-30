import { makeStyles } from 'helpers/makeStyles';
import React from 'react';
import { Modal, View, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export interface WizardProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  breakPointWidth?: string;
}

export default function Wizard({
  children,
  isOpen,
  onClose
}: WizardProps): React.JSX.Element {
  const styles = useStyles();

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      transparent
      onRequestClose={onClose}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.modal}>
        <Pressable style={styles.pane} onPress={onClose} />
        <View style={styles.modalView}>{children}</View>
      </ScrollView>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    backgroundColor: theme.palette.pane,
    width: '100%',
    height: '100%'
  },
  pane: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  modal: {
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 16,
    width: '100%',
    borderRadius: 8
  }
}));
