import Paragraph from 'components/Paragraph';
import { makeStyles } from 'helpers/makeStyles';
import useTheme from 'hooks/useTheme';
import React, { forwardRef } from 'react';
import {
  Pressable,
  type PressableProps,
  View,
  ActivityIndicator
} from 'react-native';

interface Props extends PressableProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<View, Props>(function Button(
  { children, loading = false, disabled = false, ...rest },
  ref
): React.JSX.Element {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <Pressable
      ref={ref}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        pressed && (!disabled || !loading) ? styles.pressed : styles.notPressed,
        disabled || loading ? styles.disabled : {}
      ]}
      {...rest}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.containerLoading}>
            <ActivityIndicator color={theme.palette.primary.main} size={25} />
          </View>
        )}
        <Paragraph
          style={{ color: theme.palette.primary.contrastText, fontSize: 15 }}
          variant="h5"
        >
          {children}
        </Paragraph>
      </View>
    </Pressable>
  );
});

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 999,
    padding: 10
  },
  pressed: {
    backgroundColor: theme.palette.primary.dark
  },
  notPressed: {
    backgroundColor: theme.palette.primary.main
  },
  disabled: {
    backgroundColor: theme.palette.disabled
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLoading: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 10
  }
}));

export default Button;
