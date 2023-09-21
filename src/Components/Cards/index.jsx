import { pokemonTypes } from "../../Constants/pokemonsTypes";
function Card({name, id,types}) {
    const newName = name.toUpperCase();
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id+1}.svg`
    //const color = "boder-["+pokemonTypes[types[0].type.name].color+"]"
    return(
        <article className={`w-72 h-64 flex flex-col justify-center items-center  rounded-md border-4 border-lightBlack`}>
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
        </article>
    )
}
export default Card;