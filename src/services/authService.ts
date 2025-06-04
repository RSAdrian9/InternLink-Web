import axios from 'axios';
import API from '@/services/client/api'
import type { User } from '@/types/User'

export interface AuthResponse {
  token: string;
  user: User;
  status: boolean;
  message: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await API.post('/login', { email, password })
    return response.data as AuthResponse;
  } catch (error) {
    // Se puede loggear el error, transformarlo, etc.
    // Ejemplo de cómo relanzar el error para que el store lo maneje:
    console.error('Error durante el login:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de red o del servidor');
    }
    throw error;
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await API.post('/register', { name, email, password });
    return response.data as AuthResponse;
  } catch (error) {
    console.error('Error durante el registro:', error);
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error de red o del servidor');
    }
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
    try {
        await API.post('/logout');
        localStorage.removeItem('token'); // Limpiar el token del almacenamiento local
    } catch (error) {
        console.error('Error durante el logout:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error de red o del servidor');
        }
        throw error;
    }
};

// Obtiene el perfil del usuario autenticado
export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await API.get('/auth/user');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil de usuario:', error);
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error de red o del servidor');
    }
    throw error;
  }
};