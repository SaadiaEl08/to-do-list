import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const port = import.meta.env.VITE_BACKEND_PORT || 1337;
const host = import.meta.env.VITE_BACKEND_HOST || "localhost";
const API_URL = `http://${host}:${port}/api/users`;
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
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
};
