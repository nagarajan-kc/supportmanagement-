<template>
    <form name="login-form" >
          <div class="mb-3">
            <label for="username">Username: </label>
            <input type="text" id="username" v-model="input.username" />
          </div>
          <br>
          <br>
        <div class="mb-3">
           <label for="password">Password: </label>
           <input type="password" id="password" v-model="input.password" />
        </div>
        <br>
          <br>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent= "login()">
            Login
          </button>
        </form>
</template>

<script>

export default{

    name:'LoginPage',
    data(){
    return{
        input:{
            username: "",
            password: ""
        }
    }
  },
  methods:{
    login(){

      if(this.input.username === 'admin@gmail.com' && this.input.password === 'Admin123@'){
        this.$router.push('/AdminPageDashboard');
    
      }
      else{
        alert('Invalid username or password');
      }
    }
  }
}

</script>

<style scoped>

</style>