import React from 'react';
import {View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Movie} from "@/types/movies";
import {useLocalSearchParams,useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import {icons} from "@/constants/icons";
import Details from "@/components/MovieDetails";



const MovieDetails = () => {
    const {id} = useLocalSearchParams()
    const router = useRouter();
    const {data: item, loading, error} = useFetch(()=>fetchMovieDetails(id as string))
    return (
        <View className={'flex-1 bg-primary'} >
            <ScrollView className={'flex-1 w-full'}>
                <View className={'flex-1'}>
                    {
                        loading? <ActivityIndicator className={'size-5 m-auto'} />:
                            error? <Text>An error occurred.</Text>:
                                (
                                        <View >
                                            <View className={'relative'}>
                                                <Image source={{uri: item?.poster_path? `https://image.tmdb.org/t/p/w500${item.poster_path}` :
                                                        'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
                                                       className={'w-full h-[550px] rounded-lg relative'}
                                                       resizeMode={'cover'}

                                                />
                                                <TouchableOpacity className={'font-bold bg-white absolute p-2 rounded-full'}
                                                                  style={{ top: 30, left: 30 }}
                                                                  onPress={()=> router.push('/(tabs)')}
                                                >
                                                    <Image source={icons.arrow} className={'size-5 '}/>
                                                </TouchableOpacity>
                                            </View>

                                            <View className={'flex-col items-start justify-center mt-5 px-5'}>
                                                <Text className={'text-white font-bold text-xl'}>{item?.title}</Text>
                                                <View className={'flex-row gap-x-1'} >
                                                    <Text className={'text-light-200 text-sm'}>{item?.release_date?.split('-')[0]}</Text>
                                                    <Text className={'text-light-200 text-sm'}>{item?.runtime}m</Text>
                                                </View>
                                                <View className={'bg-dark-100 px-2 py-1 mt-2 rounded-md flex-row items-center gap-x-1 '}>
                                                    <Image source={icons.star} className={'size-4'}/>
                                                    <Text className={'text-white text-sm font-bold'}>{item?.vote_average && Math.round(item?.vote_average)}</Text>
                                                    <Text className={'text-white text-sm font-bold'}>({item?.vote_count} votes)</Text>
                                                </View>
                                                <Details title={'Overall'} description={item?.overview}/>
                                                <Details title={'Revenue'}
                                                         description={`Budget: ${item?.budget && item.budget !==0? item.budget :'N/A'} - Revenue: ${item?.revenue && item.budget !==0? item.budget : 'N/A'} - Profit: ${item?.revenue && item?.budget && (item.revenue - item.budget) !==0 ? (item.revenue - item.budget) : 'N/A'}`}/>
                                                <Details title={'Production Companies'} description={`${item?.production_companies.map((c)=> c.name).join(' - ')}`}/>

                                            </View>



                                        </View>

                                )
                    }

                </View>
            </ScrollView>
        </View>
    );
};
export default MovieDetails;
