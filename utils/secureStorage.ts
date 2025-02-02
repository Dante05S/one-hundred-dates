import * as SecureStore from 'expo-secure-store';

export const save = async (value: string): Promise<void> => {
  if (process.env.EXPO_PUBLIC_SECRET_KEY === undefined) {
    console.error('Please provide the key');
    return;
  }
  await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_SECRET_KEY, value);
};

export const saveRefresh = async (value: string): Promise<void> => {
  if (process.env.EXPO_PUBLIC_REFRESH_SECRET_KEY === undefined) {
    console.error('Please provide the key');
    return;
  }
  await SecureStore.setItemAsync(
    process.env.EXPO_PUBLIC_REFRESH_SECRET_KEY,
    value
  );
};

export const getValueToken = async (): Promise<string | null> => {
  const result = await SecureStore.getItemAsync(
    process.env.EXPO_PUBLIC_SECRET_KEY ?? ''
  );
  return result;
};

export const getValueRefreshToken = async (): Promise<string | null> => {
  const result = await SecureStore.getItemAsync(
    process.env.EXPO_PUBLIC_REFRESH_SECRET_KEY ?? ''
  );
  return result;
};

export const deleteToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_SECRET_KEY ?? '');
};

export const deleteRefreshToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(
    process.env.EXPO_PUBLIC_REFRESH_SECRET_KEY ?? ''
  );
};
