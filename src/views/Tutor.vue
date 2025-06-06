<template>
  <v-container>
    <h1 class="text-h4 mb-4">Gestión de Tutores</h1>

    <v-alert v-if="userStore.error" type="error" class="mb-4">
      {{ userStore.error }}
    </v-alert>

    <v-card>
      <v-card-title class="d-flex align-center">
        Lista de Tutores
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="addTutor">
          <v-icon start>fa-solid fa-plus</v-icon>
          Añadir Tutor
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="userStore.getTutors"
          :loading="userStore.isLoading"
          item-key="id"
          class="elevation-1"
          no-data-text="No hay tutores disponibles."
          loading-text="Cargando tutores..."
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon flat small class="mr-2" @click="editUser(item)">
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
        <v-card-title class="text-h5">¿Estás seguro de que quieres eliminar a este tutor?</v-card-title>
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
            <v-card-title class="text-h5">{{ formTitle }} Tutor</v-card-title>
            <v-card-text>
              <v-form ref="userFormRef">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedUser.name"
                        label="Nombre Completo *"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedUser.dni"
                        label="DNI *"
                        :rules="[rules.required, rules.dni]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedUser.email"
                        label="Email *"
                        :rules="[rules.required, rules.email]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedUser.phone"
                        label="Teléfono"
                        :rules="[rules.phone]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedUser.address"
                        label="Dirección"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedUser.city"
                        label="Ciudad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedUser.zipcode"
                        label="Código Postal"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedUser.birthdate"
                        label="Fecha de Nacimiento (YYYY-MM-DD)"
                        :rules="[rules.date]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="editedUser.school_id"
                        :items="schoolStore.getSchools"
                        item-title="name"
                        item-value="id"
                        label="Instituto Asociado *"
                        :loading="schoolStore.isLoading"
                        :rules="[rules.schoolId]"
                        clearable
                      ></v-select>
                    </v-col>

                    <v-col cols="12" v-if="!('id' in editedUser)">
                      <v-text-field
                        v-model="editedUser.password"
                        label="Contraseña *"
                        type="password"
                        :rules="[rules.required, rules.password]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="!('id' in editedUser)">
                      <v-text-field
                        v-model="passwordConfirmation"
                        label="Confirmar Contraseña *"
                        type="password"
                        :rules="[rules.required, (v: string) => v === editedUser.password || 'Las contraseñas no coinciden.']"
                        required
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
import { useUserStore } from '../stores/userStore';
import { useSchoolStore } from '../stores/schoolStore';
import type { User, CreateUserDTO, UpdateUserDTO } from '../types/User';
import { showToast } from '../composables/useToast';

const userStore = useUserStore();
const schoolStore = useSchoolStore();

const userFormRef = ref<HTMLFormElement | null>(null);

// Cabeceras de la tabla de datos
const headers = ref([
  { title: 'Nombre', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'DNI', key: 'dni' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Acciones', key: 'actions', sortable: false },
]);

// Variables para manejar diálogos y el usuario en edición/eliminación
const dialogDelete = ref(false);
const dialogForm = ref(false);

const defaultTutorUser: CreateUserDTO = {
  name: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  zipcode: '',
  dni: '',
  role: 'Tutor',
  birthdate: '',
  school_id: null,
  password: '',
  email_verified_at: null
};
const passwordConfirmation = ref('');
const editedUser = ref<User | CreateUserDTO>(JSON.parse(JSON.stringify(defaultTutorUser)));

const formTitle = computed(() => 'id' in editedUser.value ? 'Editar' : 'Añadir');

// Reglas de validación
const rules = {
  required: (value: string | null | undefined) => !!value || 'Campo requerido.',
  email: (value: string | null | undefined) => {
    if (!value) return true;
    return /.+@.+\..+/.test(value) || 'Email no válido.';
  },
  phone: (value: string | null | undefined) => {
    if (!value) return true;
    return /^\+?(\d{1,3})?\s?(\d{1,})?([\s\d]{6,})?$/.test(value) || 'Teléfono no válido.';
  },
  dni: (value: string | null | undefined) => {
    if (!value) return true;
    return /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i.test(value) || 'DNI no válido.';
  },
  password: (value: string | null | undefined) => {
    if (!value && !('id' in editedUser.value)) {
      return 'Contraseña requerida.';
    }
    if (value && value.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    return true;
  },
  date: (value: string | null | undefined) => {
    if (!value) return true;
    return /^\d{4}-\d{2}-\d{2}$/.test(value) || 'Formato de fecha YYYY-MM-DD.';
  },
  schoolId: (value: number | null | undefined) => {
    if (value === null || value === undefined) return true;
    return (typeof value === 'number' && value >= 0) || 'El ID del instituto debe ser un número.';
  }
};

// --- Hook de Ciclo de Vida ---
onMounted(async () => {
  await userStore.fetchUsersByRole('Tutor');
  await schoolStore.fetchSchools();
});

// --- Métodos de Interacción ---
const addTutor = () => {
  editedUser.value = JSON.parse(JSON.stringify(defaultTutorUser));
  dialogForm.value = true;
};

const editUser = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  editedUser.value = { ...userWithoutPassword };
  dialogForm.value = true;
};

const deleteConfirm = (user: User) => {
  editedUser.value = user;
  dialogDelete.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const closeForm = async () => {
  dialogForm.value = false;
  await nextTick();
  if (userFormRef.value) {
    userFormRef.value.resetValidation();
  }
  editedUser.value = JSON.parse(JSON.stringify(defaultTutorUser));
  passwordConfirmation.value = '';
};

const deleteItemConfirm = async () => {
  if (editedUser.value && 'id' in editedUser.value) {
    try {
      await userStore.deleteUser(editedUser.value.id);
      showToast('Tutor eliminado correctamente.', 'success');
      closeDelete();
    } catch (error) {
      console.error("Error al eliminar tutor:", error);
    }
  }
};

const saveForm = async () => {
  if (userFormRef.value) {
    const { valid } = await userFormRef.value.validate();
    if (!valid) {
      return;
    }
  }

  if (editedUser.value) {
    try {
      if ('id' in editedUser.value) {
        const dataToUpdate: UpdateUserDTO = {
            ...editedUser.value,
            // Aseguramos que school_id sea number o null, no string vacío si el v-select lo devuelve así
            school_id: editedUser.value.school_id === '' ? null : editedUser.value.school_id
        };
        if ('password' in dataToUpdate) {
            delete dataToUpdate.password;
        }

        await userStore.updateExistingUser(editedUser.value.id, dataToUpdate);
        showToast('Tutor actualizado correctamente.', 'success');
      } else {
        const dataToCreate: CreateUserDTO = {
            ...editedUser.value,
            role: 'Tutor',
            school_id: editedUser.value.school_id === '' ? null : editedUser.value.school_id,
            password_confirmation: passwordConfirmation.value
        } as CreateUserDTO;

        await userStore.addUser(dataToCreate);
        showToast('Tutor creado correctamente.', 'success');
      }
      closeForm();
    } catch (error) {
      console.error("Error al guardar tutor:", error);
    }
  }
};
</script>
