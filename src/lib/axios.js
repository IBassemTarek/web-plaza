import axios from "axios";
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        window.location.href = `${process.env.API_URL}/login`;
        // remove token from local storage and cookies
        localStorage.removeItem("token");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return instance(originalConfig);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
