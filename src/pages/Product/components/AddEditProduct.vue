<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onAddProduct" class="modal-content animate">
        <div class="imgcontainer">
          <h3>{{ dataUpdate ? "Edit product" : "Add new product" }}</h3>
          <span class="close" title="Close Modal" v-on:click="onCancelModal"
            >&times;</span
          >
        </div>

        <div class="container">
          <label for="uname"><b>Product name</b></label>
          <input
            type="text"
            placeholder="Enter product name"
            name="product"
            required
            v-model="name"
          />

          <button class="sm-button success display-center">
            {{ dataUpdate ? "Edit" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addeditcategory",
  data() {
    return {
      name: ""
    };
  },
  props: {
    isVisible: Boolean,
    dataUpdate: {
      type: Object,
      required: false,
      default: null
    }
  },
  methods: {
    onCancelModal() {
      this.$emit("handleCancelEvent");
    },
    onAddProduct() {
      this.$emit("onCreateProduct", this.name);
      this.name = "";
    }
  },
  created() {
    console.log("this.dataUpdate created", this.dataUpdate);
  },
  mounted() {
    console.log("this.dataUpdate mounted", this.dataUpdate);
  },
  activated() {
    console.log("this.dataUpdate activated", this.dataUpdate);
  },
  destroyed() {
    console.log("this.dataUpdate destroyed", this.dataUpdate);
  },
  computed: {}
};
</script>

<style></style>
