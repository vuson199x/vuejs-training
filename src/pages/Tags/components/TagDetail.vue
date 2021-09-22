<template>
  <div style="margin-left: 2rem; ">
    <h1>Tag Detail</h1>
    <div>id: {{ tag.id }}</div>
    <div>name: {{ tag.name }}</div>
    <div>updatedAt: {{ tag.updatedAt }}</div>
    <div>createdAt: {{ tag.createdAt }}</div>
    <div>user_id: {{ tag.user_id }}</div>
    product:
    <ul>
      <li v-for="tag in tag.qas" v-bind:key="tag.id">
        {{ tag.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import TagService from "../../../ApiService/modules/apiTag";

export default {
  data() {
    return {
      tagId: this.$route.params.tagId,
      tag: null
    };
  },
  methods: {
    async getData() {
      console.log("id", this.id);
      try {
        const response = await TagService.getListDetail(this.tagId);
        console.log("response 123", response);
        this.tag = response.tag;
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
