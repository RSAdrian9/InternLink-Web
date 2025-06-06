// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { userService } from '@/services/userService';
import type { User, UserRole, CreateUserDTO, UpdateUserDTO } from '@/types/User';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [], // Inicializado correctamente como un array vacío
    isLoading: false,
    error: null,
  }),

  getters: {
    // Estos getters esperan que 'state.users' SIEMPRE sea un array
    getStudents: (state) => state.users.filter(user => user.role === 'Student'),
    getTutors: (state) => state.users.filter(user => user.role === 'Tutor'),
    getUserById: (state) => (id: number) => state.users.find(user => user.id === id),
    // Añade un getter para filtrar por rol
    getStudentsCount(state) {
      return state.users.filter(user => user.role === 'Student').length;
    },
    getTutorsCount(state) {
      return state.users.filter(user => user.role === 'Tutor').length;
    },
  },

  actions: {
    async fetchAllUsers() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await userService.getAllUsers();
        // IMPORTANTE: Aseguramos que 'data' sea un array. Si no lo es, asignamos un array vacío.
        this.users = Array.isArray(data) ? data : [];
      } catch (err: any) {
        this.error = err.message || 'Error al cargar todos los usuarios.';
        console.error('Error fetching all users:', err);
        this.users = []; // También, si hay un error, reseteamos a un array vacío
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUsersByRole(role: UserRole) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await userService.getUsersByRole(role);
        // IMPORTANTE: Aseguramos que 'data' sea un array. Si no lo es, asignamos un array vacío.
        this.users = Array.isArray(data) ? data : [];
      } catch (err: any) {
        this.error = err.message || `Error al cargar usuarios con rol ${role}.`;
        console.error(`Error fetching users with role ${role}:`, err);
        this.users = []; // También, si hay un error, reseteamos a un array vacío
      } finally {
        this.isLoading = false;
      }
    },

    // El resto de tus acciones (addUser, updateExistingUser, deleteUser) no necesitan esta comprobación
    // porque esperan un objeto User individual como retorno o manipulan this.users directamente.
    async addUser(userData: CreateUserDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const newUser = await userService.createUser(userData);
        this.users.push(newUser);
        return newUser;
      } catch (err: any) {
        this.error = err.message || 'Error al añadir usuario.';
        console.error('Error adding user:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateExistingUser(id: number, userData: UpdateUserDTO) {
      this.isLoading = true;
      this.error = null;
      try {
        const updatedUser = await userService.updateUser(id, userData);
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        return updatedUser;
      } catch (err: any) {
        this.error = err.message || 'Error al actualizar usuario.';
        console.error('Error updating user:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteUser(id: number) {
      this.isLoading = true;
      this.error = null;
      try {
        await userService.deleteUser(id);
        this.users = this.users.filter(user => user.id !== id);
      } catch (err: any) {
        this.error = err.message || 'Error al eliminar usuario.';
        console.error('Error deleting user:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});