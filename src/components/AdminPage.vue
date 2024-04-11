<template>
  <div>
    <h3>Welcome Admin</h3>
  </div>
  <button class="btn btn-outline-dark" type="Logout" v-on:click.prevent= "logout()" > Logout </button>
  <button class="btn btn-outline-dark" type="Logout" v-on:click.prevent= "UserCreate()" > Create </button>
</template>

<script>
export default {
  name:'AdminPage',
  methods:{
    logout(){
        this.$router.push('/');
      
    },
    UserCreate(){
        this.$router.push('/CreateSupportAgent');
      
    }
  }
}
</script>