const arr = [];
function CategoryReducer(state = arr, action) {
  switch (action.type) {
   
      case "GET-CATEGORY":
        return action.payload;
        case "POST-CATEGORY":
          return action.payload;

    default:
      return state;
  }
}
export default CategoryReducer;