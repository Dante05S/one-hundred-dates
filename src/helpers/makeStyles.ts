/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useMemo } from 'react';
import useTheme from 'hooks/useTheme';
import { type Theme } from 'interfaces/theme.interface';
import { StyleSheet } from 'react-native';

type CallBack<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
  P
> = (theme: Theme, props: P) => T | StyleSheet.NamedStyles<T>;

export const makeStyles =
  <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, P>(
    callback: CallBack<T, P>
  ) =>
  (props: P = {} as any) => {
    const { theme } = useTheme();
    return useMemo(() => {
      const css = callback(theme, props);
      return StyleSheet.create(css);
    }, [props, theme]);
  };
