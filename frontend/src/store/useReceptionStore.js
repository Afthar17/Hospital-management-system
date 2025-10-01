// store/useReceptionStore.js
import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useReceptionStore = create((set, get) => ({
  patients: [],
  doctors: [],
  loading: false,

  addPatient: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post("/reception/add-patient", data);
      toast.success("Patient added successfully");
      set({ loading: false });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding patient");
      set({ loading: false });
    }
  },

  getPatients: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/reception/get-patients-reception");
      set({ patients: res.data, loading: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching patients");
      set({ loading: false });
    }
  },

  getDoctors: async () => {
    try {
      const res = await axios.get("/reception/get-doctors");
      set({ doctors: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching doctors");
    }
  },
  // useReceptionStore.js
  updateBill: async (patientId) => {
    try {
      const res = await axios.put(`/reception/update-bill/${patientId}`);
      toast.success("Bill updated to paid");
      await get().getPatients(); // refetch with latest bill status
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating bill");
    }
  },
}));
