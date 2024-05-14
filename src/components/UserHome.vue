<template>
    <TitleSection/>
    <h1>Welcome!!</h1>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <div class="createreq">
            <v-btn size="small" variant="outlined" @click="goToCreateRequest()"> Create Request </v-btn>
          </div>
        </v-col>
        <v-col cols="auto">
          <div class="viewreq">
            <v-btn size="small" variant="outlined" @click="goToViewRequest()"> View Request </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <RequestList />
  </template>
  
  <script>
  import TitleSection from './TitleSection.vue'
  export default {
    name: 'UserHome',
    components: {
      TitleSection
    },
    methods: {
      goToCreateRequest() {
        this.$router.push('/CreateRequest');
      },
      goToViewRequest() {
        this.$router.push('/Listrequest');
      },
    }
  }
  
  </script>