import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {Movie} from "@/types/movies";
import {Link} from "expo-router";
import {icons} from "@/constants/icons"

interface Props {
    movies: Movie[] | null;
}
const MovieCard = ({movies}:Props) => {
    return (
        <FlatList<Movie> data={movies}
                         keyExtractor={(item) => item.id.toString()}
                         renderItem={({ item }) =>(
                             <View className={"w-1/3 p-2 "}>

                                 <Link href={`/movies/${item.id}`}>
                                     <TouchableOpacity className={'w-full'} >
                                        <Image source={{
                                            uri: item.poster_path? `https://image.tmdb.org/t/p/w500${item.poster_path}` :
                                                'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
                                        className={'w-full h-40 rounded-lg'}
                                        resizeMode={'cover'}/>
                                         <Text className={'text-sm font-bold text-white mt-1'} numberOfLines={1}>{item.title}</Text>
                                        <View className={'flex-row items-center justify-between gap-x-1 '}>
                                            <View className={'flex-row items-center justify-start gap-x-1'}>
                                                <Image source={icons.star} className={'size-4'}/>
                                                <Text className={'text-white text-xs'}>{Math.round(item.vote_average/2)}</Text>
                                            </View>
                                            <Text className={'text-light-300 text-xs'}>{item.release_date?.split('-')[0]}</Text>
                                        </View>

                                     </TouchableOpacity>
                                 </Link>


                             </View>

                         )}

                         numColumns={3}
                         columnWrapperStyle={{
                             justifyContent: 'flex-start',
                             marginBottom: 10,
                         }}
                         contentContainerStyle={{
                             paddingHorizontal: 5,
                         }}
                         className="mt-2 pb-32"
                         scrollEnabled={false}
        >


        </FlatList>
    );
};
export default MovieCard;
