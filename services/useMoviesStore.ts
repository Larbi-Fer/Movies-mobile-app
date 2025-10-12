import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useMoviesStore = (auto = true) => {
  const [data, setData] = useState<TrendingMovie[]>()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('movies');
      return value
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (data: TrendingMovie) => {
    try {
      const value = await AsyncStorage.getItem('movies');

      if (!value) {
        await AsyncStorage.setItem('movies', JSON.stringify([data]))
        return
      }

      const movies = JSON.parse(value)
      if (!(await checkMovie(data.movie_id))) {
        await AsyncStorage.setItem('movies', JSON.stringify([...movies, data]))
        setData([...movies, data])
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
      await AsyncStorage.setItem('movies', JSON.stringify(newMovies))
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
      if (!value) return
      setData(JSON.parse(value))
    })()
  }, [])

  return {data: data, getData: async() => {
    const value = await getData()
    if (!value) return
    setData(JSON.parse(value))
  }, storeData, checkMovie, removeMovie}
}