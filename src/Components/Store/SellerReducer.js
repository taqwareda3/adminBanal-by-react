const arr = [];
function SellersReducer(state = arr, action) {
  switch (action.type) {
    case "GET_SELLERS":
      return action.payload;
     
    default:
      return state;
  }
}
export default SellersReducer;
