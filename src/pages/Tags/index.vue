<template lang="">
  <div class="container">
    <h1>Tags</h1>
    <div class="search-Input">
      <div class="search-items">
        <input
          type="text"
          id="myInput"
          placeholder="Search for tags..."
          v-on:keyup.enter="onSeach"
          v-model="params.keyword"
        />
        <button
          class="button success"
          v-on:click="onSeach"
          style="margin-left: 10px"
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
          Add new tag
        </button>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table id="table">
        <tr>
          <th v-on:click="sortName('id')">ID</th>
          <th v-on:click="sortName('name')">Name</th>
          <th>UserId</th>
          <th>Product</th>
          <th></th>
        </tr>
        <tr v-for="tag in displayedTags">
          <td style="width: 150px">{{ tag.id }}</td>
          <td v-html="tag.name"></td>
          <td>{{ tag.user_id }}</td>
          <td>
            <div v-for="item in tag.qas">
              {{ item }}
            </div>
          </td>
          <button
            class="sm-button primary"
            v-on:click="isVisibleEditModal(tag)"
          >
            Sửa
          </button>
          <button
            class="sm-button success"
            v-on:click="$router.push(`/tags/${id}/${tag.id}`)"
          >
            Detail
          </button>
          <button class="sm-button danger" v-on:click="onDelete(tag)">
            Xóa
          </button>
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
    <AddEditTag
      v-if="isVisible"
      v-bind:isVisible="isVisible"
      v-bind:dataUpdate="dataUpdate"
      v-on:handleCancelEvent="handleCancelEvent"
      v-on:onCreateTag="onCreateTag"
      v-on:onUpdateTag="onUpdateTag"
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
      pagination: {
        totalPage: [],
        currentPage: 1,
        limit: 20
      },
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
    async onDelete(tag) {
      console.log("tag", tag);
      try {
        if (window.confirm(`Are you want to delete this tag?`)) {
          await TagService.deleteTag(tag.id);
          this.getData();
          swal({
            title: "Success",
            text: `Delete tag successfully!`,
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
        text: `Add tag successfully!`,
        icon: "success"
      });
    },
    async onUpdateTag(data) {
      const payload = {
        id: data.id,
        data: {
          name: data.name,
          user_id: this.id
        }
      };
      await TagService.putTag(payload);
      this.getData();
      this.isVisible = false;
      this.dataUpdate = null;
      swal({
        title: "Success",
        text: `Update tag successfully!`,
        icon: "success"
      });
    },
    setPages() {
      var numPages = this.tags.length / this.pagination.limit;
      for (let i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        this.pagination.totalPage.push(pageNum);
      }
    },
    paginate(tags) {
      let page = this.pagination.currentPage;
      let perPage = this.pagination.limit;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return tags.slice(from, to);
    }
  },
  watch: {
    tags() {
      this.setPages();
    }
  },
  computed: {
    result() {
      return this.$store.state.AUTH.user;
    },
    displayedTags() {
      return this.paginate(this.tags);
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style></style>
