<template>
    <div id="heading">
      
      <v-btn size="small" variant="outlined" v-on:click="home()">Home</v-btn>
      <v-btn size="small" variant="outlined" v-on:click="logout()">Logout</v-btn>
    </div>
      
  </template>
  <script>
  export default {
    name: 'TitleSection',
    methods:{
      logout(){
        this.$router.push('/');
        localStorage.removeItem("User");
        localStorage.clear();
      },
      home(){
        let user = localStorage.getItem("User");
        if(user == 'User'){
          this.$router.push('/Userhome')
        }
        else if(user == 'Agent'){
          this.$router.push('/Agent')
        }
        else {
          this.$router.push('/AdminPageDashboard')
        }
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