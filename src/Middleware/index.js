export const logger = (store)=>(next)=>(action)=>{

    next(action)
}

export const featuring = (store)=>(next)=>(action)=>{
    const featured = [{name:'eddie'},...action.action.payload];
    const updateInfo ={
        ...action,
        action:{...action.action,payload:featured}
    }
    next(updateInfo)
}