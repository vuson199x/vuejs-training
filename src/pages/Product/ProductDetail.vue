<template>
  <div>
    <h1>ProductDetail</h1>
  </div>
</template>

<script>
import ProductService from "../../ApiService/modules/apiProduct";

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
        this.products = response.qas;
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
