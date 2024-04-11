import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import AdminPage from './components/AdminPage.vue';
import UserCreation from './components/UserCreation.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
          path: '/', 
          name:LoginPage,
          component: LoginPage },
             
        { 
          path: '/AdminPageDashboard',
          name:AdminPage, 
          component: AdminPage },

          { 
            path: '/CreateSupportAgent',
            name:UserCreation, 
            component: UserCreation }

      ]
  });
  
  


createApp(App).use(router).mount('#app')