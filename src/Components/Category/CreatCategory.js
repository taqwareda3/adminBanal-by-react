import { connect } from "react-redux";

const CreateCategory = () => {
   var  category={
          name:'',
          NameAr:''
     }
let handleChangeEN=(e)=>{
   e.preventDefult();
     this.category({
          [e.target.value]:category.name
     })
}
let handleChangeAR=(e)=>{
     e.preventDefult();
       this.category({
            [e.target.value]:category.NameAr
       })
  }
let handleSubmit=(e)=>{
     e.preventDefult();
     this.props.CreateCategory(this.category) 
}
     return ( <>
     <form onSubmit={this.handleSubmit} className="white">
      <h5 className="grey-text text-darken-3">Add New Cateqory</h5>
      <div className="input-field">
      <label htmlFor="name">name in English</label>
      <input type="text" id="nameEN" onChange={this.handleChangeEN}/>
      <label htmlFor="name">name in Arabic</label>
      <input type="text" id="nameAR" onChange={this.handleChangeAR}/>
      </div>
     </form>
     </> );
}
const mapDispatchProps=(dispatch)=>{
     return{
          CreateCategory:(project)=>dispatch(CreateCategory(project))
     }
}
 
export default connect(null,mapDispatchProps)(CreateCategory);
