<template>
  <v-container>
    <h1 class="text-h4 mb-4">Gestión de Asignaciones de Prácticas</h1>

    <v-alert v-if="internshipAssignmentStore.error" type="error" class="mb-4">
      {{ internshipAssignmentStore.error }}
    </v-alert>

    <v-card>
      <v-card-title class="d-flex align-center">
        Lista de Asignaciones
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addAssignment">
          <v-icon start>fa-solid fa-plus</v-icon>
          Añadir Asignación
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="internshipAssignmentStore.getInternshipAssignments"
          :loading="internshipAssignmentStore.isLoading"
          item-key="id"
          class="elevation-1"
          no-data-text="No hay asignaciones de prácticas disponibles."
          loading-text="Cargando asignaciones..."
        >
          <template v-slot:item.student_name="{ item }">
            {{ item.student ? item.student.name : 'N/A' }}
          </template>
          <template v-slot:item.tutor_name="{ item }">
            {{ item.tutor ? item.tutor.name : 'N/A' }}
          </template>
          <template v-slot:item.company_name="{ item }">
            {{ item.company ? item.company.name : 'N/A' }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon flat small class="mr-2" @click="editAssignment(item)">
              <v-icon>fa-solid fa-pen</v-icon>
            </v-btn>
            <v-btn icon flat small @click="deleteConfirm(item)">
              <v-icon>fa-solid fa-trash</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">¿Estás seguro de que quieres eliminar esta asignación?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
          <v-btn color="red-darken-1" variant="text" @click="deleteItemConfirm">Eliminar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogForm" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">{{ formTitle }} Asignación</v-card-title>
        <v-card-text>
          <v-form ref="assignmentFormRef">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedAssignment.student_id"
                    :items="userStore.getStudents"
                    item-title="name"
                    item-value="id"
                    label="Estudiante *"
                    :loading="userStore.isLoading"
                    :rules="[rules.required]"
                    clearable
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedAssignment.tutor_id"
                    :items="userStore.getTutors"
                    item-title="name"
                    item-value="id"
                    label="Tutor *"
                    :loading="userStore.isLoading"
                    :rules="[rules.required]"
                    clearable
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="editedAssignment.company_id"
                    :items="companyStore.getCompanies"
                    item-title="name"
                    item-value="id"
                    label="Empresa *"
                    :loading="companyStore.isLoading"
                    :rules="[rules.required]"
                    clearable
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="startDateMenu"
                    :close-on-content-click="false"
                    location="end"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        v-bind="props"
                        v-model="editedAssignment.start_date"
                        label="Fecha de Inicio *"
                        readonly
                        :rules="[rules.required, rules.date]"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="internalStartDate"
                      @update:model-value="formatStartDate"
                      color="primary"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="6">
                <v-menu
                    v-model="endDateMenu"
                    :close-on-content-click="false"
                    location="end"
                >
                    <template v-slot:activator="{ props }">
                    <v-text-field
                        v-bind="props"
                        v-model="editedAssignment.end_date"
                        label="Fecha de Fin *"
                        readonly
                        :rules="[rules.required, rules.date, rules.endDateAfterStartDate]"
                        required
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="internalEndDate"
                    @update:model-value="formatEndDate"
                    color="primary"
                    ></v-date-picker>
                </v-menu>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedAssignment.status"
                    :items="internshipStatusOptions"
                    label="Estado"
                    :rules="[rules.required]"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedAssignment.evaluation"
                    :items="internshipEvaluationOptions"
                    label="Evaluación"
                    :rules="[rules.required]"
                    required
                  ></v-select>
                </v-col>

                </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeForm">Cancelar</v-btn>
          <v-btn color="primary" @click="saveForm">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { useInternshipAssignmentStore } from '../stores/internshipassignmentStore';
import { useUserStore } from '../stores/userStore';
import { useCompanyStore } from '../stores/companyStore';
import type {
  InternshipAssignment,
  CreateInternshipAssignmentDTO,
  UpdateInternshipAssignmentDTO,
  InternshipStatus,
  InternshipEvaluation
} from '../types/InternshipAssignment';
import { showToast } from '../composables/useToast';

const internshipAssignmentStore = useInternshipAssignmentStore();
const userStore = useUserStore();
const companyStore = useCompanyStore();

const assignmentFormRef = ref<HTMLFormElement | null>(null);

const internshipStatusOptions: InternshipStatus[] = ['Pending', 'Approved', 'Finished', 'Rejected'];
const internshipEvaluationOptions: InternshipEvaluation[] = ['Passed', 'Failed', 'Not Evaluated'];

const headers = ref([
  { title: 'Estudiante', key: 'student_name' },
  { title: 'Tutor', key: 'tutor_name' },
  { title: 'Empresa', key: 'company_name' },
  { title: 'Inicio', key: 'start_date' },
  { title: 'Fin', key: 'end_date' },
  { title: 'Estado', key: 'status' },
  { title: 'Evaluación', key: 'evaluation' },
  { title: 'Acciones', key: 'actions', sortable: false },
]);

const dialogDelete = ref(false);
const dialogForm = ref(false);

const startDateMenu = ref(false);
const endDateMenu = ref(false);

const defaultAssignment: CreateInternshipAssignmentDTO = {
  student_id: null as any,
  tutor_id: null as any,
  company_id: null as any,
  start_date: '',
  end_date: '',
};

type EditedAssignmentType = Omit<InternshipAssignment, 'id'> | (CreateInternshipAssignmentDTO & { id?: number; status: InternshipStatus; evaluation: InternshipEvaluation; });

const editedAssignment = ref<EditedAssignmentType>(
  JSON.parse(JSON.stringify({
    ...defaultAssignment,
    status: 'Pending',
    evaluation: 'Not Evaluated'
  }))
);

const internalStartDate = ref<Date | null>(editedAssignment.value.start_date ? new Date(editedAssignment.value.start_date) : null);
const internalEndDate = ref<Date | null>(editedAssignment.value.end_date ? new Date(editedAssignment.value.end_date) : null);

// Funciones para formatear la fecha seleccionada y cerrar el menú
const formatStartDate = (date: Date | null) => {
  if (date) {
    editedAssignment.value.start_date = date.toISOString().split('T')[0];
  } else {
    editedAssignment.value.start_date = '';
  }
  startDateMenu.value = false;
};

const formatEndDate = (date: Date | null) => {
  if (date) {
    editedAssignment.value.end_date = date.toISOString().split('T')[0];
  } else {
    editedAssignment.value.end_date = '';
  }
  endDateMenu.value = false;
};

// Observadores para actualizar los internalDates cuando editedAssignment cambia
watch(() => editedAssignment.value.start_date, (newDateString) => {
  internalStartDate.value = newDateString ? new Date(newDateString) : null;
});

watch(() => editedAssignment.value.end_date, (newDateString) => {
  internalEndDate.value = newDateString ? new Date(newDateString) : null;
});


const formTitle = computed(() => 'id' in editedAssignment.value ? 'Editar' : 'Añadir');

// Reglas de validación
const rules = {
  required: (value: any) => (value !== null && value !== undefined && value !== '') || 'Campo requerido.',
  date: (value: string | null | undefined) => {
    if (!value) return true;
    return /^\d{4}-\d{2}-\d{2}$/.test(value) || 'Formato de fecha YYYY-MM-DD.';
  },
  endDateAfterStartDate: (value: string) => {
    if (!editedAssignment.value.start_date || !value) return true;
    const startDate = new Date(editedAssignment.value.start_date);
    const endDate = new Date(value);
    return endDate >= startDate || 'La fecha de fin debe ser posterior o igual a la de inicio.';
  },
};

// --- Hook de Ciclo de Vida ---
onMounted(async () => {
  await internshipAssignmentStore.fetchInternshipAssignments();
  await userStore.fetchUsersByRole('Student');
  await userStore.fetchUsersByRole('Tutor');
  await companyStore.fetchAllCompanies();
});

// --- Métodos de Interacción ---
const addAssignment = () => {
  editedAssignment.value = JSON.parse(JSON.stringify({
    ...defaultAssignment,
    status: 'Pending',
    evaluation: 'Not Evaluated'
  }));
  dialogForm.value = true;
};

const editAssignment = (assignment: InternshipAssignment) => {
  editedAssignment.value = { ...assignment };
  internalStartDate.value = assignment.start_date ? new Date(assignment.start_date) : null;
  internalEndDate.value = assignment.end_date ? new Date(assignment.end_date) : null;
  dialogForm.value = true;
};

const deleteConfirm = (assignment: InternshipAssignment) => {
  editedAssignment.value = assignment;
  dialogDelete.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const closeForm = async () => {
  dialogForm.value = false;
  await nextTick();
  if (assignmentFormRef.value) {
    assignmentFormRef.value.resetValidation();
  }
  editedAssignment.value = JSON.parse(JSON.stringify({
    ...defaultAssignment,
    status: 'Pending',
    evaluation: 'Not Evaluated'
  }));
  internalStartDate.value = null;
  internalEndDate.value = null;
};

const deleteItemConfirm = async () => {
  if (editedAssignment.value && 'id' in editedAssignment.value) {
    try {
      await internshipAssignmentStore.deleteInternshipAssignment(editedAssignment.value.id);
      showToast('Asignación eliminada correctamente.', 'success');
      closeDelete();
    } catch (error) {
      console.error("Error al eliminar la asignación:", error);
    }
  }
};

const saveForm = async () => {
  if (assignmentFormRef.value) {
    const { valid } = await assignmentFormRef.value.validate();
    if (!valid) {
      return;
    }
  }

  if (editedAssignment.value) {
    try {
      if ('id' in editedAssignment.value) {
        // Para actualizar, usamos UpdateInternshipAssignmentDTO
        const dataToUpdate: UpdateInternshipAssignmentDTO = {
            student_id: Number(editedAssignment.value.student_id),
            tutor_id: Number(editedAssignment.value.tutor_id),
            company_id: Number(editedAssignment.value.company_id),
            start_date: editedAssignment.value.start_date,
            end_date: editedAssignment.value.end_date,
            status: editedAssignment.value.status,
            evaluation: editedAssignment.value.evaluation,
            // description: editedAssignment.value.description // Si lo añades en el template
        };
        await internshipAssignmentStore.updateInternshipAssignment(editedAssignment.value.id, dataToUpdate);
        showToast('Asignación actualizada correctamente.', 'success');
      } else {
        // Para crear, usamos CreateInternshipAssignmentDTO
        const dataToCreate: CreateInternshipAssignmentDTO = {
            student_id: Number(editedAssignment.value.student_id),
            tutor_id: Number(editedAssignment.value.tutor_id),
            company_id: Number(editedAssignment.value.company_id),
            start_date: editedAssignment.value.start_date,
            end_date: editedAssignment.value.end_date,
            status: 'Pending', // Estado por defecto al crear
            evaluation: 'Not Evaluated', // Evaluación por defecto al crear
            // status y evaluation NO se incluyen aquí porque el backend los maneja en la creación
            // description: editedAssignment.value.description // Si lo añades en el template
        };
        await internshipAssignmentStore.addInternshipAssignment(dataToCreate);
        showToast('Asignación creada correctamente.', 'success');
      }
      closeForm();
    } catch (error) {
      console.error("Error al guardar la asignación:", error);
    }
  }
};
</script>
