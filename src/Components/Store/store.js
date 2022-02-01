import { createStore } from "redux";
import getProductReducer from "./reducer"
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(getProductReducer,composeWithDevTools())
export default store;