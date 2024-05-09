<template>
  
  <HeaderSection/>
  
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue';

export default {
  name: 'App',
  components: {
    HeaderSection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 20px; */
}

input,select{
  border: solid 1px rgb(5, 5, 5) !important;
}

.v-btn{
  text-transform: none !important;
}

</style>
