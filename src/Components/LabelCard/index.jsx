import { pokemonTypes } from "../../Constants/pokemonsTypes";
function LabelCard({type}) {
    const component = pokemonTypes[type];
    return(
        <span style={{
            backgroundColor:component.color
        }} className={`px-2 py-2 text-sm text-light rounded-md  `}>
            {component.icon}
            {component.name}
        </span>
    )
}
export default LabelCard;