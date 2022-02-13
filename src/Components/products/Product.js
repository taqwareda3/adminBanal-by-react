import { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import "./Products.css";
import {collection, doc,deleteDoc, getDocs} from 'firebase/firestore'



const Product = () => {
  const [Product, setProduct] = useState([]);
  const [FilterDocs, setFilterDocs] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(7);
  const [pages, setPages] = useState([])
  const [CurrPage, setCurrPage] = useState(1)
  
 
  const ProductsCollectionRef= collection(db,"Products")
  const indexOfLastProd = CurrPage * itemPerPage;
  const indexOfFirstProd =  indexOfLastProd - itemPerPage;
  const currentDocs = FilterDocs.slice(
    indexOfFirstProd,
    indexOfLastProd
  );

  const getData = async () => {
    const data = await getDocs(ProductsCollectionRef);
    setProduct(data.docs.map((index) => ({ ...index.data(), id: index.id })));
    setFilterDocs(
      data.docs.map((index) => ({ ...index.data(), id: index.id }))
    );
    paginate(

      data.docs.map((index) => ({ ...index.data(), id: index.id }))

    )
  };

 

  const paginate = (items) => {
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers)

  }
 
  const goToPage = (page) => {
    console.log("click pge", page);
    setCurrPage(page)

  }

  useEffect(() => {
    getData();
  }, []);

  
  const deleteProd = async (id) => {
    const prodDoc = doc(db, "Products", id);
    await deleteDoc(prodDoc);
    getData();
  };
  return (

    
  <div class="row mb-5">
        <div className="col-lg-12 col-md-6 col-sm-12 mb-5">
          
        <h5 className="mt-3 mb-3 text-secondary">
          Products thats shown in your site...
            
          </h5>

        
          <div className="table-responsive ">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                <th>Product Category</th>
                  <th>Product name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {currentDocs &&
              currentDocs.length >= 1 &&currentDocs.map((product) => {
                     return( 
                     <tr key={product.id}>
                         <td>{product.Category}</td>
                        <td>{product.Name}</td>
                        <td>{product.Price}</td>
                        <td>{product.Quantity}</td>
                        <td> {product.Description} {product.Dimensions} {product.Size}</td>
                        <td><img className="prodImg w-2" alt={product.Name} src={product.Image}/></td>
                        <td><button 
                        type="submit"
                         onClick={() => {
                          deleteProd(product.id);
                        }}
                        className="btn btn-danger">Remove</button></td>

                      </tr>
                      )
                })}
              
                
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
        <nav aria-label="Page navigation  example">
            <ul className="pagination cursor pagination pagination-lg">
              {pages && pages.length > 1 && pages.map(el =>
                <li className={`page-item ${CurrPage === el ? 'active' : ''}`}><a className="page-link" onClick={() => goToPage(el)}>{el}</a></li>
              )}

            </ul>
          </nav>
        </div>
        </div>

)}
export default Product;