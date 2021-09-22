<template>
  <div style="margin-left: 2rem; ">
    <h1>ProductDetail</h1>
    <div>id: {{ category.id }}</div>
    <div>name: {{ category.name }}</div>
    <div>updatedAt :{{ category.updatedAt }}</div>
    <div>createdAt: {{ category.createdAt }}</div>
    <div>user_id: {{ category.user_id }}</div>
  </div>
</template>

<script>
import CategoryService from "../../../ApiService/modules/apiCategory";

export default {
  data() {
    return {
      categoryId: this.$route.params.categoryId,
      category: null
    };
  },
  methods: {
    async getData() {
      console.log("id", this.id);
      try {
        const response = await CategoryService.getListDetail(this.categoryId);
        console.log("response 123", response);
        this.category = response.category;
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
