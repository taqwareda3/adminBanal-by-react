function getOrderDetails(data) {
  return {
    type: "GET_ORDER_DETAILS",
    payload: data,
  };
}
export default getOrderDetails;
