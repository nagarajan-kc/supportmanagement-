<template>
<v-container>
    <v-row align="center" justify="center">
        <pre class="heading">Login</pre>
    </v-row>
    <v-row align="center" justify="center">
        <form name="login-form" class="bg-green-lighten-5 forminput">
            <v-row align="center" justify="center" v-if="this.error">
                <label>Authentication Failed</label>
            </v-row>
            <v-row align="center" justify="center">
                <label for="username">Username: </label>
                <input type="text" id="userId" @focusout="generateSalt" v-model="userId" />
            </v-row>
            <v-row align="center" justify="center">
                <label for="password">Password: </label>
                <input type="password" id="password" v-model="password" />
            </v-row>
            <v-row align="center" justify="center">
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
var sha512 = require('js-sha512');

export default {

    name: 'LoginPage',
    data() {
        return {
            password: "",
            userId: "",
            salt: "",
            saltToken: "",
            saltparam: {},
            logindata: {},
            status: "",
            role: 0,
            error: false
        }
    },
    methods: {
        login() {
            console.log(this.userId);
            let passHash = this.salt + sha512(this.password);
            console.log(passHash);
            let passwordash = sha512(passHash);
            console.log(passwordash);
            let saveData = {
                username: this.userId,
                encPassword: passwordash,
                saltToken: this.saltToken,
                salt: this.salt
            }
            console.log(saveData);

            axios.post('https://demoetenders.tn.nic.in/supportdora/login', saveData, {
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `application/x-www-form-urlencoded`
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.logindata = response.data
                    this.status = this.logindata[0].Status;
                    this.role = this.logindata[0].roles
                    if (this.status === "Success" && this.role == 4) {
                        this.$router.push('/AdminPageDashboard');
                    }else if(this.status === "Success" && this.role == 2){
                        this.$router.push('/Agent');
                    }
                    else{
                        this.error = true,
                        this.password = "",
                        this.userId = ""
                        this.$router.go(0)
                    }
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        generateSalt() {
            let saltparam = {
                userId: this.userId,
            }
            axios.post('https://demoetenders.tn.nic.in/supportdora/salt', saltparam, {
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `application/x-www-form-urlencoded`
                    },
                })
                .then(response => {
                    this.salt = response.data[0].SALT,
                    this.saltToken = response.data[0].TOKEN
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        }
    },
}
</script>

<style scoped>
label {
    margin: 10px;
}

input {
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

.genpass {
    margin: 35px;
}

.loginbtn {
    margin: 20px;
}

.v-container {
    margin-top: 125px;
}

.heading {
    font-size: 35px;
    text-transform: uppercase;
}

.pagebg {
    background-image: linear-gradient(to right, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1));
}
</style>
