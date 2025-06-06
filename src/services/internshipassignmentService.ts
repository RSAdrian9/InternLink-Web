import API from '@/services/client/api'
import type { InternshipAssignment, CreateInternshipAssignmentDTO, UpdateInternshipAssignmentDTO } from '@/types/InternshipAssignment';

export const internshipAssignmentService = {
  /**
   * Obtiene todas las asignaciones de prácticas.
   * @returns Una promesa que resuelve con un array de objetos InternshipAssignment.
   */
  getAllInternshipAssignments: async (): Promise<InternshipAssignment[]> => {
    try {
      const response = await API.get('/internshipassignments');
      return response.data.data;
    } catch (error: any) {
      console.error('Error al obtener todas las asignaciones de prácticas:', error);
      throw error.response?.data?.message || 'Error al cargar las asignaciones de prácticas.';
    }
  },

  /**
   * Obtiene una asignación de prácticas por su ID.
   * @param id El ID de la asignación.
   * @returns Una promesa que resuelve con un objeto InternshipAssignment.
   */
  getInternshipAssignmentById: async (id: number): Promise<InternshipAssignment> => {
    try {
      const response = await API.get(`/internshipassignments/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error al obtener asignación con ID ${id}:`, error);
      throw error.response?.data?.message || `Error al cargar la asignación ${id}.`;
    }
  },

  /**
   * Crea una nueva asignación de prácticas.
   * @param data Los datos para crear la asignación, conformes a CreateInternshipAssignmentDTO.
   * @returns Una promesa que resuelve con el objeto InternshipAssignment creado (con ID y valores por defecto).
   */
  createInternshipAssignment: async (data: CreateInternshipAssignmentDTO): Promise<InternshipAssignment> => {
    try {
      const response = await API.post('/internshipassignments', data);
      return response.data;
    } catch (error: any) {
      console.error('Error al crear la asignación de prácticas:', error);
      throw error.response?.data?.message || 'Error al crear la asignación de prácticas.';
    }
  },

  /**
   * Actualiza una asignación de prácticas existente.
   * @param id El ID de la asignación a actualizar.
   * @param data Los datos a actualizar, conformes a UpdateInternshipAssignmentDTO.
   * @returns Una promesa que resuelve con el objeto InternshipAssignment actualizado.
   */
  updateInternshipAssignment: async (id: number, data: UpdateInternshipAssignmentDTO): Promise<InternshipAssignment> => {
    try {
      const response = await API.put(`/internshipassignments/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error(`Error al actualizar asignación con ID ${id}:`, error);
      throw error.response?.data?.message || `Error al actualizar la asignación ${id}.`;
    }
  },

  /**
   * Elimina una asignación de prácticas por su ID.
   * @param id El ID de la asignación a eliminar.
   * @returns Una promesa que resuelve cuando la eliminación es exitosa.
   */
  deleteInternshipAssignment: async (id: number): Promise<void> => {
    try {
      await API.delete(`/internshipassignments/${id}`);
    } catch (error: any) {
      console.error(`Error al eliminar asignación con ID ${id}:`, error);
      throw error.response?.data?.message || `Error al eliminar la asignación ${id}.`;
    }
  },

  /**
   * Obtiene asignaciones de prácticas por el ID de un estudiante.
   * @param student_id El ID del estudiante.
   * @returns Una promesa que resuelve con un array de objetos InternshipAssignment.
   */
  // getInternshipAssignmentsByStudentId: async (student_id: number): Promise<InternshipAssignment[]> => {
  //   try {
  //     const response = await API.get(`/internshipassignments?student_id=${student_id}`);
  //     return response.data.data;
  //   } catch (error: any) {
  //     console.error(`Error al obtener asignaciones para el estudiante ${student_id}:`, error);
  //     throw error.response?.data?.message || `Error al cargar asignaciones para el estudiante ${student_id}.`;
  //   }
  // },

  /**
   * Obtiene asignaciones de prácticas por el ID de una empresa.
   * @param company_id El ID de la empresa.
   * @returns Una promesa que resuelve con un array de objetos InternshipAssignment.
   */
  // getInternshipAssignmentsByCompanyId: async (company_id: number): Promise<InternshipAssignment[]> => {
  //   try {
  //     const response = await API.get(`/internshipassignments?company_id=${company_id}`);
  //     return response.data.data;
  //   } catch (error: any) {
  //     console.error(`Error al obtener asignaciones para la empresa ${company_id}:`, error);
  //     throw error.response?.data?.message || `Error al cargar asignaciones para la empresa ${company_id}.`;
  //   }
  // },

    /**
   * Obtiene asignaciones de prácticas por el ID de un tutor.
   * Esto es útil para que un tutor vea las asignaciones bajo su supervisión.
   * @param tutor_id El ID del tutor.
   * @returns Una promesa que resuelve con un array de objetos InternshipAssignment.
   */
  // getInternshipAssignmentsByTutorId: async (tutor_id: number): Promise<InternshipAssignment[]> => {
  //   try {
  //     const response = await API.get(`/internshipassignments?tutor_id=${tutor_id}`);
  //     return response.data.data;
  //   } catch (error: any) {
  //     console.error(`Error al obtener asignaciones para el tutor ${tutor_id}:`, error);
  //     throw error.response?.data?.message || `Error al cargar asignaciones para el tutor ${tutor_id}.`;
  //   }
  // },
};