<template>
  <div class="nav" v-if="result">
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
export default {
  name: "compheader",
  data() {
    return {
      isAuth: ""
    };
  },
  methods: {
    Logout() {
      this.$store.dispatch("AUTH/logout");
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
.nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.nav li {
  float: left;
}

.nav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.nav li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04aa6d;
}
</style>
