const arr=[]
function getProductReducer(state=arr,action){
    switch (action.type) {
        case "GET_PRODUCT":
            state=action.payload
           return state
    default:
        return state
       
    }
}
export default getProductReducer