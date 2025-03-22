import React from 'react';
import { View, Text} from 'react-native';
interface Props {
    title: string |undefined;
    description: string | undefined | null;
}
const MovieDetails = ({title, description}:Props) => {
    return (
        <View >
            <Text className={'text-purple-300 font-bold text-lg mt-2'}>{title? title : 'N/A'}</Text>
            <Text className={'text-purple-300 text-sm '}>{description ? description : 'N/A'}</Text>
        </View>
    );
};
export default MovieDetails;
