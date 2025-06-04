<template>
  <v-container fluid class="fill-height bg-grey-lighten-5">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="11" md="10" lg="9" xl="8">
        <v-card class="elevation-10 rounded-lg overflow-hidden">
          <v-window v-model="step" class="window-container">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6" class="pa-8">
                  <div class="d-flex flex-column align-center justify-center h-100">
                    <v-avatar size="80" color="primary" class="mb-6">
                      <v-icon size="40" color="white">fa-solid fa-user</v-icon>
                    </v-avatar>

                    <h3 class="text-h4 font-weight-bold mb-2">Bienvenido de nuevo</h3>
                    <p class="text-body-1 text-medium-emphasis text-center mb-8">
                      Inicia sesión para continuar con tu experiencia en InternLink
                    </p>

                    <v-form ref="loginFormRef" class="w-100" style="max-width: 380px" @submit.prevent="handleLogin">
                      <v-text-field
                        v-model="email"
                        label="Correo electrónico"
                        variant="outlined"
                        prepend-inner-icon="fa-solid fa-envelope"
                        :rules="emailRules"
                        color="primary"
                        class="mb-3"
                        :disabled="authStore.isLoading"
                      ></v-text-field>

                      <v-text-field
                        v-model="password"
                        label="Contraseña"
                        variant="outlined"
                        prepend-inner-icon="fa-solid fa-lock"
                        :append-inner-icon="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                        @click:append-inner="showPassword = !showPassword"
                        :type="showPassword ? 'text' : 'password'"
                        :rules="passwordRules"
                        color="primary"
                        :disabled="authStore.isLoading"
                      ></v-text-field>

                      <div class="d-flex justify-space-between align-center mb-6">
                        <v-checkbox v-model="rememberMe" label="Recordarme" color="primary" hide-details></v-checkbox>
                        <v-btn variant="text" color="primary" density="compact">
                          ¿Olvidaste tu contraseña?
                        </v-btn>
                      </div>

                      <v-btn
                        block
                        color="primary"
                        size="large"
                        class="mb-6"
                        type="submit"
                        :loading="authStore.isLoading"
                      >
                        Iniciar sesión
                      </v-btn>
                      <p v-if="authStore.error" class="text-error text-caption">{{ authStore.error }}</p>
                    </v-form>
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  class="bg-primary position-relative d-flex align-center justify-center rounded-bl-xl"
                >
                  <div class="text-center pa-8 text-white">
                    <h3 class="text-h4 font-weight-bold mb-4">¿Nuevo en InternLink?</h3>
                    <p class="text-body-1 mb-8">
                      Únete a nuestra plataforma y comienza a conectar con escuelas, estudiantes y empresas.
                    </p>
                    <v-btn size="large" variant="outlined" color="white" @click="changeStep(2)" class="px-8">
                      Crear cuenta
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item :value="2">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  class="bg-primary position-relative d-flex align-center justify-center rounded-br-xl"
                >
                  <div class="text-center pa-8 text-white">
                    <h3 class="text-h4 font-weight-bold mb-4">¿Ya tienes cuenta?</h3>
                    <p class="text-body-1 mb-8">
                      Inicia sesión para continuar gestionando tus conexiones y oportunidades.
                    </p>
                    <v-btn size="large" variant="outlined" color="white" @click="changeStep(1)" class="px-8">
                      Iniciar sesión
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="6" class="pa-8">
                  <div class="d-flex flex-column align-center justify-center h-100">
                    <h3 class="text-h4 font-weight-bold mb-2">Crear nueva cuenta</h3>
                    <p class="text-body-1 text-medium-emphasis text-center mb-6">
                      Completa el formulario para unirte a InternLink
                    </p>

                    <v-form ref="registerFormRef" class="w-100" style="max-width: 380px" @submit.prevent="handleRegister">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="firstName"
                            label="Nombre"
                            variant="outlined"
                            :rules="[v => !!v || 'El nombre es requerido']"
                            color="primary"
                            :disabled="authStore.isLoading"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="lastName"
                            label="Apellido"
                            variant="outlined"
                            :rules="[v => !!v || 'El apellido es requerido']"
                            color="primary"
                            :disabled="authStore.isLoading"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-text-field
                        v-model="registerEmail"
                        label="Correo electrónico"
                        variant="outlined"
                        prepend-inner-icon="fa-solid fa-envelope"
                        :rules="emailRules"
                        color="primary"
                        class="mb-3"
                        :disabled="authStore.isLoading"
                      ></v-text-field>

                      <v-text-field
                        v-model="registerPassword"
                        label="Contraseña"
                        variant="outlined"
                        prepend-inner-icon="fa-solid fa-lock"
                        :append-inner-icon="showRegisterPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                        @click:append-inner="showRegisterPassword = !showRegisterPassword"
                        :type="showRegisterPassword ? 'text' : 'password'"
                        :rules="registerPasswordRules"
                        color="primary"
                        :disabled="authStore.isLoading"
                      ></v-text-field>

                      <v-text-field
                        v-model="confirmPassword"
                        label="Confirmar Contraseña"
                        variant="outlined"
                        prepend-inner-icon="fa-solid fa-lock"
                        :type="showRegisterPassword ? 'text' : 'password'"
                        :rules="confirmPasswordRules"
                        color="primary"
                        :disabled="authStore.isLoading"
                      ></v-text-field>


                      <div class="d-flex align-center mb-6">
                        <v-checkbox v-model="acceptTerms" color="primary" hide-details></v-checkbox>
                        <span>
                          Acepto los
                          <v-btn variant="text" color="primary" density="compact" class="pa-0 font-weight-bold">
                            Términos y condiciones
                          </v-btn>
                        </span>
                      </div>

                      <v-btn
                        block
                        color="primary"
                        size="large"
                        class="mb-6"
                        type="submit"
                        :loading="authStore.isLoading"
                        :disabled="!acceptTerms || authStore.isLoading"
                      >
                        Crear cuenta
                      </v-btn>
                      <p v-if="authStore.error" class="text-error text-caption">{{ authStore.error }}</p>
                    </v-form>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { showToast } from '@/composables/useToast'; // Asegúrate de que este composable exista y funcione

const authStore = useAuthStore();
const router = useRouter();

// Controla el panel actual (1 para Login, 2 para Registro)
const step = ref(1);

// Referencias a los formularios para validación de Vuetify
const loginFormRef = ref(null);
const registerFormRef = ref(null);

// --- Login Form State ---
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

// --- Register Form State ---
const firstName = ref('');
const lastName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const confirmPassword = ref(''); // Para confirmar la contraseña de registro
const showRegisterPassword = ref(false);
const acceptTerms = ref(false);

// --- Validation Rules (Vuetify) ---
const emailRules = [
  v => !!v || 'El correo electrónico es requerido',
  v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido',
];

const passwordRules = [
  v => !!v || 'La contraseña es requerida',
];

const registerPasswordRules = [
  v => !!v || 'La contraseña es requerida',
  v => v?.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
];

const confirmPasswordRules = [
  v => !!v || 'Confirma tu contraseña',
  v => v === registerPassword.value || 'Las contraseñas no coinciden',
];

// --- Form Handlers ---

const changeStep = (newStep) => {
  step.value = newStep;
  // Limpiar errores del store y campos al cambiar de vista
  authStore.error = null;
  email.value = '';
  password.value = '';
  firstName.value = '';
  lastName.value = '';
  registerEmail.value = '';
  registerPassword.value = '';
  confirmPassword.value = '';
  acceptTerms.value = false;
  showPassword.value = false;
  showRegisterPassword.value = false;
  // Resetear la validación de los formularios de Vuetify si es posible (no siempre es necesario pero buena práctica)
  if (loginFormRef.value) loginFormRef.value.resetValidation();
  if (registerFormRef.value) registerFormRef.value.resetValidation();
};

const handleLogin = async () => {
  // Disparar la validación del formulario de Vuetify
  const { valid } = await loginFormRef.value.validate();
  if (!valid) return;

  // Si ya está cargando, no hacer nada (el botón ya está deshabilitado por :loading)
  if (authStore.isLoading) return;

  // Lógica de Login
  const success = await authStore.login(email.value, password.value);
  if (success) {
    showToast('Sesión iniciada correctamente.', 'success');
    router.push('/dashboard');
  } else {
    // El error ya está en authStore.error, showToast podría usarlo directamente
    showToast(authStore.error || 'Error desconocido al iniciar sesión.', 'error');
  }
};

const handleRegister = async () => {
  // Disparar la validación del formulario de Vuetify
  const { valid } = await registerFormRef.value.validate();
  if (!valid) return;

  // Validaciones adicionales antes de enviar (contraseñas coinciden, términos aceptados)
  if (registerPassword.value !== confirmPassword.value) {
    showToast('Las contraseñas no coinciden.', 'error');
    return;
  }
  if (!acceptTerms.value) {
    showToast('Debes aceptar los términos y condiciones.', 'error');
    return;
  }

  // Si ya está cargando, no hacer nada
  if (authStore.isLoading) return;

  // Construir el nombre completo para el backend
  const fullName = `${firstName.value} ${lastName.value}`;

  // Lógica de Registro
  const success = await authStore.register(fullName, registerEmail.value, registerPassword.value);
  if (success) {
    showToast('Registro exitoso. ¡Bienvenido!', 'success');
    router.push('/dashboard');
  } else {
    showToast(authStore.error || 'Error desconocido al registrarse.', 'error');
  }
};
</script>

<style scoped>
/* Tus estilos existentes */
.window-container {
  height: auto !important;
}

.rounded-bl-xl {
  border-bottom-left-radius: 100px !important;
}

.rounded-br-xl {
  border-bottom-right-radius: 100px !important;
}

/* Considera si necesitas estos estilos. Vuetify maneja la división por sí mismo. */
/*
.v-divider {
  position: relative;
}

.v-divider span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
*/
.text-error {
  color: #dc3545; /* Color rojo de error */
  margin-top: 5px;
}
</style>