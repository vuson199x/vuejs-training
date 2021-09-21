<template>
  <div class="nav" v-if="cookies">
    <!-- {{ user.id }} -->
    <ul>
      <li>
        <router-link to="/" active-class="active" exact="">Home</router-link>
      </li>
      <li>
        <router-link
          :to="`/tags/${result ? result.id : 1}`"
          active-class="active"
          >Tags</router-link
        >
      </li>
      <li>
        <router-link
          :to="`/category/${result ? result.id : 1}`"
          active-class="active"
          >Category</router-link
        >
      </li>
      <li>
        <router-link
          :to="`/product/${result ? result.id : 1}`"
          active-class="active"
          >Product</router-link
        >
      </li>
      <li style="float: right" active-class="active" v-on:click="Logout">
        <router-link to="/login">Đăng xuất</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { SESSION_ID } from "../utils/contants";

export default {
  name: "compheader",
  data() {
    return {
      cookies: Cookies.get(SESSION_ID)
    };
  },
  methods: {
    Logout() {
      Cookies.set(SESSION_ID, "");
      console.log("12312312312313");
    }
  },
  computed: {
    result() {
      return this.$store.state.AUTH.user;
    }
  }
};
</script>

<style>
/* .nav {
  background: red;
} */
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04aa6d;
}
</style>
