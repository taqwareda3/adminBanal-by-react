import { db } from "../firebase-config";

import {
     collection,
     documentId,
     getDocs,
     query,
     setDoc,
     where,
} from "firebase/firestore";
import "firebase/database";
const putCategory = async () => {
     const Category = collection(db, "Category");
     const cat = await setDoc(Category);
     const CategoryDocs = cat.doc
          .map((index) => ({ ...index.data(), id: index.id }))


     console.log(CategoryDocs);
     return CategoryDocs;
};
const getCategory = async () => {
     const Category = collection(db, "Category");
     const cat = await getDocs(Category);
     const CategoryDocs = cat.docs
          .map((index) => ({ ...index.data(), id: index.id }))


     console.log(CategoryDocs);
     return CategoryDocs;
};
export function getCategoryData() {
     return (dispatch) => {
          getCategory()
               .then((cat) => dispatch({ type: "GET-CATEGORY", payload: cat }))

               .catch((err) => {
                    console.log(err);
               });
              
     };
}
export function putCategoryData() {
     return (dispatch) => {
               putCategory()
               .then((cat)=>dispatch({type:"POST-CATEGORY" , payload:cat}))
               .catch((err)=>{  console.log(err);})
     };
}
