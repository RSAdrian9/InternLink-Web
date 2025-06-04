<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="mb-4">
          ¡Bienvenido, {{ authStore.currentUser ? authStore.currentUser.name : 'Usuario' }}!
        </h1>
        <p v-if="authStore.currentUser">
          Rol:
          <span class="font-weight-bold">{{
            authStore.currentUser.role
              ? authStore.currentUser.role.charAt(0).toUpperCase() +
                authStore.currentUser.role.slice(1)
              : 'N/A'
          }}</span>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title>Estudiantes Registrados</v-card-title>
          <v-card-text class="text-h4 font-weight-bold">120</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title>Escuelas Asociadas</v-card-title>
          <v-card-text class="text-h4 font-weight-bold">35</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title>Compañías Participantes</v-card-title>
          <v-card-text class="text-h4 font-weight-bold">50</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title>Próximas Prácticas</v-card-title>
          <v-card-text>
            Aquí iría una lista o tabla de las próximas prácticas.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
</script>