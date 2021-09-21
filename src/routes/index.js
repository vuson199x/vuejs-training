import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages";
import Tags from "../pages/Tags";
import Category from "../pages/Category";
import Login from "../pages/Login";
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
    path: "/category/:id",
    name: "Category",
    component: Category
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  // base: ,
  routes
});

router.beforeEach((to, from, next) => {
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
