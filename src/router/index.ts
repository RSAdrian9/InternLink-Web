import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Dashboard from '@/views/Dashboard.vue'
import School from '@/views/School.vue'
import Tutor from '@/views/Tutor.vue'
import Student from '@/views/Student.vue'
import Company from '@/views/Company.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import Login from '@/views/auth/Login.vue'
import { useAuthStore } from '@/stores/authStore';
import InternshipAssignment from '@/views/InternshipAssignment.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/schools',
    name: 'schools',
    component: School,
    meta: { requiresAuth: true, title: 'Gestión de Institutos'}
  },
  {
    path: '/tutors',
    name: 'tutors',
    component: Tutor,
    meta: { requiresAuth: true, title: 'Gestión de Tutores'}
  },
  {
    path: '/students',
    name: 'students',
    component: Student,
    meta: { requiresAuth: true, title: 'Gestión de Estudiantes'}
  },
  {
    path: '/companies',
    name: 'companies',
    component: Company,
    meta: { requiresAuth: true, title: 'Gestión de Empresas' }
  },
  {
    path: '/internshipassignment',
    name: 'internshipassignment',
    component: InternshipAssignment,
    meta: { requiresAuth: true, title: 'Gestión de Prácticas' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true, title: 'Perfil de Usuario' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { requiresAuth: true, title: 'Configuración' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false, title: 'Iniciar Sesión' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Obtén el store

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está logueado, redirige a login
    next('/login');
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    // Si la ruta es solo para invitados (ej. login, register) y el usuario está logueado, redirige al dashboard de bienvenida
    next('/welcome'); // Redirige a la nueva vista de bienvenida
  } else {
    next(); // Continúa la navegación
  }
});

export default router
