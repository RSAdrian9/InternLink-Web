// stores/userStore.ts
import { defineStore } from 'pinia';
import type { User } from '@/types/User';
import { getUserById, updateUser, deleteUser, getAllUsers } from '@/services/userService'; // Importa de userService
import { useAuthStore } from './authStore';

interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    // Puedes tener getters para filtrar o transformar la lista de usuarios
    activeUsers: (state) => state.users.filter(user => user.email_verified_at !== null),
    // getOtherUsers: (state) => state.users.filter(user => user.id !== useAuthStore().currentUserId),
  },

  actions: {
    async fetchAllUsers(): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      try {
        const users = await getAllUsers();
        this.users = users;
        return true;
      } catch (error: any) {
        this.error = error.message || 'Error al cargar la lista de usuarios.';
        console.error('User Store - Failed to fetch all users:', error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserById(id: number): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      try {
        const user = await getUserById(id);
        this.selectedUser = user;
        // Opcional: Actualizar la lista 'users' si el usuario ya existe en ella
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        } else {
            // Si el usuario no estaba en la lista, lo añades (o lo ignoras si solo es para `selectedUser`)
            // this.users.push(user);
        }
        return true;
      } catch (error: any) {
        this.error = error.message || `Error al cargar usuario con ID ${id}.`;
        console.error('User Store - Failed to fetch user by ID:', error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async updateSelectedUser(userData: Partial<User>): Promise<boolean> {
        if (!this.selectedUser?.id) {
            this.error = "No hay usuario seleccionado para actualizar.";
            return false;
        }
        this.isLoading = true;
        this.error = null;
        try {
            const updatedUser = await updateUser(this.selectedUser.id, userData);
            this.selectedUser = updatedUser; // Actualiza el usuario seleccionado

            // Actualiza también la lista `users` si el usuario está presente
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
                this.users[index] = updatedUser;
            }

            // Si el usuario actualizado es el usuario autenticado, ¡actualiza el authStore también!
            const authStore = useAuthStore();
            if (authStore.currentUser?.id === updatedUser.id) {
                authStore.updateCurrentUserData(updatedUser); // Usa la acción del authStore
            }

            return true;
        } catch (error: any) {
            this.error = error.message || `Error al actualizar usuario con ID ${this.selectedUser.id}.`;
            console.error('User Store - Failed to update user:', error);
            return false;
        } finally {
            this.isLoading = false;
        }
    },
    
    async deleteUser(userId: number): Promise<boolean> {
        this.isLoading = true;
        this.error = null;
        try {
            await deleteUser(userId);
            this.users = this.users.filter(user => user.id !== userId); // Elimina de la lista
            if (this.selectedUser?.id === userId) {
                this.selectedUser = null; // Si era el seleccionado, lo deseleccionamos
            }
            // Si el usuario eliminado es el usuario autenticado, ¡también lo deslogueamos!
            const authStore = useAuthStore();
            if (authStore.currentUser?.id === userId) {
                authStore.logout(); // Llama a la acción de logout del authStore
            }
            return true;
        } catch (error: any) {
            this.error = error.message || `Error al eliminar usuario con ID ${userId}.`;
            console.error('User Store - Failed to delete user:', error);
            return false;
        } finally {
            this.isLoading = false;
        }
    },

    // Limpia el usuario seleccionado
    clearSelectedUser() {
      this.selectedUser = null;
    }
  },
});