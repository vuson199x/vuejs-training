import swal from "sweetalert";
import AuthServices from "../../ApiService/modules/auth";
import router from "../../routes";
const state = {
  user: null,
  result: 0
};
const getters = {};
const mutations = {
  // DO_SOMETHING() {
  //   console.log("Login từ Store123123123");
  // }
};
const actions = {
  async login({ commit }, crendentials) {
    try {
      const response = await AuthServices.login({ ...crendentials });
      console.log("Login từ Store", response);
      // commit("DO_SOMETHING");
      state.user = response;
      router.push("/");
      console.log(state.user, "state.user");
    } catch (error) {
      console.log(error.response);
      swal({
        title: "Lỗi",
        text: error.response.data.message,
        icon: "error"
      });
    }
  },
  async register({ commit }, crendentials) {
    try {
      const response = await AuthServices.register({ ...crendentials });
      console.log("Register từ Store", response);
      // alert(response.message);
      swal({
        title: "Thành công",
        text: response.message,
        icon: "success"
      });
    } catch (error) {
      console.log(error.response);
      swal({
        title: "Lỗi",
        text: error.response.data.message,
        icon: "error"
      });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
