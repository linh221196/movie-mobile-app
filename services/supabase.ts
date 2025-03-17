
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createClient, PostgrestError} from '@supabase/supabase-js'
import {Movie} from "@/types/movies";
import limit from "ajv-formats/src/limit";

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL || "",
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    })

export const addUsersQueries = async(query: string, movie:Movie)=> {
    const {data: existingQuery, error: fetchError} = await supabase
        .from('UserQueries')
        .select('*')
        .eq('searchTerm', query)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching data:', fetchError);
        return;
    }

    if (existingQuery) {
        const {data, error: updateError} = await supabase
            .from('UserQueries')
            .update({count: existingQuery.count + 1})
            .eq('id', existingQuery.id);

        if (updateError) {
            console.error('Error updating count:', updateError);
        } else {
            console.log('Count updated:', data);
        }
    }else{
        const { data, error: insertError } = await supabase
            .from('UserQueries')
            .insert([
                {
                    title: movie.title,
                    movie_id: movie.id,
                    poster_path: movie.poster_path,
                    searchTerm: query,
                    count: 1,
                },
            ]);
        if (insertError) {
            console.error('Error inserting new query:', insertError);
        } else {
            console.log('New query added:', data);
        }
    }
}

export const getMostQueries = async()=> {
    const {data, error: fetchError} = await supabase
        .from('UserQueries')
        .select('*')
        .order('count', { ascending: false })
        .limit(10);
    if(fetchError){return fetchError}
    return data;
}



