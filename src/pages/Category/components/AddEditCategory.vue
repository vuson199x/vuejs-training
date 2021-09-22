<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onSubmitCategory" class="modal-content animate">
        <div class="imgcontainer">
          <h3>{{ dataUpdate ? "Edit Category" : "Add new Category" }}</h3>
          <span class="close" title="Close Modal" v-on:click="onCancelModal"
            >&times;</span
          >
        </div>

        <div class="container">
          <label for="uname"><b>Category name</b></label>
          <input
            type="text"
            placeholder="Enter Category name"
            name="category"
            required
            v-model="name"
            class="form-control"
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
      default: {}
    }
  },
  methods: {
    onCancelModal() {
      this.$emit("handleCancelEvent");
    },
    onSubmitCategory() {
      if (!this.dataUpdate) {
        this.$emit("onCreateCategory", this.name);
        this.name = "";
      } else {
        this.$emit("onUpdateCategory", this.name);
        this.name = "";
      }
    }
  },
  created() {
    this.name = this.dataUpdate ? this.dataUpdate.name : "";
  },

  computed: {}
};
</script>

<style></style>
