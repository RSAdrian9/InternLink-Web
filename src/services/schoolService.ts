import API from '@/services/client/api'
import type { School, CreateSchoolDTO, UpdateSchoolDTO } from '@/types/School';

// Este servicio maneja los métodos agrupados por un objeto principal (más usado).
export const schoolService = {
  getAllSchools: async (): Promise<School[]> => {
    try {
      const response = await API.get('/schools');
      // Esperamos el formato paginado de Laravel: { data: [...], links: {...}, meta: {...} }
      return response.data.data;
    } catch (error: any) {
      console.error('Error al obtener todas las institutos:', error);
      throw error.response?.data?.message || 'Error al cargar institutos.';
    }
  },

  getSchoolById: async (id: number): Promise<School> => {
    try {
      const response = await API.get(`/schools/${id}`);
      return response.data; // Asumiendo que no está paginado para un solo item
    } catch (error: any) {
      console.error(`Error al obtener instituto con ID ${id}:`, error);
      throw error.response?.data?.message || 'Error al cargar instituto.';
    }
  },

  createSchool: async (schoolData: CreateSchoolDTO): Promise<School> => {
    try {
      const response = await API.post('/schools', schoolData);
      // Asumiendo que la API devuelve la instituto recién creada directamente
      return response.data;
    } catch (error: any) {
      console.error('Error al crear instituto:', error);
      throw error.response?.data?.message || 'Error al crear instituto.';
    }
  },

  updateSchool: async (id: number, schoolData: UpdateSchoolDTO): Promise<School> => {
    try {
      const response = await API.put(`/schools/${id}`, schoolData);
      // Asumiendo que la API devuelve la instituto actualizada directamente
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar instituto:', error);
      throw error.response?.data?.message || 'Error al actualizar instituto.';
    }
  },

  deleteSchool: async (id: number): Promise<void> => {
    try {
      await API.delete(`/schools/${id}`);
    } catch (error: any) {
      console.error('Error al eliminar instituto:', error);
      throw error.response?.data?.message || 'Error al eliminar instituto.';
    }
  },
}
