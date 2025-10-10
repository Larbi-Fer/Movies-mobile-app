import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter()

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }))

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className='flex-1 px-5' showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: '100%', paddingBottom: 10
      }}>
        <Image source={require("../../assets/images/icon.png")} className="w-24 h-24" />
        <SafeAreaView>
          <View className="flex-1">
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder='Search for a movie'
            />
          </View>
        </SafeAreaView>

        {moviesLoading ? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className="mt10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

            <FlatList
              data={movies}
              renderItem={({ item }) => (
                <MovieCard
                  {...item}
                />
              )}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
