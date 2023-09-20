import { types } from "./types";
export const setPokemons = (payload)=>({
    type:types.SET_POKEMONS,
    payload,
})