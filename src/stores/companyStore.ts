// src/stores/companyStore.ts
import { defineStore } from 'pinia';
import { companyService } from '@/services/companyService';
import type { Company, CreateCompanyDTO, UpdateCompanyDTO } from '@/types/Company';

interface CompanyState {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}

export const useCompanyStore = defineStore('company', {
  state: (): CompanyState => ({
    companies: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getCompanies: (state) => state.companies,
    getCompanyById: (state) => (id: number) => state.companies.find(company => company.id === id),
    // Este getter devuelve un array de empresas filtradas por nombre
    getCompaniesCount(state) {
      return state.companies.length;
    }
  },

  actions: {
    async fetchAllCompanies() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await companyService.getAllCompanies();
        this.companies = Array.isArray(data) ? data : [];
      } catch (err: any) {
        this.error = err.message || 'Error al cargar las empresas.';
        console.error('Error fetching companies:', err);
        this.companies = [];
      } finally {
        this.isLoading = false;
      }
    },

    async addCompany(companyData: CreateCompanyDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const newCompany = await companyService.createCompany(companyData);
        this.companies.push(newCompany);
        return newCompany; // Opcional: devuelve la empresa creada
      } catch (err: any) {
        this.error = err.message || 'Error al añadir la empresa.';
        console.error('Error adding company:', err);
        throw err; // Propagar el error para que la vista lo maneje si es necesario
      } finally {
        this.isLoading = false;
      }
    },

    async updateCompany(id: number, companyData: UpdateCompanyDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const updatedCompany = await companyService.updateCompany(id, companyData);
        const index = this.companies.findIndex(c => c.id === updatedCompany.id);
        if (index !== -1) {
          this.companies[index] = updatedCompany;
        }
        return updatedCompany; // Opcional: devuelve la empresa actualizada
      } catch (err: any) {
        this.error = err.message || 'Error al actualizar la empresa.';
        console.error('Error updating company:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteCompany(id: number) {
      this.isLoading = true;
      this.error = null;
      try {
        await companyService.deleteCompany(id);
        this.companies = this.companies.filter(company => company.id !== id);
      } catch (err: any) {
        this.error = err.message || 'Error al eliminar la empresa.';
        console.error('Error deleting company:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});