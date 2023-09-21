import React from 'react'
import ReactDOM from 'react-dom/client'
import { pokemonReducers } from './Reducer/pokemons.js'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
import App from './App.jsx'
import './index.css'
import { logger } from './Middleware/index.js'

const composeAlt= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
const composeEnhancers = composeAlt(
applyMiddleware(thunk,logger)
)
const store = createStore(pokemonReducers,composeEnhancers);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
)
