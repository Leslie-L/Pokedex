export const getPokemons = async ()=>{
    const src = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await src.json();
    return data.results;
}