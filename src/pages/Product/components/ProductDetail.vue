<template>
  <div style="margin-left: 2rem; ">
    <h1>ProductDetail</h1>
    <div>user_id: {{ products.user_id }}</div>
    <div>category: {{ products.category.name }}</div>
    <div>title :{{ products.title }}</div>
    <div>url : {{ products.url }}</div>
    <div>createdAt: {{ products.createdAt }}</div>
    <div>description: {{ products.description }}</div>
    Tags:
    <ul>
      <li v-for="tag in products.tags" v-bind:key="tag.id">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import ProductService from "../../../ApiService/modules/apiProduct";

export default {
  data() {
    return {
      productId: this.$route.params.productId,
      products: null
    };
  },
  methods: {
    async getData() {
      console.log("id", this.id);
      try {
        const response = await ProductService.getListDetail(this.productId);
        console.log("response 123", response);
        this.products = response.qa;
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
