<template>
  <div>
    <h1>CategoryDetail</h1>
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
        // this.category = response.qas;
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
