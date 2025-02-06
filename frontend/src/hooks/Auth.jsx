import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUpdateUser } from "./User";

const port = import.meta.env.VITE_BACKEND_PORT || 1337;
const host = import.meta.env.VITE_BACKEND_HOST || "localhost";
const API_URL = `http://${host}:${port}/api/auth/local`;

// Register User
export const useRegister = () => {
  const { mutate } = useUpdateUser();
  return useMutation({
    mutationFn: async (userData) => {
      //get all data from the form and send only password and email and username to the backend for registration
      const { name, password, phoneNumber, registerMethod, login } = userData;
      let email =
        registerMethod === "email"
          ? login
          : `${new Date().getTime()}@gmail.com`;
      let username =
        registerMethod === "username"
          ? login
          : `${new Date().getTime()}`;

      const { data } = await axios.post(`${API_URL}/register`, {
        email,
        username,
        password,
      });
      localStorage.setItem("token", data.jwt);
      //if the registration is successful, update the user with the new data 
      if (data) {
        const { jwt, user } = data;
        mutate({
          ...user,
          phoneNumber,
          name,
          jwt,
        });
      }
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
