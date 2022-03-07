const arr = [];
function ProductReducer(state = arr, action) {
  switch (action.type) {
    case "GET_PRODUCT":
      return action.payload;
     
    default:
      return state;
  }
}
export default ProductReducer;
