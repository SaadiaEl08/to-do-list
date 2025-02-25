import { AuthContext } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:1337";
const API_URL = `${host}/api/users`;
const token = localStorage.getItem("token");

// Fetch user data
export const useUser = () => {
  return useQuery({
    queryKey: ["user"], // Use a unique query key to cache the result
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
};
// Fetch user data with tasks
export const useUserTasks = () => {
  return useQuery({
    queryKey: ["userTasks"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/me?populate=tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.tasks);
      return data?.tasks;
    },
  });
};

// Fetch or modify user data
export const useUpdateUser = () => {
  const { token } = useContext(AuthContext);
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const { data:responseData } = await axios.put(`${API_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return responseData;
    },
  });
};

// Delete user
export const useDeleteUser = (id) => {
  return useQuery({
    queryKey: ["deleteUser", id], // Cache the delete query based on the user ID
    queryFn: async () => {
      if (!id) return; // Make sure the ID exists before sending the request
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled: !!id, // Only run the query when ID exists
  });
};
