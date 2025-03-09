import {Animated, Image, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import {ScrollView} from "react-native";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";


export default function Index() {
    const router = useRouter();
  return (
   <View className='flex-1' style={{backgroundColor: "#0f0D23"}} >
       <Image source={images.bg} className='absolute w-full z-0' />
        <ScrollView className='flex-1'
        contentContainerStyle={{alignItems:"center",paddingStart:5,paddingEnd:5}}>
            <Image source={icons.logo} className='w-12 h-10' style={{marginTop:20, marginBottom:5}}/>
            <View className='flex-1 mt-5'>
                <SearchBar onPress={()=> router.push('/Search')}
                placeholder='Search for a movie'
                />

            </View>
        </ScrollView>
   </View>
  );
}
