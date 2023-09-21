import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Card from "./Components/Cards"
import Header from "./Components/Header"
import Navigation from "./Components/Navigation"
import PokemonsMain from "./Layouts/PokemonsMain"
import {setLoading} from './Store/Slices/loadingSlide'
import {  getPokemons,getPokemonInfo } from "./API/getData"
import { initialFavorites } from "./Store/Slices/favoriteSlice"

function App() {
  const [pokemons,setPokemons]=useState([])
  const isLoading = useSelector((state) => state.loading.isLoading)
  const favPokemons = useSelector((state)=>state.favorites.favorites)
  const dispatch = useDispatch()

  
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
        const call = await getPokemons();
        const allDetails = await Promise.all(call.map(pokemon=>getPokemonInfo(pokemon)))
        setPokemons(allDetails)
        dispatch(setLoading(false))
      }
      result();
  },[])

  const getAfavorite= (idPokemon)=>{
    return favPokemons.includes(idPokemon)
  } 

  return (
    <>
     <Header/>
     <Navigation/>
     
     {
      !isLoading &&
        <PokemonsMain>
          {pokemons.map((item,id)=>{
              return <Card key={"P-"+id} name={item.name} id={id} types={item.types} like={getAfavorite(id+1) }/>
          })}
      </PokemonsMain>
     }
     {
      isLoading && <p className="font-bold text-xl text-center">Loading...</p>
     }
     
    </>
  )
}

export default App
