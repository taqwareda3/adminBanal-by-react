 const UpdateOrderState = (arr) => {
    let result= arr.filter((e) => {
      return e.deliveredstatus == "delivered";
    });
   
    if (result.length == arr.length) {
      return true;
    } else {
      return false;
    }
  };
  export default  UpdateOrderState