// src/services/userService.ts
import API from '@/services/client/api'; // Asegúrate de que esta ruta sea correcta para tu instancia de Axios
import type { User, CreateUserDTO, UpdateUserDTO, UserRole } from '@/types/User';

export const userService = {
  /**
   * Obtiene todos los usuarios.
   * @returns Una promesa que resuelve con un array de objetos User.
   */
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await API.get('/users');
      return response.data.data;
    } catch (error: any) {
      console.error('Error al obtener todos los usuarios:', error);
      throw error.response?.data?.message || 'Error al cargar usuarios.';
    }
  },

  /**
   * Obtiene usuarios filtrados por rol.
   * @param role El rol por el cual filtrar (ej. 'Tutor', 'Estudiante').
   * @returns Una promesa que resuelve con un array de objetos User con el rol especificado.
   */
  getUsersByRole: async (role: UserRole): Promise<User[]> => {
    try {
      // Asume que tu backend soporta filtrar por un parámetro de consulta 'role'
      const response = await API.get(`/users?role=${role}`);
      return response.data.data;
    } catch (error: any) {
      console.error(`Error al obtener usuarios con rol ${role}:`, error);
      throw error.response?.data?.message || `Error al cargar usuarios con rol ${role}.`;
    }
  },

  /**
   * Obtiene un usuario por su ID.
   * @param id El ID del usuario.
   * @returns Una promesa que resuelve con un objeto User.
   */
  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await API.get(`/users/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error.response?.data?.message || `Error al cargar usuario ${id}.`;
    }
  },

  /**
   * Crea un nuevo usuario.
   * @param data Los datos para crear el usuario, conformes a CreateUserDTO.
   * @returns Una promesa que resuelve con el objeto User creado.
   */
  createUser: async (data: CreateUserDTO): Promise<User> => {
    try {
      const response = await API.post('/users', data);
      return response.data;
    } catch (error: any) {
      console.error('Error al crear usuario:', error);
      throw error.response?.data?.message || 'Error al crear usuario.';
    }
  },

  /**
   * Actualiza un usuario existente.
   * @param id El ID del usuario a actualizar.
   * @param data Los datos a actualizar, conformes a UpdateUserDTO.
   * @returns Una promesa que resuelve con el objeto User actualizado.
   */
  updateUser: async (id: number, data: UpdateUserDTO): Promise<User> => {
    try {
      const response = await API.put(`/users/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      throw error.response?.data?.message || `Error al actualizar usuario ${id}.`;
    }
  },

  /**
   * Elimina un usuario por su ID.
   * @param id El ID del usuario a eliminar.
   * @returns Una promesa que resuelve cuando la eliminación es exitosa.
   */
  deleteUser: async (id: number): Promise<void> => {
    try {
      await API.delete(`/users/${id}`);
    } catch (error: any) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      throw error.response?.data?.message || `Error al eliminar usuario ${id}.`;
    }
  },
};