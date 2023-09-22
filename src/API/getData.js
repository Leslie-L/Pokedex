export const getPokemons = async (limit,offset)=>{
    const src = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await src.json();
    return data.results;
}
export const getPokemonInfo = async (pokemon)=>{
    const source  = await fetch(pokemon.url);
    const data = await source.json()
    return data
}
