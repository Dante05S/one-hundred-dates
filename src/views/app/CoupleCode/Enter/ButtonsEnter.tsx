import React from 'react';
import useTheme from 'hooks/useTheme';
import { StyleSheet, View } from 'react-native';
import Button from 'components/Buttons/Button';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ButtonsEnter(): React.JSX.Element {
  const { theme } = useTheme();
  const router = useRouter();

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
