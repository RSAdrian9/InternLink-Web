// src/stores/internshipAssignmentStore.ts
import { defineStore } from 'pinia';
import { internshipAssignmentService } from '@/services/internshipassignmentService';
import type { InternshipAssignment, CreateInternshipAssignmentDTO, UpdateInternshipAssignmentDTO } from '@/types/InternshipAssignment';

interface InternshipAssignmentState {
  internshipAssignments: InternshipAssignment[];
  isLoading: boolean;
  error: string | null;
}

export const useInternshipAssignmentStore = defineStore('internshipAssignment', {
  state: (): InternshipAssignmentState => ({
    internshipAssignments: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getInternshipAssignments: (state) => state.internshipAssignments,
    getInternshipAssignmentById: (state) => (id: number) => state.internshipAssignments.find(assignment => assignment.id === id),
    getPendingAssignments: (state) => state.internshipAssignments.filter(a => a.status === 'Pending'),
    getApprovedAssignments: (state) => state.internshipAssignments.filter(a => a.status === 'Approved'),
    getFinishedAssignments: (state) => state.internshipAssignments.filter(a => a.status === 'Finished'),
    getRejectedAssignments: (state) => state.internshipAssignments.filter(a => a.status === 'Rejected'),
  },

  actions: {
    async fetchInternshipAssignments() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await internshipAssignmentService.getAllInternshipAssignments();
        this.internshipAssignments = Array.isArray(data) ? data : [];
      } catch (err: any) {
        this.error = err.message || 'Error al cargar las asignaciones de prácticas.';
        console.error('Error fetching internship assignments:', err);
        this.internshipAssignments = [];
      } finally {
        this.isLoading = false;
      }
    },

    async addInternshipAssignment(assignmentData: CreateInternshipAssignmentDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const newAssignment = await internshipAssignmentService.createInternshipAssignment(assignmentData);
        this.internshipAssignments.push(newAssignment);
        this.fetchInternshipAssignments(); // Refrescar la lista después de añadir
        return newAssignment;
      } catch (err: any) {
        this.error = err.message || 'Error al añadir la asignación de prácticas.';
        console.error('Error adding internship assignment:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateInternshipAssignment(id: number, assignmentData: UpdateInternshipAssignmentDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const updatedAssignment = await internshipAssignmentService.updateInternshipAssignment(id, assignmentData);
        const index = this.internshipAssignments.findIndex(a => a.id === updatedAssignment.id);
        if (index !== -1) {
          this.internshipAssignments[index] = updatedAssignment;
        }
        this.fetchInternshipAssignments(); // Refrescar la lista después de actualizar
        return updatedAssignment;
      } catch (err: any) {
        this.error = err.message || 'Error al actualizar la asignación de prácticas.';
        console.error('Error updating internship assignment:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteInternshipAssignment(id: number) {
      this.isLoading = true;
      this.error = null;
      try {
        await internshipAssignmentService.deleteInternshipAssignment(id);
        this.internshipAssignments = this.internshipAssignments.filter(a => a.id !== id);
        this.fetchInternshipAssignments(); // Refrescar la lista después de eliminar
      } catch (err: any) {
        this.error = err.message || 'Error al eliminar la asignación de prácticas.';
        console.error('Error deleting internship assignment:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});