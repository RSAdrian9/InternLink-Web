<template>
  <v-app-bar app color="white" flat>
    <v-toolbar-title>
      <v-btn @click="$router.push('/')">InternLink</v-btn>
    </v-toolbar-title>
    <v-spacer />

    <template v-if="authStore.isAuthenticated && authStore.currentUser">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" text v-bind="props">
            {{ authStore.currentUser.name }}
            <v-icon right>fa-solid fa-caret-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="font-weight-bold">
              Rol: {{ authStore.currentUser.role ? authStore.currentUser.role.charAt(0).toUpperCase() + authStore.currentUser.role.slice(1) : 'N/A' }}
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="$router.push('/profile')">
            <v-list-item-title>
              <v-icon left>fa-solid fa-user-circle</v-icon> Mi Perfil
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="handleLogout" :loading="authStore.isLoading">
            <v-list-item-title>
              <v-icon left>fa-solid fa-sign-out-alt</v-icon> Cerrar Sesión
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <template v-else>
      <v-btn @click="$router.push('/login')" text>Iniciar Sesión / Registrarse</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { showToast } from '@/composables/useToast';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    showToast('Sesión cerrada correctamente.', 'success');
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    showToast(authStore.error || 'Error al cerrar sesión.', 'error');
  }
};
</script>

<style scoped>
/* Tus estilos si los tienes */
.v-btn .v-icon--left {
  margin-right: 8px; /* Ajusta el espacio entre el icono y el texto en el botón */
}
</style>