import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {Movie} from "@/types/movies";
import {Link,useRouter} from "expo-router";

interface Props {
    movies: Movie[] | null ;

}
const TrendCard = ({movies}:Props) => {
    const router = useRouter();

    return (
        <FlatList<Movie> data={movies}
                         keyExtractor={(item) => item.id.toString()}
                         renderItem={({ item,index }) =>(
                             <View className={"w-32 p-1"}>

                                 <Link href={`/movies/${item.id}`}>
                                     <TouchableOpacity className={'w-full relative'}  onPress={() => router.push(`/movies/${item.movie_id}`)}>
                                         <Image source={{
                                             uri: item.poster_path? `https://image.tmdb.org/t/p/w500${item.poster_path}` :
                                                 'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
                                                className={'w-full h-40 rounded-lg'}
                                                resizeMode={'cover'}/>

                                         <View className={'absolute bottom-2 -left-2.5 rounded-xl '}>
                                             <Text className={'text-white font-bold text-6xl bg-black/30 rounded-full'}>{index+1}</Text>
                                         </View>
                                         <Text className={'text-sm font-bold text-white mt-1'} numberOfLines={1}>{item.title}</Text>
                                     </TouchableOpacity>

                                 </Link>
                             </View>
                         )}
                         showsHorizontalScrollIndicator={false}
                         ItemSeparatorComponent={()=><View className={'w-4'}/>}
                         contentContainerStyle={{
                             paddingHorizontal: 5,
                         }}
                         className="mt-2 mb-4"
                         horizontal={true}
        >
        </FlatList>
    );
};
export default TrendCard;
