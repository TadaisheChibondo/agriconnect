import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Helper to get the token from storage
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { Authorization: `Token ${token}` } } : {};
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, { username, password });
        // The token is returned here. Save it!
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

// Update createListing to use the token
export const createListing = async (listingData) => {
    const config = getAuthHeaders();
    config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' };
    
    // We REMOVED the hardcoded 'farmer' ID here because the Backend handles it now!
    const response = await axios.post(`${API_URL}listings/`, listingData, config);
    return response.data;
};

// NEW: Create Requirement (For Startups)
export const createRequirement = async (reqData) => {
    const response = await axios.post(`${API_URL}requirements/`, reqData, getAuthHeaders());
    return response.data;
};

// ... Keep getListings, getMatches, etc. as they were ...
// (Just ensure you aren't changing their exports)
export const getListings = async () => { /* ... */ return (await axios.get(`${API_URL}listings/`)).data; };
export const getMatches = async (id) => { /* ... */ return (await axios.get(`${API_URL}listings/${id}/matches/`)).data; };
export const getRequirements = async () => { /* ... */ return (await axios.get(`${API_URL}requirements/`)).data; };
export const getStartupMatches = async (id) => { /* ... */ return (await axios.get(`${API_URL}requirements/${id}/matches/`)).data; };
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};