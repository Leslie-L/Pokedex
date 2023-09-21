import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getPokemonsWithDitails, setLoading, setPokemons } from "./Actions"
import Card from "./Components/Cards"
import Header from "./Components/Header"
import Navigation from "./Components/Navigation"
import PokemonsMain from "./Layouts/PokemonsMain"
import {  getPokemons } from "./API/getData"

function App() {
  const pokemons = useSelector(state=>state.pokemons)
  const loading  = useSelector(state=>state.loading)
  const dispatch = useDispatch()
  useEffect(()=>{
      const result =  async ()=>{
        dispatch(setLoading(true))
        const call = await getPokemons();
        dispatch(getPokemonsWithDitails(call))
        dispatch(setLoading(false))
      }
      result();
  },[])
  
  return (
    <>
     <Header/>
     <Navigation/>
     {
      loading && <p className="font-bold text-xl text-center">Loading...</p>
     }
     <PokemonsMain>
        {pokemons.map((item,id)=>{
            return <Card key={"P-"+id} name={item.name} id={id} types={item.types} like={item.like}/>
        })}
     </PokemonsMain>
     
    </>
  )
}

export default App
