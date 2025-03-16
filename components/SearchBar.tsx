import React, {ReactDOM, useState} from 'react';
import {View, Text, Image, TextInput,TouchableOpacity,NativeSyntheticEvent,TextInputChangeEventData} from 'react-native';
import {icons} from "@/constants/icons";

interface Props {
    placeholder: string,
    onPress?: ()=> void,
    setSearch: (text: string) => void,
    search:string
}

const SearchBar = ({placeholder, onPress, setSearch,search}:Props) => {

    return (
        <View className='flex-row items-center bg-dark-200 rounded-full' style={{paddingHorizontal:5, paddingVertical:4}} >
            <TouchableOpacity onPress={onPress}>
                <Image source={icons.search} className="size-5" resizeMode={'contain'} tintColor={'#ab8bff'} />
            </TouchableOpacity>

            <TextInput placeholder={placeholder}
                       value={search}
                       onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {setSearch(e.nativeEvent.text)}}
                       placeholderTextColor={'#a8b5db'}
            className='text-center ' style={{color:'white', marginLeft:2}}/>
        </View>
    );
};
export default SearchBar;
