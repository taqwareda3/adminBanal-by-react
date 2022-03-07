import { connect } from "react-redux";

const CreateCategory = () => {
     category={
          name:''
     }
handleChange=(e)=>{
   e.preventDefult();
     this.category({
          [e.target.value]:e.target.value
     })
}
handleSubmit=(e)=>{
     e.preventDefult();
     this.props.CreateCategory(this.category) 
}
     return ( <>
     <form onSubmit={this.handleSubmit} className="white">
      <h5 className="grey-text text-darken-3">Add New Cateqory</h5>
      <div className="input-field">
      <label htmlFor="name">name</label>
      <input type="text" id="name" onChange={this.handleChange}/>
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