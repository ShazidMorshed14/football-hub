import axios from "./axios";

export const GetAllCountries = async (params) => {
  const response = await axios().get("/countries", { params });
  return response;
};
