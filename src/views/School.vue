<template>
  <v-container>
    <h1 class="text-h4 mb-4">Gestión de Institutos</h1>

    <v-alert v-if="schoolStore.error" type="error" class="mb-4">
      {{ schoolStore.error }}
    </v-alert>

    <v-card>
      <v-card-title class="d-flex align-center">
        Lista de Institutos
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addSchool">
          <v-icon start>fa-solid fa-plus</v-icon>
          Añadir Instituto
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="schoolStore.getSchools"
          :loading="schoolStore.isLoading"
          item-key="id"
          class="elevation-1"
          no-data-text="No hay institutos disponibles."
          loading-text="Cargando institutos..."
        >
        <template v-slot:item.actions="{ item }">
          <v-btn icon flat small class="mr-2" @click="editSchool(item)">
            <v-icon>fa-solid fa-pen</v-icon>
          </v-btn>
          <v-btn icon flat small class="mr-2" @click="deleteConfirm(item)">
            <v-icon>fa-solid fa-trash</v-icon>
          </v-btn>
        </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">¿Estás seguro de que quieres eliminar este instituto?</v-card-title>
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
            <v-card-title class="text-h5">{{ formTitle }} Instituto</v-card-title>
            <v-card-text>
              <v-form ref="schoolFormRef"> <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedSchool.name"
                        label="Nombre *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedSchool.city"
                        label="Ciudad *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedSchool.zipcode"
                        label="Código Postal *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedSchool.address"
                        label="Dirección *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedSchool.phone"
                        label="Teléfono"
                        :rules="[rules.phone]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedSchool.email"
                        label="Email"
                        :rules="[rules.email]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedSchool.website"
                        label="Sitio Web"
                        :rules="[rules.url]"
                      ></v-text-field>
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
import { ref, onMounted, computed, nextTick } from 'vue';
import { useSchoolStore } from '../stores/schoolStore';
import type { School, CreateSchoolDTO, UpdateSchoolDTO } from '../types/School';
import { showToast } from '../composables/useToast';

const schoolStore = useSchoolStore();

// Referencia al formulario para la validación
const schoolFormRef = ref<HTMLFormElement | null>(null);

// Cabeceras de la tabla de datos
const headers = ref([
  { title: 'Nombre', key: 'name' },
  { title: 'Ciudad', key: 'city' },
  { title: 'Dirección', key: 'address' },
  { title: 'Código Postal', key: 'zipcode' },
  { title: 'Email', key: 'email' },
  { title: 'Teléfono', key: 'phone' },
  // { title: 'Web', key: 'website' },
  { title: 'Acciones', key: 'actions', sortable: false },
]);

// Variables para manejar diálogos y el instituto en edición/eliminación
const dialogDelete = ref(false);
const dialogForm = ref(false);

const defaultSchool: CreateSchoolDTO = {
  name: '',
  city: '',
  address: '',
  zipcode: '',
  phone: '',
  email: '',
  website: ''
};
const editedSchool = ref<School | CreateSchoolDTO>(JSON.parse(JSON.stringify(defaultSchool)));

const formTitle = computed(() => 'id' in editedSchool.value ? 'Editar' : 'Añadir');

// Reglas de validación
const rules = {
  required: (value: string | null | undefined) => !!value || 'Campo requerido.',
  email: (value: string | null | undefined) => {
    if (!value) return true;
    return /.+@.+\..+/.test(value) || 'Email no válido.';
  },
  phone: (value: string | null | undefined) => {
    if (!value) return true;
    return /^\+?(\d{1,3})?\s?(\d{1,})?([\s\d]{6,})?$/.test(value) || 'Número de teléfono no válido.';
  },
  url: (value: string | null | undefined) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch (_) {
      return 'URL no válida.';
    }
  }
};

// --- Hook de Ciclo de Vida ---
onMounted(async () => {
  await schoolStore.fetchSchools();
});

// --- Métodos de Interacción ---

const addSchool = () => {
  editedSchool.value = JSON.parse(JSON.stringify(defaultSchool));
  dialogForm.value = true;
};

const editSchool = (school: School) => {
  editedSchool.value = { ...school };
  dialogForm.value = true;
};

const deleteConfirm = (school: School) => {
  editedSchool.value = school;
  dialogDelete.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const closeForm = async () => {
  dialogForm.value = false;
  await nextTick(); // Espera a que el diálogo se cierre completamente
  if (schoolFormRef.value) {
    schoolFormRef.value.resetValidation();
  }
  editedSchool.value = JSON.parse(JSON.stringify(defaultSchool));
};

const deleteItemConfirm = async () => {
  if (editedSchool.value && 'id' in editedSchool.value) {
    try {
      await schoolStore.deleteSchool(editedSchool.value.id);
      showToast('Instituto eliminado correctamente.', 'success');
      closeDelete();
    } catch (error) {
      console.error("Error al eliminar instituto:", error);
    }
  }
};

const saveForm = async () => {
  if (schoolFormRef.value) {
    const { valid } = await schoolFormRef.value.validate();
    if (!valid) {
      return;
    }
  }

  if (editedSchool.value) {
    try {
      if ('id' in editedSchool.value) {
        await schoolStore.updateSchool(editedSchool.value.id, editedSchool.value as UpdateSchoolDTO);
        showToast('Instituto actualizado correctamente.', 'success');
      } else {
        await schoolStore.addSchool(editedSchool.value as CreateSchoolDTO);
        showToast('Instituto creado correctamente.', 'success');
      }
      closeForm();
    } catch (error) {
      console.error("Error al guardar instituto:", error);
    }
  }
};
</script>
