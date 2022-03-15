import { db } from "../firebase-config";

import {
     collection,
     documentId,
     getDocs,
     query,
     where,
} from "firebase/firestore";
import "firebase/database";


const AddCategory = async (cateqory) => {
     const Category = collection(db, "Category");
     const cat = await getDocs(Category);
     const AddCategoryDoc = cat.add({
          ...cateqory,
         
     })

 
     console.log(AddCategoryDoc);
     return AddCategoryDoc;
};
export function AddToCategory() {
     return (dispatch) => {
          AddCategory()
               .then((cat) => dispatch({ type: "Add-CATEGORY", payload: cat }))

               .catch((err) => {
                    console.log(err);
               });
     };
}