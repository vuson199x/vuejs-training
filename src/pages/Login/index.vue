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
            <input id="username" type="text" v-model="username" />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" />
          </div>
          <button>Đăng nhập</button>
        </form>
      </div>
      <div class="login-form" v-if="isActive === 1">
        <h1>Đăng ký</h1>
        <form @submit.prevent="register">
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" />
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" />
          </div>
          <div>
            <label for="adđress">Địa chỉ</label>
            <input id="adđress" type="text" v-model="title" />
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

      this.$router.push("/");
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

<style>
.login-container {
  display: flex;
  justify-content: center;
}

.tabs-form {
  display: flex;
  /* justify-content: space-around; */
  border-bottom: 1px solid #c8c3c3;
}
.tabs-form div {
  width: 50%;
}

.tabs-form p {
  cursor: pointer;
  text-align: center;
}

.tabs-form .active {
  background: #04aa6d;
  color: #fff;
}

.form-section {
  width: 500px;
  margin-top: 3rem;
  border: 1px solid #c8c3c3;
}

.login-form {
  padding: 20px;
}

.login-form h1 {
  font-weight: 600;
  text-align: center;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
}

.login-form button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

.login-form button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

.container {
  padding: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
