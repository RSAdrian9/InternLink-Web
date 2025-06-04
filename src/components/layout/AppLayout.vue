<template>
  <v-app>
    <Navbar v-if="showFullLayout" />
    <Sidebar v-if="showFullLayout" />

    <v-main>
      <!-- <v-container fluid :class="{ 'pl-16': showFullLayout }"> -->
        <router-view />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/layout/Navbar.vue'; // Asegúrate de que la ruta sea correcta
import Sidebar from '@/components/layout/Sidebar.vue'; // Asegúrate de que la ruta sea correcta

const route = useRoute();

const showFullLayout = computed(() => {
  // Las rutas donde NO queremos ver el Navbar ni el Sidebar
  const excludedRoutes = ['/', '/login', '/welcome'];
  const shouldShow = !excludedRoutes.includes(route.path);

  // --- CONSOLE LOGS PARA DEPURACIÓN (puedes quitarlos una vez funcione) ---
  console.log('--- AppLayout Debug ---');
  console.log('Current route path:', route.path);
  console.log('Excluded routes for full layout:', excludedRoutes);
  console.log('Should show full layout (Navbar + Sidebar)?', shouldShow);
  console.log('-----------------------');
  // --------------------------------------------------------------------

  return shouldShow;
});

// Computada para controlar la visibilidad del sidebar
// const showSidebar = computed(() => {
//   const excludedRoutes = ['/', '/login', '/welcome'];
//   return !excludedRoutes.includes(route.path);
// });
</script>