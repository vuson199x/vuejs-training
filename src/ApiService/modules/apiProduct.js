import Api from "../apiConfig";

export default {
  getList(data) {
    console.log("data", data);
    return Api().get(
      `/api/qa/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}&sortName=${data.sortName}&sortType=${data.sortType}`
    );
  },
  deleteProduct(id) {
    return Api().delete(`/api/qa/delete/${id}`);
  },
  postProduct(data) {
    return Api().post(`/api/qa/create`, data);
  },
  putProduct(payload) {
    return Api().put(`/api/qa/update/${payload.id}`, payload.data);
  },
  getListDetail(id) {
    return Api().get(`/api/qa/detail/${id}`);
  }
};
