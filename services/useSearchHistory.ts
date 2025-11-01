import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useSearchHistory = (auto = true) => {
  const [data, setData] = useState<string[]>()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('search');
      return value
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (data: string) => {
    try {
      const value = await AsyncStorage.getItem('search');

      if (!value) {
        await AsyncStorage.setItem('search', JSON.stringify([data]))
        return
      }

      const history = JSON.parse(value)
      if (history.length >= 5) {
        history.pop()
      }
      await AsyncStorage.setItem('search', JSON.stringify([data, ...history]))
      setData([data, ...history])

    } catch (error) {
      console.error(error);
      throw error
    }
  }

  useEffect(() => {
    if (!auto) return
    (async() => {
      const value = await getData()
      if (!value) return
      setData(JSON.parse(value))
    })()
  }, [])

  return {data, getData: async() => {
    const value = await getData()
    if (!value) return
    setData(JSON.parse(value))
  }, storeData}
}