import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TextInput, Image, ActivityIndicator} from 'react-native';
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import {icons} from "@/constants/icons";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {Movie} from "@/types/movies";
import {fetchMovies} from "@/services/api";
import {updateSearchCount} from "@/services/appwrite";
import {addUsersQueries} from "@/services/supabase";
const Search = () => {
    const router = useRouter();
    const [search, setSearch]=useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const {data:movies, loading:moviesLoading, error: moviesError, refetch:refetchMovies, reset}=
        useFetch<Movie[]>(()=>fetchMovies({query: search}),false)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        const func= async ()=>{
            if (debouncedSearch.trim()) {
                 await refetchMovies();
                 console.log('RUN 1');
            } else {
                reset();
            }
        }
           func()
    }, [debouncedSearch]);

    useEffect(() => {
        const update = async ()=>{
            if(debouncedSearch && movies && movies[0]){
                console.log('RUN 2');
                await addUsersQueries(debouncedSearch,movies[0])
            }
        }
    update()
    }, [debouncedSearch,movies]);


    return (
        <ScrollView className='bg-primary flex-1' >
            <Image source={images.bg} className={'flex-1 w-full absolute z-0'} resizeMode={'cover'} />
            <Image source={icons.logo} className={'mx-auto my-5 w-12 h-10'} resizeMode={'contain'}  />
            <View className={'flex-1 px-2'}>
                <SearchBar placeholder={'Enter your keywords'} setSearch={setSearch} search={search}
                           onPress={()=> {
                               refetchMovies()
                           }}
                />
                {
                    debouncedSearch  ?
                    moviesLoading ? <ActivityIndicator /> :
                        moviesError ? <Text className={'text-white text-center mt-2'}>Error happened</Text> :
                             (
                                <>
                                    <Text className={'text-white w-full text-center font-bold text-lg my-4'}>
                                        Search Results for: <Text className={'text-purple-600 font-bold'}>{debouncedSearch}</Text>
                                    </Text>
                                    {movies && movies.length > 0 ? (
                                        <MovieCard movies={movies} />
                                    ) : (
                                        <Text className={'text-white'}>No matched result</Text>
                                    )}
                                </>
                            ) : null
                }


            </View>



        </ScrollView>
    );
};
export default Search;
