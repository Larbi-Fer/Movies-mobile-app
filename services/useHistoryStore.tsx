import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useHistoryStore = (auto = true) => {
  const [data, setData] = useState<TrendingMovie[]>()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('history');

      return value
    } catch (e) {
      console.error(e);
      throw e
    }
  };

  const storeData = async (data: TrendingMovie) => {
    try {
      const value = await AsyncStorage.getItem('history');

      if (!value) {
        await AsyncStorage.setItem('history', JSON.stringify([data]))
        return
      }

      const movies = JSON.parse(value)
      if (!(await checkMovie(data.movie_id))) {
        let newMovies;
        if (movies.length < 20) newMovies = [data, ...movies]
        else {
          movies.pop()
          newMovies = [data, ...movies]
        }
        await AsyncStorage.setItem('history', JSON.stringify(newMovies))
        setData(newMovies)
      } else {
        await AsyncStorage.setItem('history', JSON.stringify([ data, ...movies.filter((m: any) => m.movie_id != data.movie_id) ]))
      }

    } catch (error) {
      console.error(error);
      throw error
    }
  }

  const checkMovie = async(id: string) => {
    try {
      const movies = JSON.parse(await getData() ?? '')
      if (!movies) return false

      return movies.findIndex((m: any) => m.movie_id == id) != -1
    } catch (error) {
      console.error(error);
      return false
    }
  }
  
  const removeMovie = async(id: string) => {
    try {
      const movies = JSON.parse(await getData() ?? '')
      if (!movies) return;
      const newMovies = movies.filter((m: TrendingMovie) => m.movie_id != id)
      await AsyncStorage.setItem('history', JSON.stringify(newMovies))
      setData(newMovies)
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  useEffect(() => {
    if (!auto) return
    (async() => {
      const value = await getData()
      if (!value) return setData([])
      setData(JSON.parse(value))
    })()
  }, [])

  return {data: data, getData: async() => {
    const value = await getData()
    if (!value) return setData([])
    setData(JSON.parse(value))
  }, storeData, checkMovie, removeMovie}
}