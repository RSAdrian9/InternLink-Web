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

    <v-row class="mt-4">
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="4" rounded="lg">
          <v-card-item>
            <div class="d-flex align-center justify-space-between">
              <v-card-title class="text-h6 font-weight-bold">Estudiantes en Prácticas</v-card-title>
              <v-icon color="blue-grey lighten-1" size="56">mdi-account-group</v-icon>
            </div>
            <v-card-text class="text-h4 font-weight-bold mt-2">
              <span v-if="loadingAssignments">
                <v-progress-circular indeterminate size="32" color="primary"></v-progress-circular>
              </span>
              <span v-else-if="errorLoadingAssignments" class="text-error">Error</span>
              <span v-else>{{ studentCount }}</span>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="4" rounded="lg">
          <v-card-item>
            <div class="d-flex align-center justify-space-between">
              <v-card-title class="text-h6 font-weight-bold">Tutores en Prácticas</v-card-title>
              <v-icon color="brown lighten-1" size="56">mdi-account-tie</v-icon>
            </div>
            <v-card-text class="text-h4 font-weight-bold mt-2">
              <span v-if="loadingAssignments">
                <v-progress-circular indeterminate size="32" color="primary"></v-progress-circular>
              </span>
              <span v-else-if="errorLoadingAssignments" class="text-error">Error</span>
              <span v-else>{{ tutorCount }}</span>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="4" rounded="lg">
          <v-card-item>
            <div class="d-flex align-center justify-space-between">
              <v-card-title class="text-h6 font-weight-bold">Empresas con Prácticas</v-card-title>
              <v-icon color="green lighten-1" size="56">mdi-domain</v-icon>
            </div>
            <v-card-text class="text-h4 font-weight-bold mt-2">
              <span v-if="loadingAssignments">
                <v-progress-circular indeterminate size="32" color="primary"></v-progress-circular>
              </span>
              <span v-else-if="errorLoadingAssignments" class="text-error">Error</span>
              <span v-else>{{ companyCount }}</span>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="pa-4" elevation="4" rounded="lg">
          <v-card-title class="d-flex align-center text-h6 font-weight-bold">
            <v-icon class="mr-2" color="primary">mdi-calendar-check</v-icon>
            Próximas Prácticas
          </v-card-title>
          <v-card-text>
            <v-progress-circular v-if="loadingAssignments" indeterminate color="primary" class="d-block mx-auto my-4"></v-progress-circular>
            <v-alert v-else-if="errorLoadingAssignments" type="error" dense variant="tonal" class="mt-4">
              Error al cargar las asignaciones de prácticas.
            </v-alert>
            <v-list v-else-if="upcomingAssignments.length > 0" lines="two">
              <v-list-item
                v-for="assignment in upcomingAssignments.slice(0, 5)" :key="assignment.id"
                :title="`${assignment.student?.name || 'Estudiante N/A'} en ${assignment.company?.name || 'Empresa N/A'}`"
                :subtitle="`Inicio: ${assignment.start_date} - Fin: ${assignment.end_date} (Tutor: ${assignment.tutor?.name || 'N/A'})`"
                prepend-icon="mdi-briefcase-outline"
              >
                <template v-slot:append>
                  <v-chip
                    :color="assignment.status === 'Approved' ? 'success' : (assignment.status === 'Pending' ? 'warning' : 'info')"
                    size="small"
                    class="font-weight-medium"
                  >
                    {{ assignment.status }}
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
            <v-alert v-else type="info" variant="tonal" class="mt-4">
              No hay próximas prácticas programadas. ¡Es un buen momento para añadir algunas!
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useInternshipAssignmentStore } from '../stores/internshipassignmentStore';
import type { InternshipAssignment } from '../types/InternshipAssignment';

const authStore = useAuthStore();
const internshipAssignmentStore = useInternshipAssignmentStore();

// Usamos una sola variable de carga y error para todas las asignaciones
const loadingAssignments = ref(true);
const errorLoadingAssignments = ref(false);

// ---- Recuentos basados en las asignaciones de prácticas cargadas ----
// Usamos Set para asegurar unicidad
const studentCount = computed(() => {
  const uniqueStudentIds = new Set<number>();
  internshipAssignmentStore.internshipAssignments.forEach(assignment => {
    if (assignment.student_id) { // Asegura que el ID existe
      uniqueStudentIds.add(assignment.student_id);
    }
  });
  return uniqueStudentIds.size;
});

const tutorCount = computed(() => {
  const uniqueTutorIds = new Set<number>();
  internshipAssignmentStore.internshipAssignments.forEach(assignment => {
    if (assignment.tutor_id) { // Asegura que el ID existe
      uniqueTutorIds.add(assignment.tutor_id);
    }
  });
  return uniqueTutorIds.size;
});

const companyCount = computed(() => {
  const uniqueCompanyIds = new Set<number>();
  internshipAssignmentStore.internshipAssignments.forEach(assignment => {
    if (assignment.company_id) { // Asegura que el ID existe
      uniqueCompanyIds.add(assignment.company_id);
    }
  });
  return uniqueCompanyIds.size;
});

// ---- Filtrar "Próximas Prácticas" del array completo de asignaciones ----
const upcomingAssignments = computed(() => {
  const now = new Date();
  // Filtra las asignaciones cuya fecha de inicio es igual o posterior a hoy
  // y que tienen un estado de 'Pending' o 'Approved'
  return internshipAssignmentStore.internshipAssignments
    .filter(assignment => {
      const startDate = new Date(assignment.start_date);
      return (startDate >= now && (assignment.status === 'Pending' || assignment.status === 'Approved'));
    })
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()); // Ordenar por fecha
});


onMounted(async () => {
  // Cargar TODAS las asignaciones de prácticas
  loadingAssignments.value = true;
  errorLoadingAssignments.value = false;
  try {
    // ASUMIMOS que esta acción carga TODAS las asignaciones en el estado del store
    // Y que los objetos de asignación incluyen student, tutor y company con sus nombres.
    await internshipAssignmentStore.fetchInternshipAssignments();
  } catch (error) {
    console.error('Error al cargar todas las asignaciones de prácticas:', error);
    errorLoadingAssignments.value = true;
  } finally {
    loadingAssignments.value = false;
  }
});
</script>

<style scoped>
/* Puedes añadir estilos específicos para este componente aquí si lo necesitas */
</style>