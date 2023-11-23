import { useLocation, useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux'
import {resetResult} from '../Store/Slices/loadingSlide';
import { getPokemonQuery, getEvolutionChain} from "../API/getData";
import { pokemonTypes } from "../Constants/pokemonsTypes";

import { useEffect, useState } from "react";
import LabelCard from "../Components/LabelCard";
const URL_POKEMON='https://pokeapi.co/api/v2/pokemon/'
function Pokemon() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const id = location.state.id;
    const [pokemon, setPokemon] = useState();
    const [evolution,setEvolution]= useState();
    const [color,setColor] = useState('white');
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState();

    useEffect(()=>{
        setIsLoading(true)
        getPokemonQuery(id).then(data=>{setPokemon(data); setColor(pokemonTypes[data?.types[0].type.name])})
        if(pokemon===-1){
            setError('Pokemon not Found!')
        }
        dispatch(resetResult());   
        setIsLoading(false)
    },[])
    useEffect(()=>{
        if(pokemon){
            const speciesURL = pokemon.species.url;
            getEvolutionChain(speciesURL).then(data=>setEvolution(data)); 
            dispatch(resetResult());
            console.log(evolution)
        }
    },[pokemon])
    const handleBack = ()=>{
        dispatch(resetResult());
        navigate(-1);
    }
    if(isLoading)
         return <h1>Loading ...</h1>
    return(
        <main className="w-full h-full flex flex-col  md:flex-row md:justify-center md:items-center lg:h-screen" style={{backgroundColor:color?.color}}>
            <section className="md:w-1/2 md:h-full flex flex-col justify-center items-center">
                <div className="w-full flex justify-start">
                    <button onClick={handleBack}>
                        <svg className="text-black w-8 h-8" fill="none" stroke="currentColor"  viewBox="0 0 24 24" aria-hidden="true">
                            <path  d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                        </svg>
                    </button>
                </div>
                <article className="md:w-[400px]">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="" />
                    <h1 className="text-center font-bold text-xl text-white">{pokemon?.name?.toUpperCase()} #{('000'+id).slice(-3)}</h1>
                    <div className="m-4 p-4 bg-amber-100 rounded-md">
                        <div className="flex justify-between ">
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
                            <p className="text-md font-bold text-center">Type</p>
                            <div className="flex gap-1 justify-center">
                                {pokemon?.types?.map(item=>{
                                    return <LabelCard key={item.slot} type={item.type.name}/>
                                })}
                            </div>
                        </div>
                    </div>
                </article>
            </section>
            <section className="md:w-1/2 md:h-full flex flex-col justify-center">
                <div className="m-4 p-4 bg-amber-100 rounded-md">
                  <p className="text-md font-bold text-center">Stats</p>
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
                  
                </div>
                <div className="flex justify-center">
                        <div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution?.id1}.png`} className="w-28 h24" alt="" />
                            <p className=" text-center">{evolution?.first?.toUpperCase()}</p>
                        </div>
                        <div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution?.id2}.png`} className="w-28 h24" alt="" />
                            <p className=" text-center">{evolution?.second?.toUpperCase()}</p>
                        </div>
                        {evolution?.id3 &&
                            <div>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution?.id3}.png`} className="w-28 h24" alt="" />
                                <p className=" text-center">{evolution?.third?.toUpperCase()}</p>
                            </div>
                        }
                        
                  </div>
            </section>
        </main>
    )
}
export default Pokemon;