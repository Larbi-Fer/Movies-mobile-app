import SavedMoviesCard from '@/components/SavedMoviesCard'
import { useHistoryStore } from '@/services/useHistoryStore'
import { RefreshCwIcon } from 'lucide-react-native'
import React from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const History = () => {
  const {data: movies, getData} = useHistoryStore()

  return (
    <View className='bg-primary flex-1 px-4'>
      <ScrollView>
        <View className="flex-1">
          <View className='flex justify-between flex-row items-center px-4'>
            <Text className="text-lg text-white font-bold mt-5 mb-3">Your History</Text>
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
            keyExtractor={item => item.movie_id?.toString()}
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

export default History