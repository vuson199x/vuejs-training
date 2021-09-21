import Api from "../apiConfig";

export default {
  getList(data) {
    return Api().get("/api/category/list", data);
  },
};
