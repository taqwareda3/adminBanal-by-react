import { db } from "../firebase-config";

import {
     collection,
     documentId,
     getDocs,
     query,
     where,
} from "firebase/firestore";
import "firebase/database";
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