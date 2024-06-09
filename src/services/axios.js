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
      "x-rapidapi-key": "9e6def425cmshb53c6cabcf632bep135aa3jsnbc5ac0460ff8",
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
