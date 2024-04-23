<template>
    
    <h1>Task Manager - Admin Dashboard</h1>
    <v-container  >
      <div v-for="user in users" v-bind:key="user">
      <v-row v-if="user.id == requestId">
        <v-col>
          Id: {{ user.id }}
        </v-col>
      </v-row>
      <v-row v-if="user.id == requestId">
        <v-col>
          Issue: {{ user.Issue }}
        </v-col>
      </v-row><v-row v-if="user.id == requestId">
        <v-col>
          Description: {{ user.Description }}
        </v-col>
      </v-row>
      <v-row v-if="user.id == requestId">
        <v-col>
          Portal: {{ user.Portal }}
        </v-col>
      </v-row>
    </div>
    </v-container>
    <form @submit.prevent="sendTask">
      <label for="agent">Send To:</label>
      <select id="agent" v-model="selectedUser">
        <option v-for="agent in agents" :key="agent.id" :value="agent.name">{{ agent.name }}</option>
        
      </select>
      <br> 
      <button type="submit">Send Task</button>
    </form>
    <br>
    <br>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent= "back()">
            Back
          </button>
</template>
  <script>
  import userData from '../User.json'
    export default{
        name:'AssignTask',

      data() {
        return {
          agents: [
            { id: 1, name: 'L1' },
            { id: 2, name: 'L2' },
            { id: 3, name: 'L3' }
          ],
          selectedUser: null,
          sentTasks: [],
          requestId:  window.localStorage.getItem('Requestid'),
          users:userData,
        };
      },
      methods: {
        back(){
        this.$router.push('/AdminPageDashboard')
    },
        sendTask() {
            if (this.selectedUser) {
            console.log(`sent to ${this.selectedUser}`);
            this.selectedUser = null;
          } else {
            alert('Please fill out both task and user fields.');
          }
        },
        
        
      }
    }

  </script>