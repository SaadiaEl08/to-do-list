import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:1337";
const API_URL = `${host}/api/tasks`;
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getTasks = () => {
  return useQuery(["tasks"], async () => {
    const { data } = await axios.get(API_URL, {
      headers: headers,
    });
    return data;
  });
};

export const getTask = (id) => {
  return useQuery(["task", id], async () => {
    const { data } = await axios.get(`${API_URL}/${id}`, {
      headers: headers,
    });
    return data;
  });
};
