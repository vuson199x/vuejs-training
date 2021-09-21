<template lang="">
  <div class="container">
    <h1>Category</h1>
    <!-- {{ result }} -->
    <div class="search-Input">
      <input
        type="text"
        id="myInput"
        placeholder="Search for product.."
        v-on:keyup.enter="onSeach"
      />
      <button class="button success">Tìm kiếm</button>
    </div>
    <table id="table">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th></th>
      </tr>
      <tr v-for="category in categories">
        <td style="width: 150px">{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td style="text-align: center, width: 200px">
          <button class="sm-button primary">Edit</button>
          <button
            class="sm-button success"
            v-on:click="$router.push(`/category/${id}/${category.id}`)"
          >
            Detail
          </button>
          <button class="sm-button danger" v-on:click="onDelete(category)">
            Detele
          </button>
        </td>
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
      categories: [],
      user: null
    };
  },
  methods: {
    async onDelete(category) {
      console.log("category", category);
      try {
        if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục này`)) {
          await CategoryService.deleteCategory(category.id);
          getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      console.log("id", this.id);
      try {
        const payload = {
          userId: this.id,
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
