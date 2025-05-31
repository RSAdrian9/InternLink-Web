import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import School from '../views/School.vue'
import Tutor from '../views/Tutor.vue'
import Student from '../views/Student.vue'
import Company from '../views/Company.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/schools',
    name: 'schools',
    component: School,
  },
  {
    path: '/tutors',
    name: 'tutors',
    component: Tutor,
  },
  {
    path: '/students',
    name: 'students',
    component: Student,
  },
  {
    path: '/companies',
    name: 'companies',
    component: Company,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
