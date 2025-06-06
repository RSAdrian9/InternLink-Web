<template>
  <v-container>
    <h1 class="text-h4 mb-4">Mi Perfil</h1>

    <div v-if="authStore.currentUser">
      <p class="text-h6 mb-6">¡Bienvenido de nuevo, {{ authStore.currentUser.name }}!</p>

      <v-card class="pa-4">
        <v-card-title class="text-h5 mb-4">Información del Usuario</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-list density="compact">
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">Nombre:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.name }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">Email:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.email }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">DNI:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.dni }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">Fecha de nacimiento:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.birthdate || 'No especificado' }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">Rol:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.role }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" md="6">
              <v-list density="compact">
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">Teléfono:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.phone || 'No especificado' }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">Ciudad:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.city || 'No especificada' }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="font-weight-medium">Código Postal:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.zipcode || 'No especificado' }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-if="authStore.currentUser.role === 'Student'">
                  <v-list-item-title class="font-weight-medium">Grado/Carrera:</v-list-item-title>
                  <v-list-item-subtitle>{{ authStore.currentUser.degree || 'No especificado' }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn color="primary" @click="editProfile">Editar Perfil</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <p>Cargando información del perfil...</p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const editProfile = () => {
  console.log('Botón Editar Perfil clickeado. Implementar lógica de edición.');
  // Aquí redirigiríamos a una vista de edición de perfil o abriríamos un diálogo
  // Ejemplo: router.push({ name: 'EditProfile' });
};

// Se recomienda cargar el perfil si no está disponible, especialmente al recargar la página.
// onMounted(async () => {
//   if (authStore.isAuthenticated && !authStore.currentUser) {
//     await authStore.fetchCurrentUserProfile();
//   }
// });
</script>

<style scoped>
/* Puedes añadir estilos específicos para esta vista aquí si es necesario */
</style>