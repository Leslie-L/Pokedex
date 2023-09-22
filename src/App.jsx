import {  useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Card from "./Components/Cards"
import Header from "./Components/Header"
import Navigation from "./Components/Navigation"
import PokemonsMain from "./Layouts/PokemonsMain"
import {resetResult,moreResults, setLoading} from './Store/Slices/loadingSlide'
import {  getPokemons,getPokemonInfo } from "./API/getData"
import { initialFavorites } from "./Store/Slices/favoriteSlice"

function App() {
  const [pokemons,setPokemons]=useState([])
  const elementObserver = useRef();
  const isLoading = useSelector((state) => state.loading.isLoading)
  const limit = useSelector((state)=>state.loading.limit)
  const offset = useSelector((state)=>state.loading.offset)
  const favPokemons = useSelector((state)=>state.favorites.favorites)
  const dispatch = useDispatch()
  //const [controlDisconnect, setControlDisconnect] = useState(false)
  const observer = useRef(null);
  useEffect(()=>{
    if (isLoading || !elementObserver.current) return;

    if (!observer.current) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          console.log("intersectooooo");
          dispatch(moreResults());
        }
      }, { rootMargin: '50px' });
    }

    observer.current.observe(elementObserver.current);
    //observer.observe(elementObserver.current)
  },[isLoading]);

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
        console.log(limit)
        const call = await getPokemons(limit,offset);
        const allDetails = await Promise.all(call.map(pokemon=>getPokemonInfo(pokemon)))
        //setPokemons(allDetails)
        setPokemons(prevState=>(prevState.concat(allDetails)))
        dispatch(setLoading(false))
      }
      result();
    

  },[offset])

  const getAfavorite= (idPokemon)=>{
    return favPokemons.includes(idPokemon)
  } 
  return (
    <>
     <Header/>
     <Navigation/>
        <PokemonsMain>
          {pokemons.map((item,id)=>{
              
              return <Card key={"PokemonId-"+id} name={item.name} id={id} types={item.types} like={getAfavorite(id+1) }/>
          })}
          <div ref={elementObserver}>Obeserver</div>
        </PokemonsMain>
     
     {
      isLoading && <p className="font-bold text-xl text-center">Loading...</p>
     }
     
    </>
  )
}

export default App
