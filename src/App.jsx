import {  useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Card from "./Components/Cards"
import Header from "./Components/Header"
import Navigation from "./Components/Navigation"
import PokemonsMain from "./Layouts/PokemonsMain"
import {resetResult,moreResults, setLoading} from './Store/Slices/loadingSlide'
import {  getPokemons,getPokemonInfo, getPokemonQuery } from "./API/getData"
import { initialFavorites } from "./Store/Slices/favoriteSlice"

function App() {
  const [pokemons,setPokemons]=useState([])
  const [search,setSearch]=useState('');
  const [newSearch, setNewSearch] =useState(false)
  const elementObserver = useRef();
  const isLoading = useSelector((state) => state.loading.isLoading)
  const limit = useSelector((state)=>state.loading.limit)
  const offset = useSelector((state)=>state.loading.offset)
  const favPokemons = useSelector((state)=>state.favorites.favorites)
  const dispatch = useDispatch()
  //const [controlDisconnect, setControlDisconnect] = useState(false)
  const observer = useRef(null);
  useEffect(()=>{
    if (isLoading || !elementObserver.current || newSearch) return;

    if (!observer.current) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          dispatch(moreResults());
        }
      }, { rootMargin: '50px' });
    }

    observer.current.observe(elementObserver.current);
    //observer.observe(elementObserver.current)
  },[isLoading]);
  useEffect(()=>{
    if(newSearch && search.length>0){
      const result =  async ()=>{
        dispatch(setLoading(true))
        const call = await getPokemonQuery(search.toLocaleLowerCase());
        setPokemons([call])
        setNewSearch(false);
        dispatch(resetResult())
        dispatch(setLoading(false))
      }
      result();
    }
  },[newSearch])
  useEffect(()=>{
    const favs = window.localStorage.getItem('__pokemonsFavsV0__')
    if(favs) {
      const arraysFavs = JSON.parse(favs)
      dispatch(initialFavorites(arraysFavs))
    }else{
      const arraysFavs = JSON.stringify([])
      localStorage.setItem('__pokemonsFavsV0__',arraysFavs)
      dispatch(initialFavorites([]))
    }
  },[])
  useEffect(()=>{
    const result =  async ()=>{
      dispatch(setLoading(true))
      
      const call = await getPokemons(limit,offset);
      const allDetails = await Promise.all(call.map(pokemon=>getPokemonInfo(pokemon)))
      //setPokemons(allDetails)
      setPokemons(prevState=>(prevState.concat(allDetails)))
      dispatch(setLoading(false))
    }
    if(search.length===0)
      result();
  
  },[offset,newSearch])

  const getAfavorite= (idPokemon)=>{
    return favPokemons.includes(idPokemon)
  } 
  return (
    <>
     <Header/>
     <Navigation search={search} setSearch={setSearch} setNewSearch={setNewSearch} setPokemons={setPokemons}/>
        <PokemonsMain>
          {pokemons.map((item,id)=>{
              
              return <Card key={"PokemonId-"+id} name={item.name} id={item.id} types={item.types} like={getAfavorite(id+1) }/>
          })}
          <div ref={elementObserver}></div>
        </PokemonsMain>
     
     {
      isLoading && <p className="font-bold text-xl text-center">Loading...</p>
     }
     
    </>
  )
}

export default App
