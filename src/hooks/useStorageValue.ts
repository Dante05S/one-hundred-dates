import { useMemo } from 'react';
import { type PayloadStorage, storage } from 'utils/storageMmkv';
import dayjs from 'dayjs';
import { useMMKVObject } from 'react-native-mmkv';

export default function useStorageValue(key: string): string | null {
  const [payload] = useMMKVObject<PayloadStorage>(key, storage);

  const storageValue = useMemo(() => {
    if (payload === undefined) return null;
    if (payload.expire === undefined) return payload.value;

    const actTime = dayjs();
    const expirationDate = dayjs(payload.expire);

    if (!actTime.isBefore(expirationDate)) {
      storage.delete(key);
      return null;
    }
    return payload.value;
  }, [payload]);

  return storageValue;
}
