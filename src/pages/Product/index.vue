<template lang="">
  <div class="container">
    <h1>Product</h1>
    <div class="search-Input">
      <div class="search-items">
        <input
          type="text"
          id="myInput"
          placeholder="Search for products..."
          v-on:keyup.enter="onSeach"
          v-model="params.keyword"
        />
        <button
          class="button success"
          style="margin-left: 10px"
          v-on:click="onSeach"
        >
          Search
        </button>
      </div>
      <div class="search-button">
        <div class="dropdown">
          <button class="dropbtn">Sắp xếp</button>
          <div class="dropdown-content">
            <span v-on:click="sortType('asc')">Asc</span>
            <span v-on:click="sortType('desc')">Desc</span>
          </div>
        </div>
        <button
          class="button success"
          style="float: right"
          v-on:click="isVisibleAddModal"
        >
          Add new product
        </button>
      </div>
    </div>

    <div style="overflow-x:auto;">
      <table id="table">
        <tr>
          <th v-on:click="sortName('id')">ID</th>
          <th v-on:click="sortName('title')">Title</th>
          <th>Category</th>
          <th>Tags</th>
          <th></th>
        </tr>
        <tr v-for="product in displayedProducts">
          <td style="width: 150px">
            {{ product.id }}
          </td>
          <td v-html="product.title">{{ product.title }}</td>
          <td>{{ product.category.name }}</td>
          <td>
            <div v-for="item in product.tags">
              {{ item.name }}
            </div>
          </td>
          <td>
            <button
              class="sm-button primary"
              v-on:click="isVisibleEditModal(product)"
            >
              Sửa
            </button>
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

      <div class="pagination">
        <a
          v-if="pagination.currentPage != 1"
          v-on:click="pagination.currentPage--"
          >&laquo;</a
        >
        <a
          v-for="pag in pagination.totalPage"
          @click="pagination.currentPage = pag"
          >{{ pag }}</a
        >
        <a
          v-if="pagination.currentPage < pagination.totalPage.length"
          v-on:click="pagination.currentPage++"
          >&raquo;</a
        >
      </div>
    </div>

    <AddEditProduct
      v-if="isVisible"
      v-bind:isVisible="isVisible"
      v-bind:dataUpdate="dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateProduct="onCreateProduct"
      v-on:onUpdateProduct="onUpdateProduct"
    />
  </div>
</template>
<script>
import ProductService from "../../ApiService/modules/apiProduct";
import AddEditProduct from "./components/AddEditProduct.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      products: [],
      isVisible: false,
      dataUpdate: null,
      pagination: {
        totalPage: [],
        currentPage: 1,
        limit: 20
      },
      params: {
        page: 1,
        size: 0,
        sortName: "title",
        sortType: "",
        keyword: ""
      }
    };
  },
  components: {
    AddEditProduct
  },
  methods: {
    isVisibleEditModal(data) {
      this.dataUpdate = data;
      this.isVisible = true;
    },
    isVisibleAddModal() {
      this.isVisible = true;
    },
    handleCancelEvent() {
      this.dataUpdate = null;
      this.isVisible = false;
    },
    onSeach(e) {
      this.getData();
    },
    sortType(value) {
      console.log(value, "value");
      this.params.sortType = value;
      this.getData();
    },
    sortName(value) {
      console.log("value");
      this.params.sortName = value;
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
            text: `Delete product successfully!`,
            icon: "success"
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onCreateProduct(data) {
      console.log(data);
      const payload = {
        ...data,
        user_id: this.id
      };
      await ProductService.postProduct(payload);
      this.getData();
      this.isVisible = false;
      swal({
        title: "Success",
        text: `Add product successfully!`,
        icon: "success"
      });
    },
    async onUpdateProduct(data) {
      console.log(data);
      const payload = {
        id: data.id,
        data: {
          ...data,
          user_id: this.id
        }
      };
      await ProductService.putProduct(payload);
      this.getData();
      this.isVisible = false;
      swal({
        title: "Success",
        text: `Update product successfully!`,
        icon: "success"
      });
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
    },
    setPages() {
      var numPages = this.products.length / this.pagination.limit;
      for (let i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        this.pagination.totalPage.push(pageNum);
      }
    },
    paginate(products) {
      let page = this.pagination.currentPage;
      let perPage = this.pagination.limit;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return products.slice(from, to);
    }
  },
  computed: {
    result() {
      return this.$store.state.AUTH.user;
    },
    displayedProducts() {
      return this.paginate(this.products);
    }
  },
  watch: {
    products() {
      this.setPages();
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style></style>
