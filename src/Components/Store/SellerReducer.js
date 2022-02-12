const arr = [];
function SellersReducer(state = arr, action) {
  switch (action.type) {
    case "GET_SELLERS":
      return action.payload;
    // case "GET_FILTER_SELLERS":
    //   return action.payload;
    //   case "GET_PAGINATE_SELLERS":
    //   return action.payload;

    default:
      return state;
  }
}
export default SellersReducer;
