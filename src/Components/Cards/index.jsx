function Card() {
    return(
        <article className="w-72 h-64 flex flex-col justify-center items-center  rounded-md border-4 border-green">
            <div className="w-72 flex justify-between px-2">
                <span className="font-roboto font-bold text-black text-lg">BULBASAUR</span>
                <span className="text-lg">💀🌱</span>
            </div>
            <div className="w-auto self-start px-2">
                <span className="font-roboto font-light text-lightBlack text-2xl">N. 001</span>
            </div>
            <img 
            className="w-48 h-48 drop-shadow-md"
            src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/4/43/latest/20190406170624/Bulbasaur.png/1200px-Bulbasaur.png" alt="Pokemon" />
        </article>
    )
}
export default Card;