const arr = [];
function DeActiveSellersReducer(state = arr, action) {
  switch (action.type) {
   
      case "GET_DEACTIVE_SELLERS":
        return action.payload;

    default:
      return state;
  }
}
export default DeActiveSellersReducer;