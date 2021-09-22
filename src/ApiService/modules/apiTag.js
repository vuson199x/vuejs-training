import Api from "../apiConfig";

export default {
  getList(data) {
    console.log("data", data);
    return Api().get(
      `/api/tag/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}&sortName=${data.sortName}&sortType=${data.sortType}`
    );
  },
  deleteTag(id) {
    return Api().delete(`/api/tag/delete/${id}`);
  },
  postTag(data) {
    return Api().post(`/api/tag/create`, data);
  },
  putTag(payload) {
    return Api().put(`/api/tag/update/${payload.id}`, payload.data);
  },
  getListDetail(id) {
    return Api().get(`/api/tag/view/${id}`);
  }
};
