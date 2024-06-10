import axios from "axios";

// create axios instance

export default (baseURL = "https://transfermarkt-db.p.rapidapi.com/v1") => {
  const instance = axios.create({
    baseURL,
  });

  //request interceptor to add the auth token header to requests
  instance.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": config.headers["Content-Type"]
        ? config.headers["Content-Type"]
        : "application/json",
      "x-rapidapi-key": "8a192d7bb5msh8da1d08ea8d1adap1ac637jsn9da29d4f832d",
      "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
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
