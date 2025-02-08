import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
      localStorage.setItem("token", data.jwt);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, image: data.user.image })
      )
    },
  });
};

// Login User
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ credentials }) => {
      console.log(credentials);
      const response = await axios.post(`${API_URL}`, credentials);
      console.log(response);
      const data = response.data;
      if (data.error) throw new Error(data.error.message);
      if (data.jwt !== null && data.user !== null) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.user.name, image: data.user.image })
        );
      }
      return data;
    },
  });
};


const useLoginWithGoogle = () => {

};
