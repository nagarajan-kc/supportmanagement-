<template>
  
  <HelloWorld msg="Support Management System"/>
  <br>
  <br>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
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

#rp {
    border: dashed black 1px;
    padding: 20px;
    margin: 10px;
    display: inline-block;
  }
</style>
