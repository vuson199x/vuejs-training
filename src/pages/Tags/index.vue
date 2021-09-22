<template lang="">
  <div class="container">
    <h1>Tags</h1>
    <!-- {{ result }} -->
    <div class="search-Input">
      <input
        type="text"
        id="myInput"
        placeholder="Search for product.."
        v-on:keyup.enter="onSeach"
        v-model="params.keyword"
      />
      <button class="button success" v-on:click="onSeach">Tìm kiếm</button>
      <button class="button success" v-on:click="isVisibleAddModal">
        Thêm mới
      </button>
    </div>

    <table id="table">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>UserId</th>
        <th>Qas</th>
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
  </div>
</template>
<script>
import TagService from "../../ApiService/modules/apiTag";

export default {
  data() {
    return {
      id: this.$route.params.id,
      tags: [],
      dataUpdate: null,
      isVisible: false,
      params: {
        page: 1,
        size: 18,
        sortName: "",
        sortType: "",
        keyword: ""
      }
    };
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
