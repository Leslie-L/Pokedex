/*export const logger = (store)=>(next)=>(action)=>{
    console.log("1",store.getState().favorites.favorites)
    next(action)
    console.log("2",action)
}*/

export const saveData = (store)=>(next)=>(action)=>{
    if(action.type!=='favorite/addFavorite' || action.type!=='favorite/addFavorite' )
        return next(action)
    
    next(action)
    window.localStorage.setItem('__pokemonsFavsV0__',JSON.stringify(store.getState().favorites.favorites))
      
}

/*
export const featuring = (store)=>(next)=>(action)=>{
    const featured = [{name:'eddie'},...action.action.payload];
    const updateInfo ={
        ...action,
        action:{...action.action,payload:featured}
    }
    next(updateInfo)
}*/