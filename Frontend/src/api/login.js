import axios from "axios";

export const Login = async function(email, password) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("request", "login");
  try {
    const response = await axios.post("/php/login.php", formData);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const GetUserId = async () => {
  const formData = new FormData();
  formData.append("request", "getuserno");
  try {
    const response = await axios.post("/php/login.php", formData);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const Logout = async () => {
  const formData = new FormData();
  formData.append("request", "logout");
  try {
    const response = await axios.post("/php/login.php", formData);
    return response;
  } catch (err) {
    console.log(err);
  }
};
