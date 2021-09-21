import AuthServices from "../../ApiService/modules/auth";

const state = {
  user: null
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
      const response = await AuthServices.login(payload);
      console.log("Login từ Store", response);
      // commit("DO_SOMETHING");
      state.user = response.data;
    } catch (error) {
      console.log(error);
      // swal({
      //   title: "Lỗi",
      //   text: "Tài khoản hoặc mật khẩu không hợp lệ",
      //   icon: "error"
      // });
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
