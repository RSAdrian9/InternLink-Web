import { defineStore } from 'pinia';
import type { User } from '@/types/User';
import { loginUser, registerUser, logoutUser, getCurrentUserProfile, type AuthResponse } from '@/services/AuthService';

interface State {
  currentUser: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    currentUser: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUserId: (state) => state.currentUser?.id ?? null,
    currentUserRole: (state) => state.currentUser?.role ?? null,
    // Puedes tener otros getters relacionados con el usuario autenticado
  },

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      try {
        const response: AuthResponse = await loginUser(email, password);

        this.token = response.token;
        this.currentUser = response.user;
        localStorage.setItem('token', response.token);
        console.log('¡Login exitoso! Token del usuario:', this.token);
        return true;
      } catch (error: any) {
        this.error = error.message || 'Error desconocido al iniciar sesión.';
        console.error('Login failed in store:', error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async register(name: string, email: string, password: string): Promise<boolean> {
      this.isLoading = true;
      this.error = null;
      try {
        const response: AuthResponse = await registerUser(name, email, password);

        this.token = response.token;
        this.currentUser = response.user; // Asigna al 'currentUser'
        localStorage.setItem('token', response.token);

        return true;
      } catch (error: any) {
        this.error = error.message || 'Error desconocido al registrarse.';
        console.error('Registration failed in store:', error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async logout(): Promise<void> {
      this.isLoading = true;
      this.error = null;
      try {
        await logoutUser();
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('token');
      } catch (error: any) {
        console.error('Logout failed in store:', error);
        this.error = error.message || 'Error al cerrar sesión.';
        // Aún así, limpia el estado local
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('token');
      } finally {
        this.isLoading = false;
      }
    },

    // Esta acción es para obtener el perfil del USUARIO AUTENTICADO
    // Es llamada cuando el token está presente pero currentUser no está populado (ej. al recargar la página)
    async fetchCurrentUserProfile(): Promise<boolean> {
      if (!this.token) {
        this.error = 'No hay token de autenticación para obtener el perfil.';
        this.currentUser = null;
        return false;
      }
      this.isLoading = true;
      this.error = null;
      try {
        // <--- CAMBIO CLAVE AQUÍ --->
        // Llama a getCurrentUserProfile del authService
        const profile: User = await getCurrentUserProfile();
        this.currentUser = profile;
        return true;
      } catch (error: any) {
        this.error = error.message || 'Error al obtener el perfil del usuario actual.';
        console.error('Auth Store - Failed to fetch current user profile:', error);
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('token');
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async initializeStore() {
        if (this.token && !this.currentUser) {
            await this.fetchCurrentUserProfile();
        }
    },

    // Acción para actualizar el 'currentUser' si se modifica desde otro lugar (ej. UserStore)
    // El UserStore podría llamar a esto después de una edición exitosa del perfil del usuario actual.
    updateCurrentUserData(updatedData: Partial<User>) {
        if (this.currentUser) {
            this.currentUser = { ...this.currentUser, ...updatedData };
        }
    }
  },
});