<template>
<v-container align="center" justify="center">
    <form name="login-form">
        <v-row align="center" justify="center">
            <label for="username">Username: </label>
            <input type="text" id="username" v-model="input.username" />
        </v-row>
        <v-row align="center" justify="center">
            <label for="password">Password: </label>
            <input type="password" id="password" v-model="input.password" />
        </v-row>
        <v-row align="center" justify="center">
            <v-btn class="btn btn-outline-dark" type="submit" v-on:click="login()">
                Login
            </v-btn>
            <router-link to="/ChangePassword">LOGIN</router-link>
        </v-row>
    </form>
</v-container>
</template>

<script>
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
    methods: {
        login() {

            if (this.input.username === 'admin@gmail.com' && this.input.password === 'Admin123@') {
                this.$router.push('/AdminPageDashboard');
                localStorage.setItem("Admin", "User");
            } else if (this.input.username === 'nagarajaneproc@gmail.com' && this.input.password === 'Naga123@') {
                this.$router.push('/Agent');
                localStorage.setItem("Agent", "User");
            } else if (this.input.username === 'user' && this.input.password === 'user@') {
                this.$router.push('/Userhome');
                localStorage.setItem("User", "User");
            } else {
                alert('Invalid username or password');
            }
        }
    }
}
</script>

<style scoped>
input,label{
  margin: 10px;
}

</style>
