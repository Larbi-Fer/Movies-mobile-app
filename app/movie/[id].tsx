import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useHistoryStore } from '@/services/useHistoryStore'
import { useMoviesStore } from '@/services/useMoviesStore'
import { router, useLocalSearchParams } from 'expo-router'
import { ArrowLeftIcon, PinIcon, StarIcon } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}
    </Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>
      {value || 'N/A'}
    </Text>
  </View>
)

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const {storeData, checkMovie, removeMovie} = useMoviesStore(false)
  const {storeData: storteHistory} = useHistoryStore()

  const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string))
  
  useEffect(() => {
    if (!movie) return
    storteHistory({
      movie_id: movie?.id,
      title: movie?.title,
      poster_url: movie?.poster_path,
    })
  }, [movie])

  if (loading) return (
    <View className='bg-primary px-10 flex justify-center items-center flex-1 flex-col gap-5'>
      <ActivityIndicator
        size='large'
        color='#0000ff'
      />
    </View>
  )

  return (
    <View className='bg-primary flex-1 relative'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className='absolute top-5 right-5 z-50'>
          <TouchableOpacity onPress={async() => {
            if (await checkMovie(movie?.id)) {
              removeMovie(movie?.id)
              ToastAndroid.show('Successfully removed from the saved list', ToastAndroid.SHORT)
            } else {
              storeData({
                movie_id: movie?.id,
                title: movie?.title,
                poster_url: movie?.poster_path,
              })
              ToastAndroid.show('Successfully saved', ToastAndroid.SHORT)
            }
          }}>
            {(async() => await checkMovie(movie?.id) ? <PinIcon color={'#ff0'} /> : <PinIcon color={'#fff'} />)()}
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          className='w-full h-[550px]'
          resizeMode='stretch'
        />

        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>

          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
          </View>

          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <StarIcon color={'#ffe900'} size={15} />
            <Text className='text-white font-bold text-sm'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className='text-light-200'>
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo label='Genres' value={movie?.genres?.map((g: any) =>  g.name)?.join(' - ')} />
          
          <View className='flex flex-row justify-between w-1/2'>
            <MovieInfo label='Budget' value={`$${movie?.budget / 1_000_000} million`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue / 1_000_000)} million`} />
          </View>
          <MovieInfo label='Production Componies' value={movie?.production_companies?.map((c: any) => c.name).join(' - ')} />
        </View>
      </ScrollView>

      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center gap-2 z-50'
        onPress={router.back}
      >
        <ArrowLeftIcon color={'white'} size={20} />
        <Text className='text-white font-semibold text-base'>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails