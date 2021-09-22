<template lang="">
  <div class="container">
    <h1>Tags</h1>
    <!-- {{ result }} -->
    <div class="search-Input">
      <input
        type="text"
        id="myInput"
        placeholder="Search for tags..."
        v-on:keyup.enter="onSeach"
        v-model="params.keyword"
      />
      <button class="button success" v-on:click="onSeach">Search</button>
      <button class="button success" v-on:click="isVisibleAddModal">
        Add new tag
      </button>
    </div>

    <table id="table">
      <tr>
        <th v-on:click="sortName('id')">ID</th>
        <th v-on:click="sortName('name')">Name</th>
        <th>UserId</th>
        <th>Product</th>
        <th></th>
      </tr>
      <tr v-for="tag in tags">
        <td style="width: 150px">{{ tag.id }}</td>
        <td>{{ tag.name }}</td>
        <td>{{ tag.user_id }}</td>
        <td>
          <div v-for="item in tag.qas">
            {{ item }}
          </div>
        </td>
        <button class="sm-button primary" v-on:click="isVisibleEditModal(tag)">
          Sửa
        </button>
        <!-- <button
          class="sm-button success"
          v-on:click="$router.push(`/tag/${id}/${tag.id}`)"
        >
          Detail
        </button> -->
        <button class="sm-button danger" v-on:click="onDelete(tag)">
          Xóa
        </button>
      </tr>
    </table>

    <AddEditTag
      v-bind:isVisible="isVisible"
      v-bind:dataUpdate="dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateTag="onCreateTag"
    />
  </div>
</template>

<script>
import TagService from "../../ApiService/modules/apiTag";
import AddEditTag from "../Tags/components/AddEditTag.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      tags: [],
      dataUpdate: null,
      isVisible: false,
      params: {
        page: 1,
        size: 0,
        sortName: "id",
        sortType: "desc",
        keyword: ""
      }
    };
  },
  components: {
    AddEditTag
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
    onSeach() {
      this.getData();
    },
    sortName(value) {
      console.log("value");
      this.params.sortName = value;
      this.getData();
    },
    async onDelete(tag) {
      console.log("tag", tag);
      try {
        if (window.confirm(`Are you want to delete this tag?`)) {
          await TagService.deleteTag(tag.id);
          this.getData();
          swal({
            title: "Success",
            text: `Delete ${tag.name} successfully!`,
            icon: "success"
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      try {
        const payload = {
          userId: this.id,
          ...this.params
        };
        const response = await TagService.getList(payload);
        console.log("response 123", response);
        this.tags = response.tags;
      } catch (error) {
        console.log(error);
      }
    },
    async onCreateTag(name) {
      console.log(name);
      const payload = {
        name: name,
        user_id: this.id
      };
      await TagService.postTag(payload);
      this.getData();
      this.isVisible = false;
      swal({
        title: "Success",
        text: `Add "${name}" tag successfully!`,
        icon: "success"
      });
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
