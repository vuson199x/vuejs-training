<template>
  <div class="add-edit">
    <div id="id01" class="modal" v-if="isVisible">
      <form @submit.prevent="onAddCategory" class="modal-content animate">
        <div class="imgcontainer">
          {{ dataUpdate }}
          <h3>Add new Category</h3>
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
          />

          <button class="sm-button success display-center">
            Thêm mới
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
    onAddCategory() {
      this.$emit("onCreateCategory", this.name);
      this.name = "";
    }
  },
  computed: {}
};
</script>

<style>
.add-edit form {
  width: 550px;
}

.add-edit input[type="text"],
.add-edit input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.add-edit .container {
  padding: 16px;
  width: 450px;
}

/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
