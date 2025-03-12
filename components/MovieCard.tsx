import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Movie} from "@/types/movies";

interface Props {
    movies: Movie[] | null;
}
const MovieCard = ({movies}:Props) => {
    return (
        <FlatList<Movie> data={movies}
                         keyExtractor={(item) => item.id.toString()}
                         renderItem={({ item }) =>(
                             <Text className={"text-white text-sm"}>{item.title}</Text>
                         )}
                         numColumns={3}
                         columnWrapperStyle={{
                             justifyContent:"flex-start",
                             gap:20,
                             paddingRight:5,
                             marginBottom:10
                         }}
                         className={'mt-2 pb-32'}
                         scrollEnabled={false}
        />
    );
};
export default MovieCard;
