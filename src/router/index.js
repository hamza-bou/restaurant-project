import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import ErrorPage from "../views/ErrorPage.vue";
import UpdateLocation from "../components/Locations/UpdateLocation.vue";
import Menu from "../components/Menu/Menu.vue";
import AddCategory from "../components/Menu/AddCategory.vue";
import ViewCategories from '../components/Menu/ViewCategories.vue';
import AddItem from "../components/Menu/AddItem.vue";
import updateItem from "../components/Menu/UpdateItem.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
  {
    path: "/UpdateLocation/:locationId",
    name: "UpdateLocation",
    component: UpdateLocation,
  },
  {
    path: "/menu/:locationId",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/menu/:locationIdIs/addCategory",
    name: "AddCategory",
    component: AddCategory
  },
  {
    path: "/menu/:locationIdIs/ViewCategories",
    name: "ViewCategories",
    component: ViewCategories
  },
  {
    path: "/menu/:idcategory/addItem",
    name: "AddItem",
    component: AddItem
  },
  {
    path: "/menu/:idItem/updateItem",
    name: "updateItem",
    component: updateItem
  },
  
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
