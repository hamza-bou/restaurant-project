import { createStore } from "vuex";
import router from "../router/index";
import axios from "axios";

const state = {
  isUserLoggedIn: false,
  loggedInUserId: "",
  locationInfo: [],
  detailsCategories: [],
  oneCategoryDetails: [],
  foodsByLocationId:[],
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

  async getLocationInfo(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/Locations?userid=${payload.userid}&id=${payload.id}`
    );
    if (result.status === 200 && result.data.length > 0) {
      state.locationInfo = result.data;
    } else {
      this.commit("redirectTo", payload.redirectToPage);
    }
  },

  async getCategories(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/categories?userid=${payload.userid}&locationId=${payload.locationId}`
    );
    if (result.status === 200 && result.data.length > 0) {
      state.detailsCategories = result.data;
    } else {
      this.commit("redirectTo", payload.redirectToPage);
    }
  },

  async getCategoryById(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/categories?id=${payload.id}`
    );
    if (result.status === 200 && result.data.length > 0) {
      state.oneCategoryDetails = result.data;
    } else {
      this.commit("redirectTo", payload.redirectToPage);
    }
  },

  async getFoodsByLocationId(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/foods?locationId=${payload.locationId}`
    );
    if (result.status === 200 && result.data.length > 0) {
      state.foodsByLocationId = result.data;
    } else {
      this.commit("redirectTo", payload.redirectToPage);
    }
  },

  deleteFoodById(state, id) {
    state.foodsByLocationId = state.foodsByLocationId.filter((food) => food.id !== id);
  },
  
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
  deleteFood({ commit }, id) {
    commit('deleteFoodById', id);
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
