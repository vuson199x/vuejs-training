import AuthServices from "../../ApiService/modules/auth";

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
      const payload = {
        username: crendentials.username,
        password: crendentials.password
      };
      const response = await AuthServices.login({ ...crendentials });
      console.log("Login từ Store", response);
      // commit("DO_SOMETHING");
      state.user = response;
      console.log(state.user, "state.user");
    } catch (error) {
      console.log(error, "error");
      // swal({
      //   title: "Lỗi",
      //   text: "Tài khoản hoặc mật khẩu không hợp lệ",
      //   icon: "error"
      // });
    }
  },
  async register({ commit }, crendentials) {
    try {
      const response = await AuthServices.register({ ...crendentials });
      console.log("Register từ Store", response);
      alert(response.message);
    } catch (error) {
      console.log(error);
      // alert(response.message);
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
