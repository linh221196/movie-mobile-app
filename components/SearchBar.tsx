import React from 'react';
import {View, Text, Image, TextInput,TouchableOpacity} from 'react-native';
import {icons} from "@/constants/icons";

interface Props {
    placeholder: string,
    onPress?: ()=> void
}

const SearchBar = ({placeholder, onPress}:Props) => {

    return (
        <View className='flex-row items-center bg-dark-200 rounded-full' style={{paddingHorizontal:5, paddingVertical:4}} >
            <TouchableOpacity onPress={onPress}>
                <Image source={icons.search} className="size-5" resizeMode={'contain'} tintColor={'#ab8bff'} />
            </TouchableOpacity>

            <TextInput placeholder={placeholder}

                       value='search'
                       onChangeText={(text: string) => {}}
                       placeholderTextColor={'#a8b5db'}
            className='text-center ' style={{color:'white', marginLeft:2}}/>
        </View>
    );
};
export default SearchBar;
