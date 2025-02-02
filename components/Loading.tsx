import useTheme from 'hooks/useTheme';
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
  children?: React.ReactNode;
  loading: boolean;
  title?: React.JSX.Element;
  size?: number;
}

export default function Loading({
  children,
  loading,
  title,
  size = 50
}: Props): React.JSX.Element {
  const { theme } = useTheme();
  return (
    <>
      {loading ? (
        <View style={styles.root}>
          <ActivityIndicator color={theme.palette.primary.main} size={size} />
          {title}
        </View>
      ) : (
        children
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
