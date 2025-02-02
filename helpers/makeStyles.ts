/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useMemo } from 'react';
import useTheme from 'hooks/useTheme';
import { type Theme } from 'interfaces/theme.interface';
import { StyleSheet } from 'react-native';

type CallBack<T extends StyleSheet.NamedStyles<T>, P> = (
  theme: Theme,
  props: P
) => T;

export const makeStyles =
  <T extends StyleSheet.NamedStyles<T>, P>(callback: CallBack<T, P>) =>
  (props: P = {} as any) => {
    const { theme } = useTheme();
    return useMemo(
      () => StyleSheet.create(callback(theme, props)),
      [props, theme]
    );
  };
