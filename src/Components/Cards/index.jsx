import { useDispatch } from "react-redux";
import { pokemonTypes } from "../../Constants/pokemonsTypes";

import { addFavorite,deleteFavorite } from "../../Store/Slices/favoriteSlice";
function Card({name, id,types,like}) {
    
    const dispatch = useDispatch();
    const newName = name.toUpperCase();
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id+1}.svg`
    const color = {
        backgroundColor: pokemonTypes[types[0].type.name].color
    }
   
    const handleAddFavorite = ()=>{
        dispatch(addFavorite(id+1))
    }
    const handleDeleteFavorite = ()=>{
        dispatch(deleteFavorite(id+1))
    }
    return(
        <article style={color} className={`w-72 h-64 flex flex-col justify-center items-center  rounded-md border-4 border-lightBlack relative`}>
            <div className="w-72 flex justify-between px-2">
                <span className="font-roboto font-bold text-black text-lg">{newName}</span>
                <span className="text-lg">{types.map(type=>{
                    return pokemonTypes[type.type.name].icon })}</span>
            </div>
            <div className="w-auto self-start px-2">
                <span className="font-roboto font-light text-lightBlack text-2xl">N. {id+1}</span>
            </div>
            <img 
            className="w-48 h-48 drop-shadow-md"
            src={img} alt="Pokemon" />
            {
                like ? <button className="w-8  h-8 shadow-lg absolute top-[-16px] left-1/2 rounded-xl bg-blue" onClick={handleDeleteFavorite}>🤍</button>:<button className="w-8  h-8 shadow-lg absolute top-[-16px] left-1/2 rounded-xl bg-lightBlue hover:bg-blue" onClick={handleAddFavorite}>💙</button>
            }
            
        </article>
    )
}
export default Card;