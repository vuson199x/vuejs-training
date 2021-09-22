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
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/tags/:id",
    name: "Tags",
    component: Tags
  },
  {
    path: "/tags/:userId/:tagId",
    name: "TagDetail",
    component: TagDetail
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category
  },
  {
    path: "/category/:userId/:categoryId",
    name: "CategoryDetail",
    component: CategoryDetail
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product
  },
  {
    path: "/product/:userId/:productId",
    name: "ProductDetail",
    component: ProductDetail
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
const cookie = Cookies.get(SESSION_ID);
router.beforeEach((to, from, next) => {
  console.log(to, "to");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "login",
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
