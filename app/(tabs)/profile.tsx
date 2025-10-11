import { User2Icon } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

const Profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <User2Icon color={'#fff'} size={30} />
        <Text className='text-gray-500 text-base'>Profile</Text>
      </View>
    </View>
  )
}

export default Profile