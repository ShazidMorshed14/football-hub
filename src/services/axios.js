import axios from "axios";

// create axios instance

export default (baseURL = "https://v3.football.api-sports.io/") => {
  const instance = axios.create({
    baseURL,
  });

  //request interceptor to add the auth token header to requests
  instance.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": config.headers["Content-Type"]
        ? config.headers["Content-Type"]
        : "application/json",
      "x-rapidapi-key": "796a0f2dacmsh7e7c2e4712f9604p1d59b7jsn4d3d27d248f1",
      "x-rapidapi-host": "v3.football.api-sports.io",
    };
    return config;
  });

  // response interceptor to refresh token on receiving token expired error
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
