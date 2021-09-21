import Api from "../apiConfig";

export default {
  login(data) {
    console.log("data", data);
    return Api().post("/api/auth/signin", data);
  },
  register() {
    return Api().post("/api/auth/signup");
  }
};
