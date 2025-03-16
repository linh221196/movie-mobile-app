

export const TMDB_CONFIG={
    BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    HEADER:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`

    }
}

export const fetchMovies = async ({query} : { query: string }) =>{
    const endpoint =query?
        `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.HEADER,
    })
        .then((response)=> response)
        .catch((error)=> console.log(error))

    if(response instanceof Response){
        const data = await response.json();

        return data.results;
    }


}
