import {Client, Databases, Query, ID, AppwriteException} from 'react-native-appwrite'
//track the searches made by user
import {Movie} from "@/types/movies"
import dataUriToBuffer from "data-uri-to-buffer";
const APPWRITE = process.env.EXPO_PUBLIC_APPWRITE!;
const APPWRITE_DB = process.env.EXPO_PUBLIC_APPWRITE_DB!;
const APPWRITE_METRICS = process.env.EXPO_PUBLIC_APPWRITE_DB_METRICS!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(APPWRITE)
    .setPlatform('com.lkl.movieapp');

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
    // check if existed
    console.log('RUNNED')
    try{
    console.log('updateSearchCount',query, "movie ", movie)
    const result = await database.listDocuments(APPWRITE_DB,APPWRITE_METRICS, [
            Query.equal('searchTerm',query)
        ])
        console.log('after calling updateSearchCount')
    // isExisted -> increment searchCount field
    if(result.documents.length > 0){
        const existingMovie = result.documents[0]
        await database.updateDocument(
            APPWRITE_DB,
            APPWRITE_METRICS,
            existingMovie.$id,
            {
                count: existingMovie.count +1
            }
        )
        console.log('updateSearchCount',existingMovie)
    }else{
        // !isExisted -> create, increment searchCount +1
        await database.createDocument(
            APPWRITE_DB,
            APPWRITE_METRICS,
            ID.unique(),
            {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                title: movie.title,
            }
        )
        console.log('createSearchCount')
    }
    }catch(err){
        if (err instanceof AppwriteException) {
            console.log(err.message, err.code, err.type);
        } else {
            console.log('Unknown error:', err);
        }
    }





}