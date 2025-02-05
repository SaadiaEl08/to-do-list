import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const port = import.meta.env.VITE_BACKEND_PORT || 1337;
const host = import.meta.env.VITE_BACKEND_HOST || "localhost";
const API_URL = `http://${host}:${port}/api/auth/local`;

// Register User
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axios.post(`${API_URL}/register`, userData);
      return data;
    },
  });
};

// Login User
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axios.post(`${API_URL}`, credentials);
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("username", data.user.username);
      return data;
    },
  });
};
