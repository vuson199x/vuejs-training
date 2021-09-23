import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages";
import Tags from "../pages/Tags";
import Category from "../pages/Category";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Error from "../pages/404page";
import CategoryDetail from "../pages/Category/components/CategoryDetail";
import ProductDetail from "../pages/Product/components/ProductDetail";
import TagDetail from "../pages/Tags/components/TagDetail";
import Cookies from "js-cookie";
import { SESSION_ID } from "../utils/contants";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/tags/:id",
    name: "Tags",
    component: Tags,
    meta: { requiresAuth: true }
  },
  {
    path: "/tags/:userId/:tagId",
    name: "TagDetail",
    component: TagDetail,
    meta: { requiresAuth: true }
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    meta: { requiresAuth: true }
  },
  {
    path: "/category/:userId/:categoryId",
    name: "CategoryDetail",
    component: CategoryDetail,
    meta: { requiresAuth: true }
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
    meta: { requiresAuth: true }
  },
  {
    path: "/product/:userId/:productId",
    name: "ProductDetail",
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/404page",
    name: "404page",
    component: Error
  },
  {
    path: "*",
    redirect: "/404page"
  }
];

const router = new VueRouter({
  mode: "history",
  // base: ,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(
    "to",
    to.matched.some(record => record.meta.requiresAuth)
  );
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("store", store.state.AUTH.user);
    if (!store.state.AUTH.user) {
      console.log("123123123123 89 router");
      next({
        name: "Login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
