import Api from "../apiConfig";

export default {
  getList(data) {
    console.log("data", data);
    return Api().get(
      `/api/category/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}`
    );
  },
  postCategory(data) {
    return Api().post(`/api/category/create`, data);
  },
  deleteCategory(id) {
    return Api().delete(`/api/category/delete/${id}`);
  },
  getListDetail(id) {
    return Api().get(`/api/category/detail/${id}`);
  }
  // https://chatbot-api.ominext.dev/api/category/list?userId=60dd8ed06600f9102a34c626&page=1&size=24&sortName=&sortType="asc"
};
