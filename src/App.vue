<template>
  
  <HeaderSection/>
  
  <div id="app" class="content">
    <router-view></router-view>
  </div>
  <FooterSection/>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue';
import FooterSection from './components/FooterSection.vue';

export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection
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

.content{
  min-height: 650px;
}

</style>
