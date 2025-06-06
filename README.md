# **InternLink Front-end** – Interfaz de Gestión de Prácticas Académicas

Aplicación web frontend interactiva desarrollada con  **Vue.js 3** , **Pinia** para la gestión de estado y **Vuetify** para la interfaz de usuario. Esta plataforma consume la API RESTful del backend de InternLink para proporcionar una experiencia de usuario fluida y eficiente en la gestión de asignaciones de prácticas, empresas, tutores y usuarios. La aplicación se centra en la reactividad, la modularidad y una interfaz de usuario intuitiva.

## 📖 Índice

1. [Tecnologías Utilizadas](https://www.google.com/search?q=%23tecnologias-utilizadas&authuser=2)
2. [Arquitectura del Frontend](https://www.google.com/search?q=%23arquitectura-del-frontend&authuser=2)
3. [Funcionalidades Implementadas](https://www.google.com/search?q=%23funcionalidades-implementadas&authuser=2)
4. [Detalle por Sprint](https://www.google.com/search?q=%23detalle-por-sprint&authuser=2)
5. [Instalación y Configuración](https://www.google.com/search?q=%23instalacion-y-configuracion&authuser=2)
6. [Vínculo con el Backend](https://www.google.com/search?q=%23vinculo-con-el-backend&authuser=2)
7. [Autor](https://www.google.com/search?q=%23autor&authuser=2)

## **📌 Tecnologías Utilizadas**

🔹 **Vue.js 3** – Framework progresivo para la construcción de interfaces de usuario interactivas.
🔹 **Pinia** – Gestor de estado ligero y tipado para Vue 3, optimizado para la Composition API.
🔹 **Vuetify 3** – Framework de componentes de UI basado en Material Design, para una interfaz consistente y responsiva.
🔹 **Vite** – Herramienta de compilación rápida para proyectos Vue.js, optimizando el entorno de desarrollo.
🔹 **TypeScript** – Lenguaje de programación que añade tipado estático a JavaScript, mejorando la robustez y mantenibilidad del código.
🔹 **Axios** – Cliente HTTP basado en promesas para la comunicación con la API RESTful.
🔹 **Vue Router** – Sistema de enrutamiento para Single Page Applications (SPAs) en Vue.js.

## **🏗️ Arquitectura del Frontend**

El frontend de InternLink se ha desarrollado como una  **Single Page Application (SPA)** , siguiendo una arquitectura modular basada en componentes y una gestión de estado centralizada.

* **Componentes:** La interfaz de usuario se construye a partir de un sistema de componentes jerárquico, utilizando la **Composition API** de Vue.js 3 para encapsular la lógica y el estado local. Se aplican patrones de diseño como los **Composables** para reutilizar la lógica reactiva entre componentes (ej., lógica de notificaciones).
* **Gestión de Estado (Pinia):** El estado global de la aplicación se gestiona mediante  **Pinia** , organizando los datos en **stores** modulares (ej., `authStore`, `internshipAssignmentStore`). Cada store encapsula su propio estado, getters (propiedades computadas) y acciones (métodos asíncronos para la lógica de negocio y mutaciones de estado), garantizando un flujo de datos predecible y una alta testabilidad.
* **Capa de Servicios:** La interacción con la API RESTful del backend se abstrae a través de una capa de **servicios** (ej., `internshipAssignmentService.ts`). Estos servicios son los únicos responsables de realizar las peticiones HTTP (`Axios`) y procesar las respuestas, manteniendo la lógica de comunicación separada de los stores y componentes.
* **Enrutamiento (Vue Router):** La navegación interna se maneja con Vue Router, permitiendo **rutas anidadas** para estructuras complejas y el uso de **guardias de navegación** para proteger el acceso a ciertas vistas basándose en el estado de autenticación o los roles del usuario.

## 🚀 Funcionalidades Implementadas

* ✅ **Dashboard Interactivo:** Vista general con estadísticas clave y asignaciones próximas.
* ✅ **Gestión de Asignaciones de Prácticas:**
  * Visualización tabular con opciones de filtro, búsqueda y paginación.
  * Creación, Edición y Eliminación (CRUD) de asignaciones mediante formularios modales.
* ✅ **Autenticación de Usuario:**
  * Formularios de inicio y cierre de sesión.
  * Manejo de sesión persistente (vía cookies de Sanctum).
  * Redirección de rutas protegidas.
* ✅ **Control de Acceso (Autorización):**
  * Adaptación dinámica de la interfaz de usuario (visibilidad de botones/secciones) según el rol y los permisos del usuario autenticado.
* ✅ **Notificaciones de Usuario:** Sistema de notificaciones (toasts) para feedback sobre operaciones exitosas o errores.
* ✅ **Interfaz de Usuario Responsiva:** Diseño adaptativo para una experiencia óptima en diferentes dispositivos (escritorio, tablet, móvil).
* ✅ **Validación de Formularios:** Validación frontend de los datos de entrada para mejorar la experiencia de usuario.

## ⚙️ Instalación y Configuración.

Para levantar el entorno de desarrollo del frontend, asegúrate de tener el backend funcionando y siguiendo los pasos de su propio README.

### 🛠 Requisitos Previos.

* Node.js (versión 18+ recomendada)
* npm o Yarn
* Git
* El backend de InternLink debe estar ejecutándose y accesible (ej., en `http://localhost:8000`).

### 📌 Pasos de instalación

```

# Clonar el repositorio
git clone https://github.com/RSAdrian9/ProjectSchoolStudent-Front-end.git
cd ProjectSchoolStudent-Front-end

# Instalar dependencias de Node.js
npm install # o yarn install

# Configurar la URL de la API del Backend
# Crea un archivo .env.local en la raíz del proyecto (si no existe)
# y añade la siguiente línea, ajustando la URL si tu backend no está en localhost:8000
# VITE_API_BASE_URL=http://localhost:8000/api

# Iniciar el servidor de desarrollo del frontend
npm run dev # o yarn dev
La aplicación estará disponible en tu navegador, generalmente en http://localhost:5173
```


## **🔗 Vínculo con el Backend**

Este proyecto frontend consume la API RESTful proporcionada por el siguiente repositorio de backend:

[📁 InternLink Back-end: Ver en GitHub](https://github.com/RSAdrian9/InternLink-API)


## 👨‍💻 **Autor**

Adrián Ruiz Sánchez

[Correo](mailto:adrian.dev24@gmail.com)

[GitHub](https://github.com/RSAdrian9)

[LinkedIn](http://linkedin.com/in/adri%C3%A1n-ruiz-s%C3%A1nchez)
