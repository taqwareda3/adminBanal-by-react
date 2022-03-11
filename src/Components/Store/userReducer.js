const arr = [];
function usersReducer(state = arr, action) {
  switch (action.type) {
    case "GET_SELLERS":
      return action.payload;
   

    default:
      return state;
  }
}
export default usersReducer;
