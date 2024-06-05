<template>
<v-container align="center" justify="center">
    <v-row align="center" justify="center">
        <pre class="heading">Generate Password</pre>
    </v-row>
    <v-row align="center" justify="center">
        <form name="login-form" class="bg-green-lighten-5 forminput">
            <v-row align="center" justify="center">
                <label for="username" class="head">Username: </label>
                <input type="text" id="userId" @focusout="generateSalt" class="inputtext" v-model="userId" />
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
                    <v-btn class="bg-light-blue-darken-4 loginbtn" type="submit" v-on:click="changePassword()">
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
            oldHash: " ",
            newPassHash: "",
        }
    },
    methods: {
        back() {
            this.$router.push('/')
        },
        generateSalt() {
            let saltparam = {
                userId: this.username,
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
        },
        changePassword() {
            if (this.userId && this.oldpass && this.newpass) {
                let saltValue = this.salt;
                if (saltValue) {
                    let oldPassHash = saltValue + sha512(this.oldpass);
                    this.newPassHash = sha512(this.newpass);
                    this.oldHash = sha512(oldPassHash);
                    let password = {
                        username: this.userId,
                        oldPassword: this.oldHash,
                        newPassword: this.newPassHash,
                        saltToken: this.saltToken,
                        salt: this.salt
                    }
                    axios.post('https://demoetenders.tn.nic.in/supportdora/change-password', password, {
                            headers: {
                                "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                                "Content-Type": `application/x-www-form-urlencoded`
                            }
                        })
                        .then(response => {
                            console.log(response.data);
                            alert("password changed successfully")
                        })
                        .catch(error => {
                            console.log('Error fetching data:', error);
                        });
                }
            }
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

.loginbtn {
    margin: 20px;
}

.v-container {
    margin-top: 125px;
}

.heading {
    font-size: 30px;
    text-transform: uppercase;
}
</style>
