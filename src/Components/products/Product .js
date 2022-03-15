import { useEffect, useRef, useState } from "react";
import { db } from "./../firebase-config";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import{getProducts} from "../Store/ProductsAction";

import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "../Dialoge/dialog";
import'./../style/style.css'

import {
  collection, 
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  QuerySnapshot,
} from "firebase/firestore";

const Product = () => {
  const [Product, setProduct] = useState([]);
  const [FilterDocs, setFilterDocs] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [pages, setPages] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);
  const [selects, setSelects] = useState();
  const [search, setSearch] = useState();
  const ProductsCollectionRef = collection(db, "Products");
  const indexOfLastProd = CurrPage * itemPerPage;
  const indexOfFirstProd = indexOfLastProd - itemPerPage;
  const currentDocs = FilterDocs.slice(indexOfFirstProd, indexOfLastProd);
//get data 
  const getData = async () => {
    const data = await getDocs(ProductsCollectionRef);
    setProduct(data.docs.map((index) => ({ ...index.data(), id: index.id })));
    setFilterDocs(
      data.docs.map((index) => ({ ...index.data(), id: index.id }))
    );
    paginate(data.docs.map((index) => ({ ...index.data(), id: index.id })));
  };
//model that shown when delete
const [deleteDialog,setDeleteDialog]=useState({
  message: "",
  isLoading: false,
});
const idDeleteProd = useRef();
const handleDeleteDialoag = (message, isLoading) => {
  setDeleteDialog({
    message,
    isLoading,
  });
};
const areUSureDelete=async(choose)=>{
  if(choose){
    const deleteProd = doc(db, "Products", idDeleteProd.current);
  await deleteDoc(deleteProd);
  if (currentDocs.length === 1 && CurrPage !== 1) {
    setCurrPage(CurrPage - 1);
  }
  dispatch(getData());
  handleDeleteDialoag("", false);
} else {
  handleDeleteDialoag("", false);
}
}
  const try1 = async (c) => {
    const x =  query(ProductsCollectionRef, where("Category", "==", selects));
    const querySnapshot = await getDocs(x);
   let data = querySnapshot.forEach((doc) => {
     console.log(doc.data());
    });
    setFilterDocs(data);
    setCurrPage(1);
    paginate(data);
  };

  const paginate = (items) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);
  };

  const goToPage = (page) => {
    console.log("click pge", page);
    setCurrPage(page);
  };
  const dispatch = useDispatch();

 useEffect(() => {
  getData();
}, []);
 

  //delete
 

  
  const deleteProd = async (id) => {
    handleDeleteDialoag("Are U Sure To Delete", true);
    idDeleteProd.current=id;
    // const prodDoc = doc(db, "Products", id);
    // await deleteDoc(prodDoc);
    // getData();
  };
  return (
    <div className="row mb-5">
      <div className="col-lg-12 col-md-6 col-sm-12 mb-5">
        <h5 className="mt-3 mb-3 text-secondary">
          Products thats shown in your site...
        </h5>
        <div>
          <div className="form-group">
           
            <div className="col-lg-12 col-md-4 col-sm-12 ">
           
              <input
               
                onChange={(e) => {
                  setSearch(e.target.value);
                 // console.log(e.target.value);
                  let data = Product;
                 // console.log("data");

                  if (e.target.value) {
                    data =
                      Product &&
                      Product.length > 1 &&
                      Product.filter(
                        (el) =>
                          el["Name"].toLowerCase().includes(e.target.value.toLowerCase()) ||
                          el["Category"].toLowerCase().includes(e.target.value.toLowerCase()) 
                      );
                   // console.log(data);
                  }
                  setFilterDocs(data);
                  setCurrPage(1);
                  paginate(data);
                }}
                type="search"
                className="form-control"
                placeholder=" Search for Product By Name or Category ..."
                aria-label="search"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>

         
        </div>

        <div className="table-responsive text-center main">
          <table className="table table-hover ">
            <thead className="thead-light">
              <tr >
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentDocs &&
                currentDocs.length >= 1 &&
                currentDocs.map((product) => {
                  return (
                    <tr key={product.id}
                    className={`${product.Quantity < 10 ? "table-warning":""} ${product.Quantity===0? "table-danger":""}`}                   >
                      <td>{product.Category}</td>
                      <td>{product.Name}</td>
                      <td>{product.Price}</td>
                      <td>{product.Quantity}</td>
                      <td>
                        {" "}
                        {product.Description} {product.Dimensions}{" "}
                        {product.Size}
                      </td>
                      <td>
                        <img
                          className="prodImg w-2"
                          alt={product.Name}
                          src={product.Image}
                        />
                      </td>
                     <td>
                     {deleteDialog.isLoading && (
                            <Dialog
                              onDialog={areUSureDelete}
                              message={deleteDialog.message}
                            />
                          )}
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteProd(product.id)}
                          >
                            {" "}
                            DELETE
                          </button> 
                     </td>
                      
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <nav aria-label="Page navigation  example">
          <ul className="pagination cursor pagination pagination-lg">
            {pages &&
              pages.length > 1 &&
              pages.map((el) => (
                <li className={`page-item ${CurrPage === el ? "active" : ""}`}>
                  <a className="page-link" onClick={() => goToPage(el)}>
                    {el}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Product;
