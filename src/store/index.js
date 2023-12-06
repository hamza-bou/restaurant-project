import { createStore } from "vuex";
import router from "../router/index";
import axios from "axios";

const state = {
  isUserLoggedIn: false,
  loggedInUserId: "",
  numOfCategories: 0,
  listOfCategories: [],
  locationInfo:[],
};
const getters = {};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  inLoggedInUser(state) {
    const user = localStorage.getItem("userinfo");
    if (user) {
      state.isUserLoggedIn = true;
      state.loggedInUserId = JSON.parse(user).id;
    } else {
      state.isUserLoggedIn = false;
    }
  },

  async getCategories(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/categories?userid=${payload.userid}&locationId=${payload.locationId}`
    );
    if (result.status === 200) {
      state.listOfCategories = result.data;
      state.numOfCategories = state.listOfCategories.length;
    }
  },

  async getLocationInfo (state, payload) {
    let result = await axios.get(`http://localhost:3000/Locations?userid=${payload.userid}&id=${payload.id}`);
    if (result.status === 200 && result.data.length > 0) {
      state.locationInfo = result.data;   
    }else{
      this.commit("redirectTo", payload.redirectToPage);
    }
  }
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
};
const modules = {};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
});
