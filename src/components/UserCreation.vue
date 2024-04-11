<template>
    <h2>Agent Creation:</h2>
    <form name="UserCreation" >
        <div>
            <select>
           <option value="0">-Select-</option>
           <option value="1">Mr</option>
           <option value="2">Mrs</option>
           <option value="3">Ms</option>
</select>
        </div>
          <div class="mb-3">
            <label for="First Name">First Name: </label>
            <input type="text" id="First Name" v-model="input.FirstName" />
          </div>
          <br>
          <br>
        <div class="mb-3">
           <label for="LastName">LastName: </label>
           <input type="LastName" id="LastName" v-model="input.LastName" />
        </div>
        <br>
          <br>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent= "back()">
            Back
          </button>
          <br>
          <br>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent= "save()">
            Save
          </button>
        </form>
  </template>
  
  <script>
  export default {
    name:'UserCreation',

    save(){
        this.$router.push('/AdminPageDashboard')
    },

    back(){
        this.$router.push('/AdminPageDashboard')
    },

    data(){
    return{
        input:{
            FirstName: "",
            LastName: ""
        }
    }
  }
  }
  </script>
																														