

export const getPokemons = async (limit,offset)=>{
    const src = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await src.json();
    return {result:data.results, next:data.next};
}
export const getPokemonInfo = async (pokemon)=>{
    const source  = await fetch(pokemon.url);
    const data = await source.json()
    return data
}
export const getPokemonQuery = async (query)=>{
    const source  = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if(source.status===404) return -1
    const data = await source.json();
    return data
}