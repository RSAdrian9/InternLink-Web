// src/stores/schoolStore.ts
import { defineStore } from 'pinia';
import { schoolService } from '@/services/schoolService';
import type { School, CreateSchoolDTO, UpdateSchoolDTO } from '@/types/School';

interface SchoolState {
  schools: School[];
  isLoading: boolean;
  error: string | null;
}

export const useSchoolStore = defineStore('school', {
  state: (): SchoolState => ({
    schools: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getSchools: (state) => state.schools,
    getSchoolById: (state) => (id: number) => state.schools.find(school => school.id === id),
  },

  actions: {
    async fetchSchools() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await schoolService.getAllSchools();
        this.schools = Array.isArray(data) ? data : [];
      } catch (err: any) {
        this.error = err.message || 'Error al cargar los institutos.';
        console.error('Error fetching schools:', err);
        this.schools = [];
      } finally {
        this.isLoading = false;
      }
    },

    async addSchool(schoolData: CreateSchoolDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const newSchool = await schoolService.createSchool(schoolData);
        this.schools.push(newSchool);
        return newSchool;
      } catch (err: any) {
        this.error = err.message || 'Error al añadir el instituto.';
        console.error('Error adding school:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateSchool(id: number, schoolData: UpdateSchoolDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const updatedSchool = await schoolService.updateSchool(id, schoolData);
        const index = this.schools.findIndex(s => s.id === updatedSchool.id);
        if (index !== -1) {
          this.schools[index] = updatedSchool;
        }
        return updatedSchool;
      } catch (err: any) {
        this.error = err.message || 'Error al actualizar el instituto.';
        console.error('Error updating school:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteSchool(id: number) {
      this.isLoading = true;
      this.error = null;
      try {
        await schoolService.deleteSchool(id);
        this.schools = this.schools.filter(school => school.id !== id);
      } catch (err: any) {
        this.error = err.message || 'Error al eliminar el instituto.';
        console.error('Error deleting school:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});