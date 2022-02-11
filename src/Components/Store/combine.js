import { combineReducers } from "redux";
import OrderDetailsReducer from './OrderDetailsReducer'
import OrdersReducer from './OrdersReducer'
import ProductsReducer from "./ProductsReducer"
export default combineReducers({
    order_details:OrderDetailsReducer,
    orders:OrdersReducer,
    products:ProductsReducer
})