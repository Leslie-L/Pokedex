import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { store } from './Store/store.js'
import App from './App.jsx'
import './index.css'

//const composeAlt= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
/*const composeEnhancers = composeAlt(
applyMiddleware(thunk,logger)
)*/
//const store = createStore(pokemonReducers,composeEnhancers);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
)
