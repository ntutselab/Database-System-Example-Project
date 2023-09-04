import store from "@/store";
import axios from "axios";

export const GetCoupon = async () => {
  const userId = store.getters["login/Id"];
  const formData = new FormData();
  formData.append("request", "getcoupon");
  formData.append("userno", userId);
  try {
    const response = await axios.post("/php/shoppingCart.php", formData);
    return response;
  } catch (err) {
    return console.log(err);
  }
};

export const Checkout = async productIds => {
  const userId = store.getters["login/Id"];
  const totalPrice = store.getters["shoppingCart/CartTotalPrice"];
  const coupon = store.getters["shoppingCart/SelectedCoupon"];
  const formData = new FormData();
  formData.append("request", "purchaseshoppingcart");
  formData.append("userno", userId);
  formData.append("total", totalPrice);
  formData.append("couponid", coupon ? coupon.ID : "");
  formData.append("productIDs", JSON.stringify(productIds));
  try {
    const response = await axios.post("/php/shoppingCart.php", formData);
    return response;
  } catch (err) {
    console.log(err);
  }
};
