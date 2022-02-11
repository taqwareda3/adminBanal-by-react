const arr=[]
function OrdersReducer(state=arr,action){
    switch (action.type) {
        case "GET_ORDERS":
            
           return action.payload
    default:
        return state
       
    }
}
export default OrdersReducer