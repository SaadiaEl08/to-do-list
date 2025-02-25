import { AuthContext } from "@/contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

const host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:1337";
const API_URL = `${host}/api/tasks`;

export const useGetTasks = () => {
  const { token, authenticatedUserId } = useContext(AuthContext);

  return useQuery({
    queryKey: ["tasks", authenticatedUserId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}?filters[creator][id][$eq]=${authenticatedUserId}&populate=*`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateTask = () => {
  const { token, authenticatedUserId } = useContext(AuthContext);

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
        { headers: { Authorization: `Bearer ${token}` } }
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
  const { token } = useContext(AuthContext);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }) => {
      const id = data.documentId;
      console.log(id);
      delete data.documentId;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.chosen;
      delete data.selected;
      data.creator = data.creator.id;
      const response = await axios.put(
        `${API_URL}/${id}`,
        { data },
        { headers: { Authorization: `Bearer ${token}` } }
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
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ documentId }) => {
      const response = await axios.delete(`${API_URL}/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the cache for tasks so it refetches
      queryClient.invalidateQueries("tasks");
    },
  });
};