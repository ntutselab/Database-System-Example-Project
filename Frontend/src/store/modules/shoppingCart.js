import { GetCoupon, Checkout } from "@/api/shoopingCart";
import { UpdateWallet } from "@/api/walletOrProfit";

const getDefaultState = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { items: [], coupons: [] };
  return {
    // item: [{ id, quantity }]
    items: cart.items,
    coupons: cart.coupons,
    selectedCoupon: null,
    checkoutStatus: null,
    errorMessage: ""
  };
};

const state = getDefaultState();

const actions = {
  resetCartState({ commit }) {
    commit("resetCartState");
  },
  addProductToCart({ state, commit }, product) {
    commit("setCheckoutStatus", null);
    if (product.Inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.ID);
      if (!cartItem) {
        commit("pushProductToCart", {
          id: product.ID,
          inventory: product.Inventory
        });
      } else {
        commit("incrementItemQuantity", cartItem);
      }
      // remove 1 item from stock
      // commit(
      //   "products/decrementProductInventory",
      //   { id: item.ID },
      //   { root: true }
      // );
    }
  },
  async GetCoupon({ commit }) {
    const coupones = (await GetCoupon()).data.data;
    coupones.forEach(coupon => {
      coupon.Amount = parseInt(coupon.Amount);
    });
    commit("SetCoupons", coupones);
  },
  async Checkout({ state, commit, getters, rootState, dispatch }) {
    Checkout(state.items).then(() => {
      UpdateWallet(rootState.wallet.wallet.value - getters.CartTotalPrice);
      dispatch("wallet/init", null, { root: true });
      commit("CleanShoopingCart");
      commit("resetCartState");
    });
  }
};

const mutations = {
  resetCartState(state) {
    Object.assign(state, getDefaultState());
  },
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },
  pushProductToCart(state, { id, inventory }) {
    state.items.push({
      id,
      inventory,
      quantity: 1
    });
    localStorage.setItem("cart", JSON.stringify(state));
  },
  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    if (cartItem.inventory > cartItem.quantity) cartItem.quantity++;
    localStorage.setItem("cart", JSON.stringify(state));
  },
  decrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity--;
    localStorage.setItem("cart", JSON.stringify(state));
  },
  remoItemFromShoopingCart(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    state.items.splice(state.items.indexOf(cartItem), 1);
    localStorage.setItem("cart", JSON.stringify(state));
  },
  SetCoupons(state, coupons) {
    state.coupons = coupons;
    localStorage.setItem("cart", JSON.stringify(state));
  },
  CleanShoopingCart(state) {
    state.items.length = 0;
    localStorage.setItem("cart", JSON.stringify(state));
  },
  SetSelectedCoupon(state, coupon) {
    state.selectedCoupon = coupon;
  }
};

const getters = {
  CartItems: (state, getters, rootState) => {
    if (rootState.products.items.length <= 0) return [];
    return state.items.map(({ id, quantity, inventory }) => {
      const product = rootState.products.items.find(item => item.ID === id);
      if (product)
        return {
          id: product.ID,
          title: product.Name,
          price: product.Price,
          imageUrl: product.ImageURL,
          quantity,
          inventory
        };
    });
  },
  CartTotalPrice: (state, getters) => {
    if (getters.CartItems.length === 0) return 0;
    const discont = state.selectedCoupon ? state.selectedCoupon.Amount : 0;
    return (
      getters.CartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0) - discont
    );
  },
  GetItemSubTotal: () => item => {
    return item.price * item.quantity;
  },
  CartItemLength: state => {
    return state.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  },
  Coupons: state => state.coupons,
  SelectedCoupon: state => state.selectedCoupon,
  IsCouponCanUse: (state, getters) => coupon => {
    return getters.CartTotalPrice - (coupon ? coupon.Amount : 0) >= 0;
  },
  IsCanCheckout: (state, getters, rootState, rootGetters) => {
    state.errorMessage = "Insufficient balance";
    return rootGetters["wallet/GetWallet"].value - getters.CartTotalPrice >= 0;
  },
  ErrorMessage: state => state.errorMessage
};

export default { namespaced: true, state, actions, mutations, getters };
