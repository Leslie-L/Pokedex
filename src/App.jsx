import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Pokemon from './Pages/Pokemon';
function App() {
  return(
  <HashRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pokemon' element={<Pokemon/>}/>
    </Routes>
  </HashRouter>
  )
}
export default App;