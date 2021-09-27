<template>
  <div class="login-container">
    <div class="form-section">
      <div class="tabs-form">
        <div v-on:click="handleLogin" v-bind:class="{ active: isActive === 0 }">
          <p>Đăng nhập</p>
        </div>
        <div
          v-on:click="handleRegister"
          v-bind:class="{ active: isActive === 1 }"
        >
          <p>Đăng ký</p>
        </div>
      </div>
      <div class="login-form" v-if="isActive === 0">
        <h1>Đăng nhập</h1>
        <form @submit.prevent="login">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required />
          </div>
          <button>Đăng nhập</button>
        </form>
      </div>
      <div class="login-form" v-if="isActive === 1">
        <h1>Đăng ký</h1>
        <form @submit.prevent="register">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required />
          </div>
          <div>
            <label for="adđress">Địa chỉ</label>
            <input id="adđress" type="text" v-model="title" required />
          </div>
          <button>Đăng ký</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      title: "",
      isActive: 0
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

      // this.$router.push("/");
    },
    register() {
      console.log("this.username", this.username);
      console.log("this.password", this.password);
      this.$store.dispatch("AUTH/register", {
        username: this.username,
        password: this.password,
        title: this.title
      });
      this.isActive = 0;
      this.username = "";
      this.password = "";
      // this.$router.push("/");
    },
    handleLogin() {
      this.isActive = 0;
      this.username = "";
      this.password = "";
    },
    handleRegister() {
      this.isActive = 1;
      this.username = "";
      this.password = "";
    }
  },
  computed: {
    result() {
      return this.$store.state.AUTH.user;
    }
  }
};
</script>

<style lang="css" scoped src="./index.css"></style>
