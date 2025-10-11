import { SaveIcon } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

const Saved = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <SaveIcon color={'#fff'} size={30} />
        <Text className='text-gray-500 text-base'>Save</Text>
      </View>
    </View>
  )
}

export default Saved