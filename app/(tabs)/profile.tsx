import { Link } from 'expo-router'
import { Edit2Icon, HistoryIcon, Settings2Icon, User2Icon } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  return (
    <View className='bg-primary flex-1 pt-14 flex flex-col gap-10'>
      <View className='flex flex-row gap-5 items-center px-10'>
        <View className='p-3 bg-dark-200 rounded-full'>
          <User2Icon color={'#fff'} size={30} />
        </View>
        <View>
          <Text className='text-white text-lg'>Username</Text>
          <Text className='text-gray-500 text-sm'>email</Text>
        </View>
      </View>

      <View className='w-full h-0.5 bg-neutral-700'></View>

      <View className='flex flex-col px-5'>
        <View className='bg-dark-200 rounded-md border-b-4'>
          <Link href={'/history'} asChild>
            <TouchableOpacity>
              <View className='flex items-center flex-row gap-2 px-4 py-3 border-b border-dark-100'>

                <HistoryIcon color={'#fff'} />
                <Text className='text-white text-xl'>History</Text>
              </View>
            </TouchableOpacity>
          </Link>
          
          <Link href={'/history'} asChild>
            <TouchableOpacity>
              <View className='flex items-center flex-row gap-2 px-4 py-3 border-b border-dark-100'>

                <Edit2Icon color={'#fff'} />
                <Text className='text-white text-xl'>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </Link>
          
          <Link href={'/history'} asChild>
            <TouchableOpacity>
              <View className='flex items-center flex-row gap-2 px-4 py-3'>

                <Settings2Icon color={'#fff'} />
                <Text className='text-white text-xl'>Settings</Text>
              </View>
            </TouchableOpacity>
          </Link>
          
          
        </View>
      </View>
    </View>
  )
}

export default Profile