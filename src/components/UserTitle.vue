<template>
    <div id="heading">
      
      <v-btn size="small" variant="outlined" v-on:click="home()">Home</v-btn>
      <v-btn size="small" variant="outlined" v-on:click="logout()">Logout</v-btn>
    </div>
      
  </template>
  <script>
  export default {
    name: 'UserTitle',
    methods:{
      logout(){
        this.$router.push('/')
      },
      home(){
        this.$router.push('/Agent')
      }
    }
  }
  </script>
  <style>
  #heading{
    text-align: end;
    padding-right: 20px;
  }

  .v-btn{
    margin: 0 5px;
  }
  </style>