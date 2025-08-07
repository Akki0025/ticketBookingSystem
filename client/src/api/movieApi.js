// src/api/movieApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Adjust if needed

export const fetchMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/movies`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createMovie = async (movieData, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/movies`,
      movieData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
        withCredentials: true, // Add this properly
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
