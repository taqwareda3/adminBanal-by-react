const arr = [];
function SellersRequestReducer(state = arr, action) {
  switch (action.type) {
    case "GET_SELLERS-REQUEST":
      return action.payload;
      
    default:
      return state;
  }
}
export default SellersRequestReducer;
