import axiosInstance from "./instance.js";

// Example API Call
export async function fetchData() {
  try {
    const response = await axiosInstance.get("/db");
    console.log("Data:", response.data);
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null
  }
}


export async function check() {
    try {
      const response = await axiosInstance.get("/");
      console.log("Data:", response.data);
      return response.data
    } catch (error) {
      console.error("Error fetching data:", error);
      return null
    }
  }
  