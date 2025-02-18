import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:1337";
const API_URL = `${host}/api/categories`;
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}`, {
        headers: headers,
      });
      return data.data;
    },
  });
};
