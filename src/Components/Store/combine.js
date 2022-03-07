import { combineReducers } from "redux";
import OrderDetailsReducer from './OrderDetailsReducer'
import OrdersReducer from './OrdersReducer'
import ProductsReducer from "./ProductsReducer"
import SellersReducer from "./SellerReducer";
import DeActiveSellersReducer from "./DeActiveSellerRed";
import BestProducts from "./BestProductsReducer";
import SellersRequestReducer from "./sllerReqreducer";
import CategoryReducer from "./CategoryReducer";
import AddCategoryReducer from "./AddCatReducer";
import ProductReducer from "./productreducer";
import unAcceptProductReducer from "./unAcceptedPrdRed";
export default combineReducers({
    order_details:OrderDetailsReducer,
    orders:OrdersReducer,
    products:ProductsReducer,
    seller:SellersReducer,
    deActiveSeller:DeActiveSellersReducer,
    sellerRequest:SellersRequestReducer,
    product:ProductReducer,
    unAcceptPrd:unAcceptProductReducer,
    best_products:BestProducts,
    category:CategoryReducer,
    AddCategory:AddCategoryReducer
})