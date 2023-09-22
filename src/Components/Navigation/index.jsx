import pokeball from '../../Images/pokeball.svg'
function Navigation({search,setSearch,setNewSearch,setPokemons,lastKey,setLastKey}) {
    function handleSearch(event) {
        console.log(event.target.value)
        setSearch(event.target.value)
    }
    function handleKey(event) {
        if(event.key==='Enter' && search.length === 0 && lastKey==='Enter'){
            return;
        }else if(event.key==='Enter' && search.length === 0 ){
            setNewSearch(true);
            setPokemons([])
        }else if(event.key==='Enter'){
            setNewSearch(true);
         } 
         setLastKey(event.key)
    }
    return(
        <section className="w-full h-24 flex flex-col justify-center items-center">
            <div className='flex mx-2'>
                <img src={pokeball} alt={pokeball}  className='w-8 h-8 bg-cover mr-2'/>
                <input type="text"  value={search} onChange={handleSearch}  onKeyDown={handleKey} className='w-72 bg-red rounded-md text-white2 shadow-md px-2' placeholder='Busca un pokemon!' />
            </div>
        </section>
    )
}
export default Navigation;