import {  useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Card from "../Components/Cards"
import Header from "../Components/Header"
import Navigation from "../Components/Navigation"
import PokemonsMain from "../Layouts/PokemonsMain"
import {resetResult,moreResults, setLoading, setIsNext, setNotFound} from '../Store/Slices/loadingSlide'
import {  getPokemons,getPokemonInfo, getPokemonQuery } from "../API/getData"
import { initialFavorites } from "../Store/Slices/favoriteSlice"

function App() {
  const [pokemons,setPokemons]=useState([])
  const [search,setSearch]=useState('');
  const [lastKey, setLastKey]= useState('Enter');
  const [newSearch, setNewSearch] =useState(false)
  const elementObserver = useRef();
  const isLoading = useSelector((state) => state.loading.isLoading)
  const limit = useSelector((state)=>state.loading.limit)
  const offset = useSelector((state)=>state.loading.offset)
  const isNext = useSelector((state)=>state.loading.isNext)
  const notFound = useSelector((state)=>state.loading.notFound)
  const favPokemons = useSelector((state)=>state.favorites.favorites)
  const dispatch = useDispatch()
  
  const observer = useRef(null);
  useEffect(()=>{
    if (isLoading || !elementObserver.current || newSearch) return;

    if (!observer.current) {
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          console.log("intersecto")
          dispatch(moreResults());
        }
      }, { rootMargin: '100px' });
    }

    observer.current.observe(elementObserver.current);
    //observer.observe(elementObserver.current)
  },[isLoading]);

  useEffect(()=>{
    if(newSearch && search.length>0){
      const result =  async ()=>{
        dispatch(setLoading(true))
        const call = await getPokemonQuery(search.toLocaleLowerCase());
        if(call==-1){
          dispatch(setNotFound(true))
          setPokemons([])
        }else{
          dispatch(setNotFound(false))
          setPokemons([call])
        }
        setNewSearch(false);
        dispatch(resetResult())
        dispatch(setLoading(false))
      }
      result();
    }else{
      setNewSearch(false)
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
      const {result,next} = await getPokemons(limit,offset);
      const allDetails = await Promise.all(result.map(pokemon=>getPokemonInfo(pokemon)))
      if(!next)dispatch(setIsNext(false))
      setPokemons(prevState=>(prevState.concat(allDetails)))
      dispatch(setLoading(false))
    }
    if(search.length===0 && newSearch===false && isNext)
      result();
  
  },[offset,newSearch])

  const getAfavorite= (idPokemon)=>{
    return favPokemons.includes(idPokemon)
  } 
  return (
    <>
     <Header/>
     <Navigation 
      search={search} 
      setSearch={setSearch} 
      setNewSearch={setNewSearch} 
      setPokemons={setPokemons}
      lastKey={lastKey}
      setLastKey={setLastKey}
      />
        <PokemonsMain>
          {pokemons.map((item,id)=>{
              
              return <Card key={"PokemonId-"+id} name={item.name} id={item.id} types={item.types} like={getAfavorite(item.id) }/>
          })}
          {
            notFound && <p className="font-bold text-xl text-center">No se encontro el pokemon...</p>
          }
          <div ref={elementObserver}></div>
        </PokemonsMain>
     
     {
      isLoading && <p className="font-bold text-xl text-center w-screen h-max">Loading...</p>
     }
     
     
    </>
  )
}

export default App
