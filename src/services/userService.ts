import axios from 'axios';
import API from '@/services/client/api'
import type { User } from '@/types/User'

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error de red o del servidor');
        }
        throw error;
    }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error de red o del servidor');
    }
    throw error;
  }
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await API.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error de red o del servidor');
    }
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await API.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error de red o del servidor');
    }
    throw error;
  }
};
