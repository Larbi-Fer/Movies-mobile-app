import SearchBar from "@/components/SearchBar";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter()

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
      </ScrollView>
    </View>
  );
}
