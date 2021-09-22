import Api from "../apiConfig";

export default {
  getList(data) {
    console.log("data", data);
    return Api().get(
      `/api/category/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}&sortName=${data.sortName}&sortType=${data.sortType}`
    );
  },
  postCategory(data) {
    return Api().post(`/api/category/create`, data);
  },
  putCategory(payload) {
    return Api().put(`/api/category/update/${payload.id}`, payload.data);
  },
  deleteCategory(id) {
    return Api().delete(`/api/category/delete/${id}`);
  },
  getListDetail(id) {
    return Api().get(`/api/category/detail/${id}`);
  }
};
