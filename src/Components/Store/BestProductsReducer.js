const arr = [];
function BestProductsReducer(state = arr, action) {
  switch (action.type) {
    case "GET_BEST_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
}
export default BestProductsReducer;