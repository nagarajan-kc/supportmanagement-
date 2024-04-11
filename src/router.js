 import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import WelcomePage from './components/WelcomePage.vue';

const routes = [
  { name:LoginPage,
    path: '/', 
    component: LoginPage },
       
  { name:WelcomePage,
    path: '/welcome', 
    component: WelcomePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 