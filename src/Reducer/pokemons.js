import { types } from "../Actions/types";

const initialState ={
    pokemons:[],
    loading:false
}
export const pokemonReducers = (state= initialState,action)=>{
    switch (action.type) {
        case types.SET_POKEMONS:
            return({
                ...state,
                pokemons:action.payload
            });
        case types.SET_LOADING:
            return({
                ...state,
                loading:action.payload
            })
        case types.SET_LIKE:
            const temporalArray=[...state.pokemons];
            const index = temporalArray.findIndex((pokemon)=>pokemon.id===action.payload);
            temporalArray[index].like =temporalArray[index].like ? !temporalArray[index].like : true;
            return({
                ...state,
                pokemons:temporalArray
            })
        default:
            return state;
    }
}