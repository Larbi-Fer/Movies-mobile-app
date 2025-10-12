import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

interface SavedMoviesCardProps {
  movie: TrendingMovie,
}

const SavedMoviesCard = ({ movie }: SavedMoviesCardProps) => {
  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity className='w-1/3'>
        <Image source={{
          uri: movie.poster_url ? `https://image.tmdb.org/t/p/w500${movie.poster_url}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
        }} className='w-32 h-48 rounded-lg' resizeMode='cover' />

        <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={1}>
          {movie.title}
        </Text>
        
      </TouchableOpacity>
    </Link>
  )
}

export default SavedMoviesCard