import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useDoctorStore = create((set, get) => ({
  patients: [],
  selectedPatient: null,
  isLoading: false,

  getPatients: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("/doctor/get-patients-doctor");
      set({ patients: res.data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      toast.error(err.response?.data?.message || "Failed to fetch patients");
    }
  },

  getPatient: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/doctor/get-patient/${id}`);
      set({ selectedPatient: res.data, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      toast.error(err.response?.data?.message || "Failed to fetch patient");
    }
  },

  addPrescription: async (id, prescription) => {
    try {
      const res = await axios.post(`/doctor/add-prescription/${id}`, {
        prescription,
      });
      toast.success("Prescription added");
      set({ selectedPatient: res.data });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add prescription");
    }
  },
  labReports: [],
  isLoadingReports: false,

  getLabReports: async () => {
    try {
      set({ isLoadingReports: true });
      const res = await axios.get("/doctor/get-lab-reports");
      set({ labReports: res.data, isLoadingReports: false });
    } catch (err) {
      console.error(err);
      set({ isLoadingReports: false });
    }
  },
}));
