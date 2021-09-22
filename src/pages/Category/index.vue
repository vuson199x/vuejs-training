<template lang="">
  <div class="container">
    <h1>Category</h1>
    <!-- {{ result }} -->

    <div class="search-Input">
      <div>
        <input
          type="text"
          id="myInput"
          placeholder="Search for categories.."
          v-on:keyup.enter="onSeach"
          v-model="params.keyword"
        />
        <button class="button success" v-on:click="onSeach">Search</button>
        <div class="dropdown">
          <button class="dropbtn">Sắp xếp</button>
          <div class="dropdown-content">
            <span
              v-on:click="sortType('asc')"
              v-bind:class="{ sortSelected: sortType === 'asc' }"
              >Asc</span
            >
            <span v-on:click="sortType('desc')">Desc</span>
          </div>
        </div>
        <button
          style="float: right"
          class="button success"
          v-on:click="isVisibleAddModal"
        >
          Add new category
        </button>
      </div>
    </div>
    <table id="table">
      <tr>
        <th v-on:click="sortName('id')">ID</th>
        <th v-on:click="sortName('name')">Name</th>
        <th></th>
      </tr>
      <tr v-for="category in categories">
        <td style="width: 150px">{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td style="text-align: center, width: 200px">
          <button
            class="sm-button primary"
            v-on:click="isVisibleEditModal(category)"
          >
            Edit
          </button>
          <!-- <button
            class="sm-button success"
            v-on:click="$router.push(`/category/${id}/${category.id}`)"
          >
            Detail
          </button> -->
          <button class="sm-button danger" v-on:click="onDelete(category)">
            Detele
          </button>
        </td>
      </tr>
    </table>

    <AddEditCategory
      v-bind:isVisible="isVisible"
      v-bind:dataUpdate="dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateCategory="onCreateCategory"
    />
  </div>
</template>

<script>
import swal from "sweetalert";
import CategoryService from "../../ApiService/modules/apiCategory";
import AddEditCategory from "./components/AddEditCategory.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      categories: [],
      isVisible: false,
      dataUpdate: null,
      params: {
        page: 1,
        size: 0,
        sortName: "name",
        sortType: "",
        keyword: ""
      }
    };
  },
  components: {
    AddEditCategory
  },
  methods: {
    onSeach(e) {
      this.getData();
    },
    sortName(value) {
      this.params.sortName = value;
      this.getData();
    },
    sortType(value) {
      console.log(value, "value");
      this.params.sortType = value;
      this.getData();
    },
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
    async onCreateCategory(name) {
      console.log(name);
      const payload = {
        name: name,
        user_id: this.id
      };
      await CategoryService.postCategory(payload);
      this.getData();
      this.isVisible = false;
      swal({
        title: "Success",
        text: `Add "${name}" category successfully!`,
        icon: "success"
      });
    },
    async onDelete(category) {
      console.log("category", category);
      try {
        if (window.confirm(`Are you want to delete this category?`)) {
          await CategoryService.deleteCategory(category.id);
          this.getData();
          swal({
            title: "Success",
            text: `Delete category "${category.name}" successfully!`,
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
