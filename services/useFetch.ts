import React,{useState,useEffect} from 'react';
import {PostgrestError} from "@supabase/supabase-js";

const useFetch =<T>( fetch:() => Promise<T>, autoFetch= true) => {
    const [data, setData] = useState<T|null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error|null |PostgrestError>(null);

    const fecthData = async ()=>{
        try{
        setLoading(true);
        setError(null);
        const result = await fetch();
        setData(result);
        }catch (err){
            setError(err instanceof Error? err : new Error("An error occurred."));
        }finally {
            setLoading(false);
        }
    }
    const reset= ()=>{
        setData(null);
        setLoading(false);
        setError(null);
    }
    useEffect(()=>{
        if(autoFetch){fecthData();}

    },[])

    return {data, error, loading, refetch:fecthData, reset };
}
export default useFetch;