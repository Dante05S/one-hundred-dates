import * as SecureStore from 'expo-secure-store';

export const save = async (value: string): Promise<void> => {
  if (process.env.EXPO_PUBLIC_SECRET_KEY === undefined) {
    console.error('Please provide the key');
    return;
  }
  await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_SECRET_KEY, value);
};

export const getValueToken = async (): Promise<string | null> => {
  const result = await SecureStore.getItemAsync(
    process.env.EXPO_PUBLIC_SECRET_KEY ?? ''
  );
  return result;
};
