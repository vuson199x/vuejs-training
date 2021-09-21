<template>
  <div class="nav">
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Tags' }">Tags</router-link>
      </li>
      <li>
        <a href="#">Category</a>
      </li>
    </ul>
  </div>
</template>

<script>
// import {getUser} from '../ApiService/fakeApi'

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
  created() {
    this.getData();
  }
};
</script>

<style>
.nav {
  background: red;
}
</style>
