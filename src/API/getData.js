

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

export const getEvolutionChain =async (url) =>{
    const src = await fetch(url);
    const info = await src.json();
    const newUrl = info.evolution_chain.url;
    const source  = await fetch(newUrl);
    if(source.status===404) return -1
    const data = await source.json();
    const sol1 = await getPokemonQuery(data.chain.species.name);
    const id1 = sol1.id; 
    const sol2 = await getPokemonQuery(data.chain.evolves_to[0].species.name);
    const id2 = sol2.id; 
    const sol3 = await getPokemonQuery(data.chain.evolves_to[0]?.evolves_to[0]?.species?.name);
    const id3 = sol3.id; 
    const res ={
        'first':data.chain.species.name,
        id1,
        'second':data.chain.evolves_to[0].species.name,
        id2,
        'third':data.chain.evolves_to[0]?.evolves_to[0]?.species?.name || undefined,
        id3: id3 || undefined,
    }
            
    return res
}