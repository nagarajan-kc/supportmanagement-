import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import AdminPage from './components/AdminPage.vue';
import UserCreation from './components/UserCreation.vue';
import UpdateUser from './components/UpdateUser.vue'
import AssignTask from './components/AssignTask.vue';
import AgentPage from './components/AgentPage.vue';
import ViewIssue from './components/ViewIssue.vue';
import ManageAgent from './components/ManageAgent.vue';
import  RequestFile from './components/RequestFile.vue';
import EsclateIssue from './components/EsclateIssue.vue';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
  })

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
            component: UserCreation },

            {
              path: '/UpdateAgent',
            name:UpdateUser, 
            component: UpdateUser
            },

            {
              path: '/AssignTask',
            name:AssignTask, 
            component: AssignTask
            },
            {
              path: '/Issue',
            name:EsclateIssue, 
            component: EsclateIssue
            },

            {
              path: '/Agent',
            name:AgentPage, 
            component: AgentPage
            },
          
            {
              path: '/ViewIssue',
            name:ViewIssue, 
            component: ViewIssue
            },

            {
              path: '/AgentList',
            name:ManageAgent, 
            component: ManageAgent
            },

            {
              path: '/Request',
            name:RequestFile, 
            component: RequestFile
            }
          ]
  });
  
  


createApp(App).use(router).use(vuetify).mount('#app')
