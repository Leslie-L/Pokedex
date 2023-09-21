import { types } from "./types";
import { getPokemonInfo, getPokemons } from "../API/getData"

export const setPokemons = (payload)=>({
    type:types.SET_POKEMONS,
    payload,
})

export const getPokemonsWithDitails = (pokemons=[])=> async (dispatch)=>{
    const pokemonDetailed = await Promise.all(pokemons.map(pokemon=>getPokemonInfo(pokemon)))
    dispatch(setPokemons(pokemonDetailed))
}