const arr = [];
function CategoryReducer(state = arr, action) {
  switch (action.type) {
   
      case "GET-CATEGORY":
        return action.payload;

    default:
      return state;
  }
}
export default CategoryReducer;