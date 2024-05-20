<template>
     <form name="login-form" >
          <div class="mb-3">
            <label for="username" >Username: </label>
            <input type="text" id="username" v-model="username"/>
          </div>
        <div class="mb-3">
           <label for="oldpassword">Old Password: </label>
           <input type="text" id="username" v-model="oldpass"/>
        </div>
        <div>
          <label for="newpassword">New Password:</label>
          <input type="text" id="username" v-model="newpass"/>
        </div>
          <v-btn class="btn btn-outline-dark" type="submit" @click="changePassword()">
            Login
          </v-btn>
        </form>
</template>

<script>
import axios  from 'axios';
var sha512 = require('js-sha512');
export default{
    name: 'PaswordChange',
    data() {
        return {
        username:"",
        oldpass:"",
        newpass:""
      }
    },
    //https://demoetenders.tn.nic.in/supportdora/login
    methods:{
      // getSalt(userName){
      //   axios.post('https://demoetenders.tn.nic.in/supportdora/salt', userName, {
      //               headers: {
      //                   "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
      //                   "Content-Type": `application/x-www-form-urlencoded`
      //               }
      //           })
      //           .then(response => {
      //             if (response.data[0].SALT) {
      //               console.log(response.data[0].SALT);
      //               return response.data[0].SALT;
      //             }
      //           })
      //           .catch(error => {
      //               console.log('Error fetching data:', error);
      //           });
      //   },
      changePassword(){
        if (this.username && this.oldpass && this.newpass) {
          console.log(this.username);
        axios.post('https://demoetenders.tn.nic.in/supportdora/salt', this.username, {
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `application/x-www-form-urlencoded`
                    }
                })
                .then(response => {
                  if (response.data[0].SALT) {
                    let saltValue = response.data[0].SALT;
                    if (saltValue) {
                      let oldPassHash = saltValue + sha512(this.oldpass);
                      let newPassHash = sha512(this.newpass);
                            console.log(saltValue);
                            console.log(oldPassHash);
                            // console.log(oldPassHash.split('##')[0]);
                            // console.log(oldPassHash.split('##')[1]);
                            console.log(newPassHash);
                    }
                  }
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
          
        }
      },
    }
  }
</script>