import { makeStyles } from 'helpers/makeStyles';
import React, { useState } from 'react';
import { Text, Pressable, type PressableProps } from 'react-native';

interface Props extends PressableProps {
  children: React.ReactNode;
  disabled?: boolean;
}

interface StylesProps {
  press: boolean;
}

export default function IconButton({
  children,
  disabled = false,
  ...rest
}: Props): React.JSX.Element {
  const [press, setPress] = useState<boolean>(false);
  const styles = useStyles({ press });

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => {
        setPress(true);
      }}
      onPressOut={() => {
        setPress(false);
      }}
      {...rest}
    >
      <Text style={styles.icon}>{children}</Text>
    </Pressable>
  );
}

const useStyles = makeStyles((theme, props: StylesProps) => ({
  icon: {
    color: props.press
      ? theme.palette.primary.main
      : theme.palette.text.placeholder
  }
}));
