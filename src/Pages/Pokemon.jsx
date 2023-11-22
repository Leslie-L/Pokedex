import { useLocation } from "react-router-dom";
import { getPokemonQuery, getEvolutionChain} from "../API/getData";
import { pokemonTypes } from "../Constants/pokemonsTypes";

import { useEffect, useState } from "react";
import LabelCard from "../Components/LabelCard";
const URL_POKEMON='https://pokeapi.co/api/v2/pokemon/'
function Pokemon() {
    const location = useLocation();
    const id = location.state.id;
    const [pokemon, setPokemon] = useState();
    const [evolution,setEvolution]= useState()
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState();

    useEffect(()=>{
        setIsLoading(true)
        getPokemonQuery(id).then(data=>setPokemon(data))
        console.log(pokemon)
        if(pokemon===-1)
            setError('Pokemon not Found!')
        setIsLoading(false)
    },[])
    useEffect(()=>{
        if(pokemon){
            const speciesURL = pokemon.species.url;
            getEvolutionChain(speciesURL).then(data=>setEvolution(data)); 
        }
    },[pokemon])
    if(isLoading)
        return <h1>Loading ...</h1>
    return(
        <main className="w-full h-screen">
            <section>
                <div>

                </div>
                <article>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="" />
                    <h1>{pokemon?.name} #{id}</h1>
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold text-md">Height</p>
                                <p className="font-light text-sm">{pokemon?.height}mts</p>
                            </div>
                            <div>
                                <p className="font-bold text-md">Spicies</p>
                                <p className="font-light text-sm">{pokemon?.species.name}</p>
                            </div>
                            <div>
                                <p className="font-bold text-md">Weight</p>
                                <p className="font-light text-sm">{pokemon?.weight}kg</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-md font-bold">Type</p>
                            <div className="flex gap-1 justify-center">
                                {pokemon?.types?.map(item=>{
                                    return <LabelCard key={item.slot} type={item.type.name}/>
                                })}
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <section>
                <div>
                  <p className="text-md font-bold">Stats</p>
                  <div className="w-full" style={{display:'grid',gridTemplateColumns:'40% 10% 50%'}}>
                        {
                            pokemon?.stats?.map(stat=>{
                                const base_stat = stat.base_stat;
                                const percentage = base_stat+'%';
                                const name = stat.stat.name;
                                return <>
                                    <p className="text-md font-bold">{name}</p>
                                    <p className="font-light text-sm">{base_stat}</p>
                                    <div className="w-full h-2 bg-black rounded-md">
                                        <div style={{width:percentage}} className="h-2 bg-yellow rounded-md">

                                        </div>
                                    </div>
                                </>
                            })
                        }
                  </div>
                  <div className="flex">
                        <div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution?.id1}.png`} className="w-28 h24" alt="" />
                            <p>{evolution?.first}</p>
                        </div>
                        <div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution?.id2}.png`} className="w-28 h24" alt="" />
                            <p>{evolution?.second}</p>
                        </div>
                        <div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution?.id3}.png`} className="w-28 h24" alt="" />
                            <p>{evolution?.third}</p>
                        </div>
                  </div>
                </div>
            </section>
        </main>
    )
}
export default Pokemon;