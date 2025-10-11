import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface TrendingCardProps {
  movie: TrendingMovie,
  index: number
}

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity className='w-32 relative pl-5'>
        <Image source={{uri: movie.poster_url}} className='w-32 h-48 rounded-lg' resizeMode='cover' />
        <View className='absolute bottom-8 -left-1.5 px-2 py-1 rounded-full'>
          <MaskedView maskElement={
            <Text className='text-white font-bold text-6xl'>
              {index+1}
            </Text>
          }>
            <Image source={{
                uri: 'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63770.jpg?semt=ais_hybrid&w=740&q=80'
              }}
              className='size-14'
              resizeMode='cover'
            />
            
          </MaskedView>

        </View>
          <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={1}>
            {movie.title}
          </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard