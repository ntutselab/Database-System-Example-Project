import axios from "axios";

export const GetOrders = async () => {
  const formData = new FormData();
  formData.append("request", "getorderno");
  try {
    const response = await axios.post("/php/processorder.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const GetOrderInformation = async orderId => {
  const formData = new FormData();
  formData.append("request", "processorder");
  formData.append("orderno", orderId);
  try {
    const response = await axios.post("/php/processorder.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateOrder = async orderId => {
  const formData = new FormData();
  formData.append("request", "updateorder");
  formData.append("orderno", orderId);
  try {
    const response = await axios.post("/php/processorder.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const GetSalesAmount = async orderId => {
  const formData = new FormData();
  formData.append("request", "getsalesamount");
  formData.append("orderno", orderId);
  try {
    const response = await axios.post("/php/processorder.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateSalesAmount = async (productId, amount) => {
  const formData = new FormData();
  formData.append("request", "updatesalesamount");
  formData.append("productID", productId);
  formData.append("amount", amount);
  try {
    const response = await axios.post("/php/processorder.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
