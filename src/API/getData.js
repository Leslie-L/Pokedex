export const getPokemons = async ()=>{
    const src = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const data = await src.json();
    return data.results;
}
export const getPokemonInfo = async (pokemon)=>{
    const source  = await fetch(pokemon.url);
    const data = await source.json()
    return data
}