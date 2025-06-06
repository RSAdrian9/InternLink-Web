import axios from "axios";
import { showToast } from '../../composables/useToast'
import router from "@/router";

/**
 * Axios instance configured for API requests.
 * 
 * - Uses base URL from environment variable
 * - Sends credentials (cookies) with requests
 * - Sets default JSON headers
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor to attach token from local storage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log('Token en solicitud:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      // Error de red, servidor caído, o sin conexión a internet
      console.error("Network or server error:", error);
      showToast("Could not connect to the server. Please check your connection.", "error");
      return Promise.reject(error);
    }

    switch (response.status) {
      case 400: // Bad Request
        console.warn("Solicitud incorrecta:", response.data?.message || response.statusText);
        break;

      case 401: // Unauthorized
        console.warn("No autorizado. Token inválido o expirado.");
        showToast("Session expired. Please log in again.", "warning");
        localStorage.removeItem("token");
        // window.location.href = "/login"; 
        router.push('/login'); // para evitar recargar la página
        break;

      case 403: // Forbidden
        showToast("You do not have permission to perform this action.", "error");
        break;

      case 404: // Not Found
        showToast("The requested resource was not found.", "error");
        break;

      case 422: // Errores de validación
          console.warn("Errores de validación:", response.data.errors);
          break;

      case 500: // Internal Server Error
        showToast("Server error. Please try again later.", "error");
        break;

      default:
        console.error("Error desconocido:", response.status, response.data);
        // showToast("An error occurred. Please try again later.", "error");
        break;
    }

    return Promise.reject(error);
  }
);

export default API;
