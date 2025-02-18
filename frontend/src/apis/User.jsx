import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
export const useUpdateUser = (userData) => {
  return useQuery({
    queryKey: ["updateUser", userData?.id], // Cache the update query based on the user ID
    queryFn: async () => {
      if (!userData) return; // Make sure userData exists before sending the request
      const { data } = await axios.put(`${API_URL}/${userData.id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!userData, // Only run the query when userData exists
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
