const initial=[{name:'mo'}]
function AddCategoryReducer(state = initial, action) {
  switch (action.type) {
   
      case "Add-CATEGORY":
        return action.payload;

    default:
      return state;
  }
}
export default AddCategoryReducer;