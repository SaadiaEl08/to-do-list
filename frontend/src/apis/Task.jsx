import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:1337";
const API_URL = `${host}/api/tasks`;
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
const authenticatedUserId = JSON.parse(localStorage.getItem("accountInfo")).id;

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks", authenticatedUserId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?filters[creator][id][$eq]=${authenticatedUserId}&populate=*`,
        { headers }
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }) => {
      delete data.documentId;
      delete data.chosen;
      const finalData = {
        ...data,
        creator: { connect: [Number(authenticatedUserId)] },
      };
      const response = await axios.post(
        API_URL,
        { data: finalData },
        { headers: headers }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for tasks so it refetches
      queryClient.invalidateQueries("tasks");
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }) => {
      const id = data.documentId;
      delete data.documentId;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.chosen;
      data.creator = data.creator.id;
      const response = await axios.put(
        `${API_URL}/${id}`,
        { data },
        { headers: headers }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for tasks so it refetches
      queryClient.invalidateQueries("tasks");
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: headers,
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for tasks so it refetches
      queryClient.invalidateQueries("tasks");
    },
  });
};

export const useUpdateTaskCompleted = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id ,isCompleted}) => {
      const response = await axios.patch(`${API_URL}/${id}`, {
        data: { isCompleted: isCompleted },
        headers: headers,
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for tasks so it refetches
      queryClient.invalidateQueries("tasks");
    },
  });
};
