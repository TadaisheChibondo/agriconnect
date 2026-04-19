import axios from "axios";

// Switch automatically between Localhost and Vercel/Render
const BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://yield-trade-backend-1dh8.onrender.com";

const API_URL = `${BASE_URL}/api/`;

// Helper to get the token from storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Token ${token}` } } : {};
};

// --- AUTHENTICATION ---

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, {
      username,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register/`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${API_URL}profiles/me/`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// --- LISTINGS (Farmers) ---

export const getListings = async () => {
  try {
    const response = await axios.get(`${API_URL}listings/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

export const createListing = async (listingData) => {
  try {
    const config = getAuthHeaders();

    // Axios automatically handles the multipart/form-data content type
    // and the required boundary string when you pass it a FormData object!

    const response = await axios.post(
      `${API_URL}listings/`,
      listingData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

export const getMatches = async (listingId) => {
  try {
    const config = getAuthHeaders();
    const response = await axios.get(
      `${API_URL}listings/${listingId}/matches/`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error("Error finding matches:", error);
    return [];
  }
};

// --- REQUIREMENTS (Startups) ---

export const getRequirements = async () => {
  try {
    const response = await axios.get(`${API_URL}requirements/`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const createRequirement = async (reqData) => {
  try {
    const response = await axios.post(
      `${API_URL}requirements/`,
      reqData,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Error creating requirement:", error);
    throw error;
  }
};

export const getStartupMatches = async (requirementId) => {
  try {
    const config = getAuthHeaders();
    const response = await axios.get(
      `${API_URL}requirements/${requirementId}/matches/`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error("Error finding startup matches:", error);
    return [];
  }
};

// --- AI PREDICTION ENGINE ---

export const predictYield = async (predictionData) => {
  try {
    // This endpoint is public (AllowAny), so we don't strictly need auth headers,
    // but it's fine to pass data normally.
    const response = await axios.post(
      `${API_URL}predict-yield/`,
      predictionData,
    );
    return response.data;
  } catch (error) {
    console.error("Error predicting yield:", error);
    throw error;
  }
};
