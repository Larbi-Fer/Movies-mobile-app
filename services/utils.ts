import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data)
  } catch (error) {
    console.error(error);
    throw error
  }
}