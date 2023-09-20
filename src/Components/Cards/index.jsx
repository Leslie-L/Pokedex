function Card({name,url, id}) {
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id+1}.png`
    return(
        <article className="w-72 h-64 flex flex-col justify-center items-center  rounded-md border-4 border-green">
            <div className="w-72 flex justify-between px-2">
                <span className="font-roboto font-bold text-black text-lg">{name}</span>
                <span className="text-lg">💀🌱</span>
            </div>
            <div className="w-auto self-start px-2">
                <span className="font-roboto font-light text-lightBlack text-2xl">N. {id}</span>
            </div>
            <img 
            className="w-48 h-48 drop-shadow-md"
            src={img} alt="Pokemon" />
        </article>
    )
}
export default Card;