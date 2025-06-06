import API from '@/services/client/api'
import type { Company, CreateCompanyDTO, UpdateCompanyDTO } from '@/types/Company';

export const companyService = {
  getAllCompanies: async (): Promise<Company[]> => {
    try {
      const response = await API.get('/companies');
      // Esperamos el formato paginado de Laravel: { data: [...], links: {...}, meta: {...} }
      return response.data.data;
    } catch (error: any) {
      console.error('Error al obtener todas las empresas:', error);
      throw error.response?.data?.message || 'Error al cargar empresas.';
    }
  },

  getCompanyById: async (id: number): Promise<Company> => {
    try {
      const response = await API.get(`/companies/${id}`);
      return response.data; // Asumiendo que no está paginado para un solo item
    } catch (error: any) {
      console.error(`Error al obtener empresa con ID ${id}:`, error);
      throw error.response?.data?.message || 'Error al cargar empresa.';
    }
  },

  createCompany: async (companyData: CreateCompanyDTO): Promise<Company> => {
    try {
      const response = await API.post('/companies', companyData);
      // Asumiendo que la API devuelve la empresa recién creada directamente
      return response.data;
    } catch (error: any) {
      console.error('Error al crear empresa:', error);
      throw error.response?.data?.message || 'Error al crear empresa.';
    }
  },

updateCompany: async (id: number, companyData: UpdateCompanyDTO): Promise<Company> => {
    try {
      const response = await API.put(`/companies/${id}`, companyData);
      // Asumiendo que la API devuelve la empresa actualizada directamente
      return response.data;
    } catch (error: any) {
      console.error('Error al actualizar empresa:', error);
      throw error.response?.data?.message || 'Error al actualizar empresa.';
    }
  },

  deleteCompany: async (id: number): Promise<void> => {
    try {
      await API.delete(`/companies/${id}`);
    } catch (error: any) {
      console.error('Error al eliminar empresa:', error);
      throw error.response?.data?.message || 'Error al eliminar empresa.';
    }
  },
};