<template>
  <v-container>
    <h1 class="text-h4 mb-4">Gestión de Empresas</h1>

    <v-alert v-if="companyStore.error" type="error" class="mb-4">
      {{ companyStore.error }}
    </v-alert>

    <v-card>
      <v-card-title class="d-flex align-center">
        Lista de Empresas
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addCompany">
          <v-icon start>fa-solid fa-plus</v-icon>
          Añadir Empresa
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="companyStore.getCompanies"
          :loading="companyStore.isLoading"
          item-key="id"
          class="elevation-1"
          no-data-text="No hay empresas disponibles."
          loading-text="Cargando empresas..."
        >
        <template v-slot:item.actions="{ item }">
          <v-btn icon flat small class="mr-2" @click="editCompany(item)">
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
        <v-card-title class="text-h5">¿Estás seguro de que quieres eliminar esta empresa?</v-card-title>
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
            <v-card-title class="text-h5">{{ formTitle }} Empresa</v-card-title>
            <v-card-text>
              <v-form ref="companyFormRef"> <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedCompany.name"
                        label="Nombre *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedCompany.nif"
                        label="NIF *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedCompany.address"
                        label="Dirección *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedCompany.phone"
                        label="Teléfono"
                        :rules="[rules.phone]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedCompany.email"
                        label="Email"
                        :rules="[rules.email]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedCompany.website"
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
import { useCompanyStore } from '../stores/companyStore';
import type { Company, CreateCompanyDTO, UpdateCompanyDTO } from '../types/Company';
import { showToast } from '../composables/useToast';

const companyStore = useCompanyStore();
const companyFormRef = ref<HTMLFormElement | null>(null);

// Cabeceras de la tabla de datos
const headers = ref([
  { title: 'Nombre', key: 'name' },
  { title: 'NIF', key: 'nif' },
  { title: 'Email', key: 'email' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Dirección', key: 'address' },
  // { title: 'Web', key: 'website' },
  { title: 'Acciones', key: 'actions', sortable: false },
]);

const dialogDelete = ref(false);
const dialogForm = ref(false);
const defaultCompany: CreateCompanyDTO = {
  name: '',
  nif: '',
  address: '',
  phone: '',
  email: '',
  website: ''
};

const editedCompany = ref<Company | CreateCompanyDTO>(JSON.parse(JSON.stringify(defaultCompany))); // Deep copy
const formTitle = computed(() => 'id' in editedCompany.value ? 'Editar' : 'Añadir');

/* Reglas de validación */
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
  await companyStore.fetchAllCompanies();
});

// --- Métodos de Interacción ---

const addCompany = () => {
  editedCompany.value = JSON.parse(JSON.stringify(defaultCompany));
  dialogForm.value = true;
};

const editCompany = (company: Company) => {
  editedCompany.value = { ...company };
  dialogForm.value = true;
};

const deleteConfirm = (company: Company) => {
  editedCompany.value = company;
  dialogDelete.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const closeForm = async () => {
  dialogForm.value = false;
  await nextTick();
  if (companyFormRef.value) {
    companyFormRef.value.resetValidation();
  }
  editedCompany.value = JSON.parse(JSON.stringify(defaultCompany));
};

const deleteItemConfirm = async () => {
  if (editedCompany.value && 'id' in editedCompany.value) {
    try {
      await companyStore.deleteCompany(editedCompany.value.id);
      showToast('Empresa eliminada correctamente.', 'success');
      closeDelete();
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
    }
  }
};

const saveForm = async () => {
  if (companyFormRef.value) {
    const { valid } = await companyFormRef.value.validate();
    if (!valid) {
      return;
    }
  }

  if (editedCompany.value) {
    try {
      if ('id' in editedCompany.value) {
        await companyStore.updateCompany(editedCompany.value.id, editedCompany.value as UpdateCompanyDTO);
        showToast('Empresa actualizada correctamente.', 'success');
      } else {
        await companyStore.addCompany(editedCompany.value as CreateCompanyDTO);
        showToast('Empresa creada correctamente.', 'success');
      }
      closeForm();
    } catch (error) {
      console.error("Error al guardar empresa:", error);
    }
  }
};
</script>
