import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useLabStore = create((set) => ({
  patients: [],
  reports: [],
  reportUrl: null,
  isLoading: false,

  getPatients: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/lab/get-patients-lab");
      const patientsData = Array.isArray(res.data)
        ? res.data
        : res.data.patients || [];
      set({ patients: patientsData, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  addLabReport: async (id, data) => {
    try {
      const res = await axios.post(`/lab/add-lab-report/${id}`, data);
      toast.success("Report generated!");
      const downloadUrl = res.data.pdfUrl;
      set({ reportUrl: downloadUrl });
      return downloadUrl;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate report");
    }
  },
}));
