import axiosInstance from "./instance.js";
import { toast } from 'react-toastify';
export async function login(data) {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      toast.success('Login Successfully!', {toastId: "Login Successfully"});
      return response.data
    } catch (error) {
      console.error("Error fetching data:", error);
      return null
    }
  }
  
export async function register(data) {
    try {
      const response = await axiosInstance.post("/register", data);
      return response.data
    } catch (error) {
      console.error("Error fetching data:", error);
      return null
    }
  }