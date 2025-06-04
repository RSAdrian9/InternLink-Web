<script setup lang="ts">
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue';
// import Sidebar from './components/layout/Sidebar.vue'
// import Navbar from './components/layout/Navbar.vue'

const route = useRoute()

// Rutas donde ocultar Navbar y Sidebar
const noLayoutRoutes = ['/', '/login', '/welcome']
</script>

<template>
  <v-app>
    <!-- Solo mostrar Navbar y Sidebar si no estamos en login -->
    <!-- <Navbar v-if="!noLayoutRoutes.includes(route.path)" />
    <Sidebar v-if="!noLayoutRoutes.includes(route.path)" />
    
    <v-main class="bg-grey-lighten-4">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main> -->
    <AppLayout />
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: #f9f9f9;
}
</style>
