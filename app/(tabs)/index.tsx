import {ActivityIndicator, Animated, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import {ScrollView} from "react-native";
import SearchBar from "@/components/SearchBar";
import {Link, useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {Movie} from "@/types/movies";
import React, {useEffect, useState} from "react";
import {getMostQueries} from "@/services/supabase";
import {PostgrestError} from "@supabase/supabase-js";


export default function Index() {
    const router = useRouter();
    const [search, setSearch]=useState<string>('');

    const {data:movies, loading:moviesLoading, error: moviesError, refetch:refetchMovies}=
        useFetch<Movie[]>(()=>fetchMovies({query: search}))
    const {data:trendMovies, loading:trendMoviesLoading, error: trendMoviesError, refetch:refetchTrendMovies}=
        useFetch<Movie[] | PostgrestError>(()=>getMostQueries())

    useEffect(() => {
        if(!trendMoviesLoading && !trendMoviesError)
        console.log('trendMovies',trendMovies)
    }, [trendMovies]);


  return (
   <View className='flex-1 bg-primary'>
       <Image source={images.bg} className='absolute w-full z-0' />
        <ScrollView className='flex-1 px-5'>
            <Image source={icons.logo} className='w-12 h-10' style={{marginTop:20, marginBottom:5, alignSelf:'center'}}/>
            {
                moviesLoading? (<ActivityIndicator size={"large"} color={"#0000ff"} className={"mt-10 self-center"}/>):
                    moviesError? (<Text>There is error</Text>
                        ):
                        (
                            <View className='flex-1 mt-5'>
                                <SearchBar
                                    onPress={()=> router.push('/Search')}

                                           placeholder='Search for a movie'
                                           setSearch={setSearch}
                                           search={search}

                                />

                                    <Text className={'text-lg text-white font-bold mt-5 mb-3'}>Latest Movies</Text>

                                <MovieCard movies={movies}/>



                            </View>
                        )
            }


        </ScrollView>
   </View>
  );
}
