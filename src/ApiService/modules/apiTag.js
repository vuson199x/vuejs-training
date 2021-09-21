import Api from "../apiConfig";

export default {
  getList(data) {
    console.log("data", data);
    return Api().get(
      `/api/tag/list?userId=${data.userId}&page=${data.page}&size=${data.size}&keyword=${data.keyword}`
    );
  }
};
