import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import products from "./modules/products";
import shoppingCart from "./modules/shoppingCart";
import wallet from "./modules/walletProfit";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { login, products, shoppingCart, wallet }
});
