import { Tabs } from 'expo-router'
import { HomeIcon, PinIcon, SearchIcon, UserCircle2Icon } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

const TabIcon = ({title, icon, focused}: {title: string, icon: React.ReactNode, focused: boolean}) => {
  if (focused) return (
    <View className='flex flex-row gap-2 w-full flex-1 min-w-[112px] rounded-full min-h-16 mt-4 pt-5 bg-[#2d2952] justify-center items-start overflow-hidden'>
      {icon}
      <Text className='text-[#f5f5f5] text-base'>{title}</Text>
    </View>
  )

  return (
    <View className='size-full justify-center items-center mt-4 rounded-full'>
      {icon}
    </View>
  )
}

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        animation: 'shift',
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0d23',

        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                title='Home'
                icon={<HomeIcon color={'#fff'} size={17} />}
                focused={focused}
              />
            )
          }
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                title='Search'
                icon={<SearchIcon color={'#fff'} size={17} />}
                focused={focused}
              />
            )
          }
        }}
      />
      <Tabs.Screen
        name='saved'
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                title='Save'
                icon={<PinIcon color={'#fff'} size={17} />}
                focused={focused}
              />
            )
          }
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                title='Profile'
                icon={<UserCircle2Icon color={'#fff'} size={17} />}
                focused={focused}
              />
            )
          }
        }}
      />
    </Tabs>
  )
}

export default _Layout