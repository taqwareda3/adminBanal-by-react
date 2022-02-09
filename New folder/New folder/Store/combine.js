import { combineReducers } from "redux";
import getOrderDetailsReducer from './reducerGetOrderDetails'
import getProductReducer from './reducer'
export default combineReducers({
    order_details:getOrderDetailsReducer,
    orders:getProductReducer
})