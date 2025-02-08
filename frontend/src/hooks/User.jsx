import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:1337";
const API_URL = `${host}/api/users`;
const token = localStorage.getItem("token");

// export const useUser = () => {
//   return useQuery(
//     ["user"],
//     async () => {
//       const { data } = await axios.get(`${API_URL}/me`);
//       return data;
//     },
//     { enabled: Boolean(localStorage.getItem("token")) }
//   );
// };

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axios.put(`${API_URL}/${userData.id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};


