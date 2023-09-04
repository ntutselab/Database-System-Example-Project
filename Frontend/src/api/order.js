import axios from "axios";

export const GetOrdersRecord = async userId => {
  const formData = new FormData();
  formData.append("request", "checkOrderRecord");
  formData.append("userno", userId);
  try {
    const response = await axios.post("/php/orderrecord.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const GetOrderItems = async orderId => {
  const formData = new FormData();
  formData.append("request", "getOrderlist");
  formData.append("orderno", orderId);
  try {
    const response = await axios.post("/php/orderrecord.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
