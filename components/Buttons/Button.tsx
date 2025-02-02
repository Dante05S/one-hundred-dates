import Paragraph, { type ParagraphProps } from 'components/Paragraph';
import { makeStyles } from 'helpers/makeStyles';
import useTheme from 'hooks/useTheme';
import React, { forwardRef, useState } from 'react';
import {
  Pressable,
  type PressableProps,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

interface Props extends PressableProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'contained' | 'text';
  paragraphProps?: Pick<ParagraphProps, 'style' | 'variant'>;
  startIcon?: React.JSX.Element;
  endIcon?: React.JSX.Element;
}

interface ButtonIconProps {
  children: React.ReactNode;
  loading: boolean;
  startIcon?: React.JSX.Element;
  endIcon?: React.JSX.Element;
}

function ButtonIcon({
  children,
  startIcon,
  endIcon,
  loading
}: ButtonIconProps): React.JSX.Element {
  return (
    <View style={stylesButtonIcon.containerButton}>
      {!loading && startIcon}
      {children}
      {!loading && endIcon}
    </View>
  );
}

const Button = forwardRef<View, Props>(function Button(
  {
    children,
    loading = false,
    disabled = false,
    variant = 'contained',
    paragraphProps,
    startIcon,
    endIcon,
    ...rest
  },
  ref
): React.JSX.Element {
  const [press, setPress] = useState<boolean>(false);
  const { theme } = useTheme();
  const styles = useStyles({ press, disabled });

  return (
    <Pressable
      ref={ref}
      disabled={disabled || loading}
      style={
        variant === 'contained'
          ? [
              styles.button,
              press && (!disabled || !loading)
                ? styles.pressed
                : styles.notPressed,
              disabled || loading ? styles.disabled : {}
            ]
          : {}
      }
      onPressIn={() => {
        setPress(true);
      }}
      onPressOut={() => {
        setPress(false);
      }}
      {...rest}
    >
      {variant === 'contained' ? (
        <View style={styles.container}>
          {loading && (
            <View style={styles.containerLoading}>
              <ActivityIndicator color={theme.palette.primary.main} size={25} />
            </View>
          )}
          <ButtonIcon loading={loading} startIcon={startIcon} endIcon={endIcon}>
            <Paragraph
              style={[
                { color: theme.palette.primary.contrastText, fontSize: 15 },
                paragraphProps?.style
              ]}
              variant={paragraphProps?.variant ?? 'h5'}
            >
              {children}
            </Paragraph>
          </ButtonIcon>
        </View>
      ) : (
        <ButtonIcon loading={loading} startIcon={startIcon} endIcon={endIcon}>
          <Paragraph
            variant={paragraphProps?.variant ?? 'h5'}
            style={[
              styles.variantText,
              press && (!disabled || !loading)
                ? styles.pressedText
                : styles.notPressedText,
              disabled || loading ? styles.disabledText : {},
              paragraphProps?.style
            ]}
          >
            {children}
          </Paragraph>
        </ButtonIcon>
      )}
    </Pressable>
  );
});

const stylesButtonIcon = StyleSheet.create({
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7
  }
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
  },
  variantText: {
    fontSize: 15
  },
  pressedText: {
    color: theme.palette.primary.dark
  },
  notPressedText: {
    color: theme.palette.primary.main
  },
  disabledText: {
    color: theme.palette.disabled
  }
}));

export default Button;
