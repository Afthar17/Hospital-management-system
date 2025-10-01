import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";
import { all } from "axios";

export const useAdminStore = create((set, get) => ({
  allUsers: [],
  patients: [],
  isLoading: false,
  getUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/auth/get-users");
      set({ allUsers: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
  register: async (formData) => {
    set({ loading: true });
    const users = get().allUsers;
    try {
      const res = await axios.post("/auth/register", formData);
      toast.success(res.data.message || "User created successfully");
      set({ loading: false, user: [...users, ...res.data.user] });
      return true;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  },
  getPatients: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/auth/get-patients-admin");
      const patientsData = Array.isArray(res.data)
        ? res.data
        : res.data.patients || [];
      set({ patients: patientsData, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
  deleteUser: async (id) => {
    try {
      const res = await axios.delete(`/auth/admin/delete-user/${id}`);
      toast.success(res.data.message || "User deleted successfully");
      get().getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  },
}));
