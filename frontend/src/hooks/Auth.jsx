import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:1337";
const API_URL = `${host}/api/auth/local`;

// Register User
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      //get all data from the form and send only password and email and username to the backend for registration
      const { name, password, phoneNumber, registerMethod } = userData;
      let email =
        registerMethod === "email"
          ? userData.email
          : `${new Date().getTime()}@gmail.com`;
      let username =
        registerMethod === "phone" ? phoneNumber : `${new Date().getTime()}`;

      const { data } = await axios.post(`${API_URL}/register`, {
        email,
        username,
        password,
        name,
        phoneNumber,
      });
      return data;
    },
  });
};

// Login User
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ credentials }) => {
      const response = await axios.post(`${API_URL}`, credentials);
      const data = response.data;
      if (data.error) throw new Error(data.error.message);
      return data;
    },
  });
};

export const useLoginWithGoogle = () => {
  return useMutation({
    mutationFn: async (token) => {
      const response = await axios.get(
        "http://localhost:1337/api/auth/google/callback",
        {
          params: { access_token: token },
        }
      );
      return response.data;
    },
  });
};
