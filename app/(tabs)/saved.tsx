import SavedMoviesCard from '@/components/SavedMoviesCard'
import { useMoviesStore } from '@/services/useMoviesStore'
import { RefreshCwIcon } from 'lucide-react-native'
import React from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Saved = () => {
  const { data: movies, getData } = useMoviesStore()

  return (
    <View className='bg-primary flex-1 px-4'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="flex-1 mt-5">
          <View className='flex justify-between flex-row items-center'>
            <Text className="text-lg text-white font-bold mt-5 mb-3">Saved Movies</Text>
            <TouchableOpacity onPress={getData}>
              <RefreshCwIcon color={'#fff'} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <SavedMoviesCard
                movie={item}
              />
            )}
            keyExtractor={item => item.movie_id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 5,
              paddingRight: 5,
              marginBottom: 20
            }}
            className="mt-4 pb-32"
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Saved