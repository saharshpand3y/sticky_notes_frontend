import axios from "axios";

const API_URL = "http://localhost:5000";

// Helper function to get Authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// Centralized error handler for API calls
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the range of 2xx
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    // Request was made but no response received
    console.error("No response received from server:", error.request);
    throw new Error("No response received from server");
  } else {
    // Something else caused the error
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};

// Define the login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token); // Save token to localStorage
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


// Fetch all notes
export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`, getAuthHeaders());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(
      `${API_URL}/notes`,
      note,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete a note by ID
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/notes/${id}`, getAuthHeaders());
  } catch (error) {
    handleApiError(error);
  }
};

// Update an existing note
export const updateNote = async (note) => {
  try {
    const response = await axios.put(
      `${API_URL}/notes/${note.id}`,
      note,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
