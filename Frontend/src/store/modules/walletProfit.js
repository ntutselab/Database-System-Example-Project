import { GetwalletOrProfit, Deposit } from "@/api/walletOrProfit";

const state = {
  wallet: {},
  isUpdateSuccess: false
};
const actions = {
  init: ({ commit }) => {
    GetwalletOrProfit().then(response => {
      commit("setWallet", response);
      commit("setIsUpdateSuccess", true);
    });
  },
  UpdateWallet: ({ commit, dispatch }, value) => {
    Deposit(value)
      .then(() => {
        dispatch("init");
      })
      .catch(err => {
        commit("setIsUpdateSuccess", false);
        console.log(err);
      });
  }
};
const mutations = {
  setWallet: (state, value) => {
    state.wallet = value;
  },
  setIsUpdateSuccess: (state, value) => {
    state.isUpdateSuccess = value;
  }
};
const getters = {
  GetWallet: state => state.wallet,
  IsUpdateSuccess: state => state.isUpdateSuccess
};

export default { namespaced: true, state, actions, mutations, getters };
