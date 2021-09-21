<template>
  <div class="nav">
    <!-- {{ user.id }} -->
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link :to="`/tags/${result ? result.id : 1}`">Tags</router-link>
      </li>
      <li>
        <router-link :to="`/category/${result ? result.id : 1}`"
          >Category</router-link
        >
      </li>
      <li style="float: right" class="active">
        <router-link to="/">Đăng xuất</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "compheader",
  data() {
    return {
      text: "Header",
      posts: []
    };
  },
  methods: {
    async getData() {
      console.log("zxczxczxczxc");
      try {
        // const response = await this.$http.get(
        //   "http://jsonplaceholder.typicode.com/posts"
        // );
        // console.log('response', response)
        // this.posts = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    result() {
      return this.$store.state.AUTH.user;
    }
  },
  created() {
    this.getData();
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
