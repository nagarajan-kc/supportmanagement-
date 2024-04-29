<template>
    <div id="heading">
      user
      <v-btn size="small" variant="outlined" v-on:click="home()">Home</v-btn>
      <v-btn size="small" variant="outlined" v-on:click="logout()">Logout</v-btn>
    </div>
      
  </template>
  <script>
  export default {
    name: 'TitleSection',
    methods:{
      logout(){
        this.$router.push('/')
      },
      home(){
        this.$router.push('/AdminPageDashboard')
      }
    }
  }
  </script>
  <style>
  #heading{
    text-align: end;
    padding-right: 20px;
  }
  </style>