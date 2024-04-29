<template>
  
  <HelloWorld msg="Support Management System"/>
  <TitleSection/>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import TitleSection from './components/TitleSection.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    TitleSection
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
  margin-top: 60px;
}

input,select{
  border: solid 1px rgb(5, 5, 5) !important;
}

.v-btn{
  text-transform: none !important;
}

</style>
