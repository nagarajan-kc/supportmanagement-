<template>
    <v-table>
<thead>
        <th>id</th>
        <th>Issue</th>
        <th>Description</th>
        <th>Portal Name</th>
      
</thead>
<tbody v-for="user in users" v-bind:key="user">
    <tr>
        <td >{{ user.id }}</td>
        <td >{{ user.Issue }}</td>
        <td >{{ user.Description }}</td>
        <td >{{ user.Portal }}</td>
        <td ><v-btn class="btn btn-outline-dark"  v-on:click.prevent= "open(user.id)" > Open </v-btn></td>
        <!-- <button class="btn btn-outline-dark" type="open" v-on:click.prevent= "open(user.id)"> open </button>  -->
    </tr>
    
</tbody>
</v-table>
<button class="btn btn-outline-dark" type="back" v-on:click.prevent= "logout()"> Logout </button> 
</template>

<script>

import userData from '../User.json'
export default {
  name:'AgentPage',
  data(){
        return { 
            users:userData,
            issueid: null 
        }
    } ,
  methods:{
    logout(){
        this.$router.push('/AdminPageDashboard');
      
    },
    
    open(id){
      this.issueid = id
      console.log(this.issueid)
      window.localStorage.setItem('Issueid',this.issueid)
      this.$router.push('/ViewIssue');
    },
  }
}
</script>