import { Login, GetUserId, Logout } from "@/api/login.js";
const getDefaultState = () => {
  return localStorage.getItem("user")
    ? { user: JSON.parse(localStorage.getItem("user")) }
    : {
        user: {
          id: "",
          role: "",
          email: "",
          cookies: "",
          isLogin: false
        }
      };
};
const state = getDefaultState();
const actions = {
  setRole({ commit }, role) {
    commit("setRole", role);
  },
  setEmail({ commit }, email) {
    commit("setEmail", email);
  },
  setCookies({ commit }, cookies) {
    commit("setCookies", cookies);
  },
  setIsLogin({ commit }) {
    commit("setIsLogin");
  },
  async login({ commit }, [email, pwd]) {
    const result = await handleLoginResponse(commit, Login(email, pwd));
    return new Promise((resolve, reject) => {
      if (result) {
        commit("setEmail", email);
        commit("setIsLogin", true);

        localStorage.setItem("user", JSON.stringify(state.user));
        resolve();
      } else {
        // commit("resetCartState");
        reject("email or password error");
      }
    });
  },
  logout({ commit /*, dispatch*/ }) {
    localStorage.removeItem("user");
    // unmark to clean shooping cart after logout
    // localStorage.removeItem("cart");
    // dispatch("shoppingCart/resetCartState", null, { root: true });
    commit("reSetLoginState");
    Logout();
  }
};
const mutations = {
  SetId(state, id) {
    state.user.id = id;
  },
  setRole(state, role) {
    state.user.role = role;
  },
  setEmail(state, email) {
    state.user.email = email;
  },
  setCookies(state, cookies) {
    state.user.cookies = cookies;
  },
  setIsLogin(state, isLogin) {
    state.user.isLogin = isLogin;
  },
  reSetLoginState(state) {
    Object.assign(state, getDefaultState());
  }
};
const getters = {
  Id: state => state.user.id,
  Role: state => state.user.role,
  Email: state => state.user.email,
  Phpssid: state => state.user.cookies,
  IsLogin: state => state.user.isLogin,
  IsSeller: state => state.user.role === "seller"
};

const handleLoginResponse = async (commit, res) => {
  const userIdData = (await GetUserId()).data;
  const userId = userIdData.userno;
  let allCookies = document.cookie;
  const data = (await res).data;
  if (data.msg !== "success") return false;
  commit("setRole", data.userrole);
  commit("SetId", userId);
  commit("setCookies", allCookies);
  return true;
};

export default { namespaced: true, state, actions, mutations, getters };
