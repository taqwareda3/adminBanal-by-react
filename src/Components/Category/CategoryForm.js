import React, { useState } from "react";
import {  putCategoryData } from "../Store/CateqoryAction";
import { db } from "../firebase-config";
import { useParams } from 'react-router-dom';
import {
     collection,
     documentId,
     doc,
     addDoc,
     getDocs,
     getDoc,
     query,
     setDoc,
     where,
} from "firebase/firestore";
import { async } from "@firebase/util";
function CategoryForm() {
 
  const [name, setname] = useState("");
  const [NameAr, setNameAr] = useState("");
  let { id } = useParams();

if(id !== undefined)
{
  const ref = doc(db,"Category",id)
  getDoc(ref).then((e)=>{
    setNameAr(e.data().NameAr)
    setname(e.data().name)

  })
}
  const newcat = async()=>{
if(id === undefined)
   { const collecref = collection(db,"Category")
    const payload={
      name:name,
      NameAr:NameAr
    }
    addDoc(collecref,payload)}
    if(id !== undefined)
    {
      
      const ref = doc(db,"Category",id)
      getDoc(ref)
     
      const payload={
        name:name,
        NameAr:NameAr
      }
       setDoc(ref,payload)
    }
  }
 
  const editcat = async()=>{
    
  }
  return (
    <>
      <form>
        <label>
          Category Name in English
          <input
            className="form-control"
            onChange={(e) => {
              setname(e.target.value);
            }}
            name="name"
            id="nameEN"
            value={name}
            type="text"
            placeholder="Category Name "
          />
        </label>
        <br />
        <label>
          Category Name in Arabic
          <input
            onChange={(e) => {
              setNameAr(e.target.value);
            }}
            id="nameAR"
            className="form-control"
            value={NameAr}
            name="NameAr"
            type="text"
            placeholder="Category Name "
          />
        </label>
        <br></br>
        <button
          type="button"
          name=""
          onClick={() => {
            document.getElementById('nameEN').value=""
            document.getElementById('nameAR').value=""
newcat()
          }}
          id=""
          className="btn btn-primary"
        >
          SAVE
        </button>
      </form>
    </>
  );
}
export default CategoryForm;
