import "./App.css";
import Navbar from "./Components/nav/NavBar";
import Sidebar from "./Components/sideBar/SideBar";
import SellersList from "./Components/sellers/SellersList";
import Product from "./Components/products/Product ";
import Dashboard from "./Components/dashboard/dashboard";
import SalesData from "./Components/chart/salesData";
import Users from "./Components/users/Users";
import Orders from "./Components/orders/orders";
import Products from "./Components/orders/Orderdetails";
import SellerRequest from "./Components/requests/sellerRequest";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcom from "./Components/welcomePage/Welcom";
import SellerDetails from "./Components/sellers/SellersDetails";
import Sales from "./Components/sales/sales "
import DeActivegetSellers from "./Components/sellers/DeActiveSeller"
import Category from "./Components/Category/category"
import { AddToCategory } from "./Components/Store/AddCategoryAction";
import ProductsList from "./Components/product/product";
import UnAcceptProductsList from "./Components/product/unAcceptPrd";
import ClientData from "./Components/Clientata/clientdata";
import CreateCategory from './Components/Category/CreatCategory'
import CategoryForm from './Components/Category/CategoryForm'
function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Navbar />
        <div className="row">
          <div className="col-lg-12">
            <Switch>
              <Route path="/SellersList" component={SellersList} />
              <Route path="/sellerslistdeactive" component={DeActivegetSellers} />
              <Route path="/Products" component={Product} />
              <Route path="/Sales" component={Sales} />
              <Route path="/Users" component={Users} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/orders" component={Orders} />
              <Route path="/sellerrequest" component={SellerRequest} />
              <Route path="/category" component={Category} />
              <Route path='/CatForm' component={CategoryForm} />
              <Route path='/CatFormEdit/:id' component={CategoryForm} />

              <Route path="CatAdd" component={CreateCategory} />
              <Route path="/addcategory" component={AddToCategory} />
              <Route path="/productlist" component={ProductsList} />
              <Route path="/unacceptprd" component={UnAcceptProductsList} />
              <Route path="/orderDetails/:id" component={Products} />

              <Route path="/SellerDetails/:id" component={SellerDetails} />
              <Route path='/salesDetails' component={SalesData} />
              <Route path='/client/:id' component={ClientData} />
              <Route path="" component={Welcom} />

            </Switch>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default App;
