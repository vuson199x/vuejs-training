<template lang="">
  <div class="container">
    <h1>Product</h1>
    {{ params.keyword }}
    <div class="search-Input">
      <input
        type="text"
        id="myInput"
        placeholder="Search for product.."
        v-on:keyup.enter="onSeach"
        v-model="params.keyword"
      />
      <button class="button success" v-on:click="onSeach">Tìm kiếm</button>
    </div>

    <table id="table">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Tags</th>
        <th></th>
      </tr>
      <tr v-for="product in products">
        <td style="width: 150px">{{ product.id }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.category.name }}</td>
        <td>
          <div v-for="item in product.tags">
            {{ item.name }}
          </div>
        </td>
        <td>
          <button class="sm-button primary">Sửa</button>
          <button
            class="sm-button success"
            v-on:click="$router.push(`/product/${id}/${product.id}`)"
          >
            Detail
          </button>
          <button class="sm-button danger" v-on:click="onDelete(product)">
            Xóa
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import ProductService from "../../ApiService/modules/apiProduct";

export default {
  data() {
    return {
      id: this.$route.params.id,
      products: [],
      params: {
        page: 1,
        size: 0,
        sortName: "",
        sortType: "",
        keyword: ""
      }
    };
  },
  methods: {
    onSeach(e) {
      this.getData();
    },
    async onDelete(product) {
      console.log("product", product);
      try {
        if (window.confirm(`Are you want to delete this product?`)) {
          await ProductService.deleteProduct(product.id);
          this.getData();
          swal({
            title: "Success",
            text: `Delete ${product.title} successfully!`,
            icon: "success"
          });
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
          ...this.params
        };
        const response = await ProductService.getList(payload);
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
