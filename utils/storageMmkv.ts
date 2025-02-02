import { MMKV } from 'react-native-mmkv';
import dayjs from 'dayjs';

export interface PayloadStorage {
  value: string;
  expire?: string;
}

export const storage = new MMKV({
  id: `app-storage`
});

export const setValueStorage = (
  key: string,
  value: string,
  expiration?: number
): void => {
  let expire;
  if (expiration !== undefined)
    expire = dayjs().add(expiration, 'second').format();

  const payload: PayloadStorage = {
    value,
    expire
  };
  storage.set(key, JSON.stringify(payload));
};
