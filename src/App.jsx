import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getPokemonsWithDitails, setPokemons } from "./Actions"
import Card from "./Components/Cards"
import Header from "./Components/Header"
import Navigation from "./Components/Navigation"
import PokemonsMain from "./Layouts/PokemonsMain"
import { getPokemonInfo, getPokemons } from "./API/getData"

function App() {
  const pokemons = useSelector(state=>state.pokemons)
  const dispatch = useDispatch()
  useEffect(()=>{
      const result =  async ()=>{
        const call = await getPokemons();
        dispatch(getPokemonsWithDitails(call))
      }
      result();
  },[])
  
  return (
    <>
     <Header/>
     <Navigation/>
     <PokemonsMain>
        {pokemons.map((item,id)=>{
            return <Card key={"P-"+id} name={item.name} id={id} types={item.types}/>
        })}
     </PokemonsMain>
     
    </>
  )
}

export default App
