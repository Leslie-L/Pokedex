import Card from "./Components/Cards"
import Header from "./Components/Header"
import Navigation from "./Components/Navigation"
import PokemonsMain from "./Layouts/PokemonsMain"

function App() {
  
  return (
    <>
     <Header/>
     <Navigation/>
     <PokemonsMain>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
     </PokemonsMain>
     
    </>
  )
}

export default App
