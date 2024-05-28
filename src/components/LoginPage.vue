<template class="pagebg">
<v-container>
    <v-row align="center" justify="center">
        <pre class="heading">Login</pre>
    </v-row>
    <v-row align="center" justify="center">
        <form name="login-form" class="bg-green-lighten-5 forminput">
            <v-row align="center" justify="center" >
                <label for="username">Username: </label>
                <input type="text" id="username" v-model="input.username" />
            </v-row>
            <v-row align="center" justify="center">
                <label for="password">Password: </label>
                <input type="password" id="password" v-model="input.password" />
            </v-row>
            <v-row align="center" justify="center" >
            <v-col cols="auto">
                <v-btn class="bg-light-blue-darken-4 loginbtn" rounded="lg" type="submit" v-on:click="login()" loginbtn>
                    Login
                </v-btn>
            </v-col>
            <v-col cols="auto">
                <router-link to="/ChangePassword" class="genpass">Generate Password</router-link>
            </v-col>
                
            </v-row>
            
        </form>
        
    </v-row>
    
</v-container>
</template>

<script>
import axios from 'axios';
import { useCookies } from "vue3-cookies";

export default {

    name: 'LoginPage',
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
    methods: {
        login() {

            // console.log(this.username);
                axios.post('https://demoetenders.tn.nic.in/supportdora/salt', this.username, {
                        headers: {
                            "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                            "Content-Type": `application/x-www-form-urlencoded`
                        }
                    })
                    .then(response => {
                        console.log(response.data[0].SALT);
                        // console.log(response.headers.get('set-cookie'));
                        console.log(response.headers['Set-Cookie'])
                        // console.log(response.data.Cookies);
                    })
                    .catch(error => {
                        console.log('Error fetching data:', error);
                    });

            
            // if (this.input.username === 'admin@gmail.com' && this.input.password === 'Admin123@') {
            //     this.$router.push('/AdminPageDashboard');
            //     localStorage.setItem("Admin", "User");
            // } else if (this.input.username === 'nagarajaneproc@gmail.com' && this.input.password === 'Naga123@') {
            //     this.$router.push('/Agent');
            //     localStorage.setItem("Agent", "User");
            // } else if (this.input.username === 'user' && this.input.password === 'user@') {
            //     this.$router.push('/Userhome');
            //     localStorage.setItem("User", "User");
            // } else {
            //     alert('Invalid username or password');
            // }
        }
    },
    // mounted(){
    //     let my_cookie_value = this.cookies.get("set-cookie");
    //     // console.log(my_cookie_value);
    // }
}
</script>

<style scoped>
label {
    margin: 10px;
}
input{
    background-color: white;
    border-radius: 15px;
    padding: 5px;
}

.forminput {
    padding: 40px 0px;
    border: solid 1px rgb(167, 167, 167);
    border-radius: 15px;
    width: 500px;
    box-shadow: 10px 10px 5px cadetblue; 
}

.genpass{
    margin: 35px;
}

.loginbtn{
    margin: 20px;
}

.v-container{
    margin-top: 125px;
}

.heading{
    font-size: 35px;
    text-transform: uppercase;
}

.pagebg{
    background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
}
</style>
