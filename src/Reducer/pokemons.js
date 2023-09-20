import { types } from "../Actions/types";

const initialState ={
    pokemons:[],
}
export const pokemonReducers = (state= initialState,action)=>{
    switch (action.type) {
        case types.SET_POKEMONS:
            return({
                ...state,
                pokemons:action.payload
            });
    
        default:
            return state;
    }
}