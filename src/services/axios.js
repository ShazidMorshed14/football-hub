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
      "x-rapidapi-key": "be6a7ad5a0msh53ae27cef88c26fp1e1948jsn1ad0128f6c29",
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
