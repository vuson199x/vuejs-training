<template>
  <div>
    <h1>Dang nhap</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button>Đăng nhập</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.log("this", this);
      console.log("login function");
      this.$store.dispatch("AUTH/login", {
        username: this.username,
        password: this.password
      });
    }
  }
  // data () {
  //   return {
  //     msg: 'Welcome to Your Vue.js App'
  //   }
  // },
};
</script>

<style></style>
