
  const arr=[] 
function getOrderDetailsReducer(state=arr,action){
    switch (action.type) {
        case "GET_ORDER_DETAILS":
            
           return action.payload
    default:
        return state
       
    }
}
export default getOrderDetailsReducer