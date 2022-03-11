const arr = [];
function unAcceptProductReducer(state = arr, action) {
  switch (action.type) {
    case "GET_UN_ACCEPTED_PRODUCT":
      return action.payload;
     
    default:
      return state;
  }
}
export default unAcceptProductReducer;
