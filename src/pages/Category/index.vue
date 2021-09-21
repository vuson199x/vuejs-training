<template lang="">
  <div class="container">
    <h1>Category</h1>
    {{ result }}
    <table id="table">
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      <tr v-for="category in categories">
        <td style="width: 150px">{{ category.id }}</td>
        <td>{{ category.name }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import CategoryService from "../../ApiService/modules/apiCategory";

export default {
  data() {
    return {
      id: this.$route.params.id,
      categories: []
    };
  },
  methods: {
    async getData() {
      console.log("zxczxczxczxc");
      try {
        const payload = {
          userId: "60dd8ed06600f9102a34c626",
          page: 1,
          size: 18,
          sortName: "",
          // sortType: asc || desc : string,
          keyword: ""
        };
        const response = await CategoryService.getList(payload);
        console.log("response 123", response);
        this.categories = response.categories;
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
<style></style>
