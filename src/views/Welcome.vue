<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="hero-section text-center d-flex align-center justify-center">
      <v-col cols="12">
        <h1 class="text-h2 font-weight-bold mb-4 text-white">
          InternLink: Conectando Talento y Oportunidades
        </h1>
        <p class="text-h5 text-white mb-8">
          Tu plataforma integral para prácticas profesionales, uniendo estudiantes, institutos y empresas.
        </p>
        <v-btn
          color="primary"
          size="x-large"
          class="elevation-5"
          @click="$router.push('/login')"
        >
          ¡Únete Ahora o Inicia Sesión!
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="py-12 px-4" justify="center">
      <v-col cols="12" md="10" lg="8" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-8 text-primary">¿Qué ofrecemos?</h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-6 elevation-3">
              <v-icon size="60" color="primary" class="mb-4">fa-solid fa-graduation-cap</v-icon>
              <v-card-title class="text-h6 font-weight-bold">Para Estudiantes</v-card-title>
              <v-card-text>
                Encuentra las prácticas ideales que impulsen tu carrera, conéctate con empresas líderes y aplica fácilmente.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-6 elevation-3">
              <v-icon size="60" color="primary" class="mb-4">fa-solid fa-building</v-icon>
              <v-card-title class="text-h6 font-weight-bold">Para Empresas</v-card-title>
              <v-card-text>
                Descubre talento joven y vibrante, publica tus ofertas de prácticas y gestiona candidatos de forma eficiente.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-6 elevation-3">
              <v-icon size="60" color="primary" class="mb-4">fa-solid fa-school</v-icon>
              <v-card-title class="text-h6 font-weight-bold">Para Institutos</v-card-title>
              <v-card-text>
                Optimiza la gestión de prácticas de tus alumnos, facilita la conexión con empresas y sigue su progreso.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters class="cta-section text-center d-flex align-center justify-center">
      <v-col cols="12">
        <h2 class="text-h3 font-weight-bold mb-4 text-white">¿Listo para dar el siguiente paso?</h2>
        <p class="text-h6 text-white mb-8">
          Únete a InternLink hoy mismo y transforma tu futuro profesional.
        </p>
        <v-btn
          color="secondary"
          size="x-large"
          class="elevation-5"
          @click="$router.push('/login')"
        >
          Regístrate o Inicia Sesión
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Ya no necesitas useAuthStore aquí, ya que los botones siempre van al login
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://via.placeholder.com/1500x600/424242/FFFFFF?text=Tu+Imagen+Principal') center center no-repeat;
  background-size: cover;
  min-height: 60vh;
  color: white;
  padding: 40px 20px;
}

.cta-section {
  background: linear-gradient(rgba(0, 123, 255, 0.8), rgba(0, 123, 255, 0.8)), url('https://via.placeholder.com/1500x400/007bff/FFFFFF?text=Fondo+CTA') center center no-repeat;
  background-size: cover;
  min-height: 40vh;
  color: white;
  padding: 40px 20px;
}
</style>