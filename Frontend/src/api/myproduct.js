import axios from "axios";

export const Getmyproduct = async () => {
  const formData = new FormData();
  formData.append("request", "getmyproduct");
  try {
    const response = await axios.post("/php/myproduct.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const OffProduct = async productId => {
  const formData = new FormData();
  formData.append("request", "offproduct");
  formData.append("productID", productId);
  try {
    const response = await axios.post("/php/myproduct.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const LaunchProduct = async productId => {
  const formData = new FormData();
  formData.append("request", "launchproduct");
  formData.append("productID", productId);
  try {
    const response = await axios.post("/php/myproduct.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const UploadFile = async fileObj => {
  const formData = new FormData();
  formData.append("image", fileObj);
  try {
    const response = await axios.post("/php/uploadFile.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const PublishProduct = async product => {
  const formData = new FormData();
  formData.append("request", "publish");
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("category", product.category);
  formData.append("description", product.description);
  formData.append("inventory", product.inventory);
  formData.append("link", product.imageLink);
  try {
    const response = await axios.post("/php/publish.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const Replenishment = async (product, inventory) => {
  const formData = new FormData();
  formData.append("request", "replenishment");
  formData.append("productID", product.id);
  formData.append("inventory", inventory);
  try {
    const response = await axios.post("/php/myproduct.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
