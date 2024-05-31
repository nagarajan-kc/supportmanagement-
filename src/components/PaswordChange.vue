<template>
<v-container align="center" justify="center">
    <v-row align="center" justify="center">
        <pre class="heading">Generate Password</pre>
    </v-row>
    <v-row align="center" justify="center">
        <form name="login-form" class="bg-green-lighten-5 forminput">
            <v-row align="center" justify="center">
                <label for="username" class="head">Username: </label>
                <input type="text" id="username" class="inputtext" v-model="username" />
            </v-row>
            <v-row align="center" justify="center">
                <label for="oldpassword" class="head">Old Password: </label>
                <input type="text" id="oldpass" class="inputtext" v-model="oldpass" />
            </v-row>
            <v-row align="center" justify="center">
                <label for="newpassword" class="head">New Password:</label>
                <input type="text" id="newpass" class="inputtext" v-model="newpass" />
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="auto">
                    <v-btn class="bg-light-blue-darken-4 loginbtn" type="submit" @click="back()">
                        Cancel
                    </v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn class="bg-light-blue-darken-4 loginbtn" type="submit" @click="changePassword()">
                        Login
                    </v-btn>
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
    name: 'PaswordChange',
    data() {
        return {
            username: "",
            oldpass: "",
            newpass: "",
            oldHash: " "
        }

    },
    methods: {
        back() {
            this.$router.push('/')
        },
        changePassword() {
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
                                let oldPassHash = saltValue + '##' + sha512(this.oldpass);
                                let newPassHash = '***' + sha512(this.newpass);
                                let oldHash = sha512(oldPassHash);
                                console.log(saltValue);
                                console.log(oldPassHash);
                                console.log(oldPassHash.split('##')[0]);
                                console.log(oldPassHash.split('##')[1]);
                                console.log(newPassHash);
                                console.log(oldHash);
                                let password = {
                                    username: this.username,
                                    oldPassword: this.oldHash,
                                    newPassword: this.newPassHash
                                }
                                console.log(password);
                                axios.post('https://demoetenders.tn.nic.in/supportdora/login', password, {
                                        headers: {
                                            "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                                            "Content-Type": `application/x-www-form-urlencoded`
                                        }
                                    })
                                    .then(response => {
                                        //   response.data
                                        console.log(response.data);
                                    })
                                    .catch(error => {
                                        console.log('Error fetching data:', error);
                                    });
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

<style scoped>
label {
    margin: 10px;
}

input {
    background-color: white;
}

.inputtext {
    border-radius: 13px;
    font-weight: lighter;
    background-color: white;
    width: 280px;
    padding: 5px;
}

.forminput {
    padding: 40px 0px;
    border: solid 1px rgb(167, 167, 167);
    border-radius: 15px;
    width: 500px;
    box-shadow: 10px 10px 5px cadetblue;
}

.head {
    width: 115px;
    text-align: left;
}

.loginbtn{
    margin: 20px;
}

.v-container{
    margin-top: 125px;
}
.heading {
    font-size: 30px;
    text-transform: uppercase;
}
</style>
