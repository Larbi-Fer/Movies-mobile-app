import { SearchIcon } from 'lucide-react-native';
import React from 'react';
import { TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChange?: (text: string) => void;
}

const SearchBar = ({onPress, placeholder, value, onChange}: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <SearchIcon color='#fff' size={17} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={'#a8b5db'}
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar