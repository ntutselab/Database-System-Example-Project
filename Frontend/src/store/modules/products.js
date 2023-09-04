import { GetProductsByCategory } from "../../api/home";

const state = {
  items: []
};

const actions = {
  async getAllItems({ commit }, category) {
    const items = (await GetProductsByCategory(category)).data.data;
    items.forEach(item => {
      item.Inventory = parseInt(item.Inventory);
    });
    commit("setItems", items);
  }
};

const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  decrementProductInventory(state, { ID }) {
    const item = state.items.find(item => item.id === ID);
    item.Inventory--;
  }
};

const getters = {
  Items() {
    return state.items;
  }
};

export default { namespaced: true, state, actions, mutations, getters };
