<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onSubmitProduct" class="modal-content animate">
        <div class="imgcontainer">
          <h3>{{ dataUpdate ? "Edit product" : "Add new product" }}</h3>
          <span class="close" title="Close Modal" v-on:click="onCancelModal"
            >&times;</span
          >
        </div>

        <div class="container">
          <div>
            <label for="title"><b>Product title</b></label>
            <input
              type="text"
              placeholder="Enter product title"
              name="title"
              required
              v-model="title"
              class="form-control"
            />
          </div>
          <div>
            <label for="url"><b>Url</b></label>
            <input
              type="text"
              placeholder="Enter product's url"
              name="url"
              required
              v-model="url"
              class="form-control"
            />
          </div>
          <div>
            <label for="category"><b>Category: </b></label>
            <multiselect
              v-model="category"
              :options="optionCategory"
              placeholder="Search and select one"
              label="name"
              track-by="name"
            >
              ></multiselect
            >
          </div>
          <div>
            <label for="tags"><b>Tags: </b></label>
            <multiselect
              v-model="tags"
              :options="optionTags"
              :multiple="true"
              label="name"
              track-by="name"
            >
            </multiselect>
          </div>
          <div>
            <label for="description"><b>Description: </b></label>
            <textarea
              required
              v-model="description"
              placeholder="Enter product's description"
              name="description"
              rows="4"
              cols="50"
            ></textarea>
          </div>

          <button class="sm-button success display-center">
            {{ dataUpdate ? "Edit" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import CategoryService from "../../../ApiService/modules/apiCategory";
import TagService from "../../../ApiService/modules/apiTag";

export default {
  name: "addeditproduct",
  data() {
    return {
      id: "",
      title: "",
      description: "",
      tags: [],
      url: "",
      category: 0,
      optionCategory: [],
      optionTags: [],
      params: {
        userId: this.$route.params.id,
        page: 1,
        size: 0,
        sortName: "name",
        sortType: "",
        keyword: ""
      }
    };
  },
  components: {
    Multiselect
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
    onSubmitProduct() {
      try {
        const data = {
          title: this.title,
          description: this.description,
          tags: this.tags.map(item => item.id),
          url: this.url,
          category: this.category.id
        };

        console.log("data", data);
        if (!this.dataUpdate) {
          this.$emit("onCreateProduct", data);
          this.title = "";
          this.description = "";
          this.tags = [];
          this.url = "";
          this.category = 0;
        } else {
          const updateData = {
            id: this.id,
            ...data
          };
          this.$emit("onUpdateProduct", updateData);
          this.title = "";
          this.description = "";
          this.tags = [];
          this.url = "";
          this.category = 0;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getDataCatgory() {
      try {
        const payload = {
          ...this.params
        };
        const response = await CategoryService.getList(payload);
        this.optionCategory = response.categories;
      } catch (error) {
        console.log(error);
      }
    },
    async getDataTags() {
      try {
        const payload = {
          ...this.params
        };
        const response = await TagService.getList(payload);
        this.optionTags = response.tags;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getDataCatgory();
    this.getDataTags();
    this.id = this.dataUpdate.id;
    this.title = this.dataUpdate.title;
    this.description = this.dataUpdate.description;
    this.tags = this.dataUpdate.tags;
    this.url = this.dataUpdate.url;
    this.category = this.dataUpdate.category;
  },
  computed: {}
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.add-edit .multiselect__placeholder {
  color: #898181;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 0px;
  padding: 12px 19px 2px;
}

.add-edit .multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 0px;
  border-radius: 0px;
  background: #fff;
  font-size: 14px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.add-edit .multiselect__single {
  margin-bottom: 8px;
  padding: 12px 0px 0px 17px;
}

.add-edit .multiselect__tags-wrap .multiselect__tags {
  margin-top: 6px;
}
</style>
