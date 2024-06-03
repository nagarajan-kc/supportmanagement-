import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory} from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import UserPasswordChange from './components/PaswordChange.vue';
import AdminPage from './components/AdminPage.vue';
import UserCreation from './components/UserCreation.vue';
import UpdateUser from './components/UpdateUser.vue'
import AssignTask from './components/AssignTask.vue';
import AgentPage from './components/AgentPage.vue';
// import ViewIssue from './components/ViewIssue.vue';
import ManageAgent from './components/ManageAgent.vue';
import  RequestFile from './components/RequestFile.vue';
import EsclateIssue from './components/EsclateIssue.vue';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import RequestCreation from './components/RequestCreation.vue';
import RequestList from './components/RequestList.vue';
import ViewRequest from './components/ViewRequest.vue';
import UserHome from './components/UserHome';
// import VueCookies from 'vue3-cookies';
const icons = {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  }

const vuetify = createVuetify({
    components,
    directives,
    icons
  })

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { 
          path: '/', 
          name:LoginPage,
          component: LoginPage 
        },
        {
          path:'/ChangePassword',
          name:UserPasswordChange, 
          component:UserPasswordChange
        },

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
          
            // {
            //   path: '/ViewIssue',
            // name:ViewIssue, 
            // component: ViewIssue
            // },

            {
              path: '/AgentList',
            name:ManageAgent, 
            component: ManageAgent
            },

            {
              path: '/Request',
            name:RequestFile, 
            component: RequestFile
            },
            {
              path: '/Userhome',
            name:UserHome, 
            component: UserHome
            },
            {
              path: '/CreateRequest',
            name:RequestCreation, 
            component: RequestCreation
            },
            {
              path: '/Listrequest',
            name:RequestList, 
            component: RequestList
            },
            {
              path: '/Listrequest/Viewrequest',
            name:ViewRequest, 
            component: ViewRequest
            },

          ]
  });
  
  

  // .use(VueCookies)
createApp(App).use(router).use(vuetify).mount('#app')
