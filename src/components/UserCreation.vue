<template>
    <h2>Agent Creation:</h2>
    <form name="UserCreation" >
      <v-container>
        
      </v-container>
        <div>
        
            <label>Title:</label>
            <select v-model="input.select" >
           <option type="text">-Select-</option>
           <option type="text">Mr</option>
           <option type="text">Mrs</option>
           <option type="text">Ms</option>
           </select>
        </div>
          <div class="mb-3">
            <label for="First Name">First Name: </label>
            <input type="text" id="First Name" v-model="input.FirstName" />
          </div>
        <div class="mb-3">
           <label for="MobileNo">Mobile No: </label>
           <input type="Number" id="MobileNo" v-model="input.MobileNo" />
        </div>
        <div>
          <label for="EmailId">Email Id: </label>
           <input type="text" id="EmailId" v-model="input.EmailId" />
        </div>
          <div>
            <label>Role:</label>
            <select v-model="input.select" >
           <option type="text">-Select-</option>
           <option type="text">L1</option>
           <option type="text">L2</option>
           <option type="text">L3</option>
           </select>
          </div>
        <div>
          <label for="Portal">Portal Name: </label>
           <input type="text" id="Portal" v-model="input.Portal" />
        </div>
        <div>
          <label for="Agent">Agent Proof: </label>
          <input id="attach" type="file" >
        </div>
        <v-container>
    <v-row>
      <v-col>
        <v-btn class="btn btn-outline-dark"  v-on:click.prevent= "back()" > Back </v-btn>
      </v-col>
      <v-col>
        <v-btn class="btn btn-outline-dark"  v-on:click.prevent= "save()" > Save </v-btn>
      </v-col>
    </v-row>
  </v-container>  
        </form>
  </template>
  
  <script>
  export default {
    name:'UserCreation',

    data(){
    return{
        input:{
          select:{
            value:''
          },
            FirstName: "",
            MobileNo: "",
            EmailId:"",
            Portal:""
        }
    }
  },

    methods:{
      save(){
        console.log(this.input),
        this.$router.push('/AdminPageDashboard')
    },
    back(){
        this.$router.push('/AdminPageDashboard')
    }

    }
    
    
  }
  </script>
