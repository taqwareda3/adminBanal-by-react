const arr=[]
function getProductReducer(state=arr,action){
    switch (action.type) {
        case "GET_PRODUCTS":
            
           return action.payload
    default:
        return state
       
    }
}
export default getProductReducer