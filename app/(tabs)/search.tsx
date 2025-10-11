import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false)

  useEffect(() => {
    const timeoutId = setTimeout(async() => {
      if (searchQuery.trim()) {
        await loadMovies()
        // console.log(movies);
        
        if (movies?.length > 0 && movies?.[0])
          await updateSearchCount(searchQuery, movies[0])
      } else reset()
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery])
  

  return (
    <View className='flex-1 bg-primary'>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="mt-2 pb-32"
        ListHeaderComponent={
          <>
            <View className='my-5'>
              <SearchBar
                placeholder='Search movie ...'
                value={searchQuery}
                onChange={text => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                  size='large'
                  color='#0000ff'
                  className="mt10 self-center"
                />
            )}

            {error && (
              <Text>Error: {error?.message}</Text>
            )}

            {!loading && !error && searchQuery.trim() && (
              <View>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Search Results for {' '}
                  <Text className='text-accent'>{searchQuery}</Text>
                </Text>
                
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? <>
            <View className='mt-10 px5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          </> : null
        }
      />
    </View>
  )
}

export default Search