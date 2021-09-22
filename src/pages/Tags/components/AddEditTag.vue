<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onAddTag" class="modal-content animate">
        <div class="imgcontainer">
          {{ dataUpdate }}
          <h3>{{ dataUpdate ? "Edit Tag" : "Add new Tag" }}</h3>
          <span class="close" title="Close Modal" v-on:click="onCancelModal"
            >&times;</span
          >
        </div>

        <div class="container">
          <label for="uname"><b>Tag name</b></label>
          <input
            type="text"
            placeholder="Enter tag name"
            name="tag"
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
  name: "addedittag",
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
    onAddTag() {
      this.$emit("onCreateTag", this.name);
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
