<template>
<TitleSection />
<h2>Update Agent:</h2>
<v-container>
    <v-row v-align="center" justify="center" class="bg-green-lighten-5 forminput">
        <form name="UpdateUser">
            <v-row class="data">
                <label for="SupportID">SupportID: {{ UserList.support_user_id }}</label>
                <!-- <input  id="SupportID" v-model="UserList.support_user_id" /> -->
            </v-row>
            <v-row class="data">
                <label for=" Name">Name: </label>
                <input type="text" id="First Name" v-model="UserList.name" />
            </v-row>

            <v-row class="data">
                <label for="MobileNo">Mobile No: </label>
                <input type="Number" id="MobileNo" v-model="UserList.mobileNo" />
            </v-row>

            <v-row class="data">
                <label for="EmailId">Email Id: </label>
                <input type="text" id="EmailId" v-model="UserList.email" />
            </v-row>

            <v-row class="data">
                <label>Role:</label>
                <!-- <select v-model="this.roleId"> -->
                <!-- <option type="text">-Select-</option> -->
                <select v-model="this.role">
                    <option v-for="roles in rolelist" v-bind:key="roles" :value="roles.id ">{{ roles.name}}</option>
                </select>
                <!-- </select> -->
            </v-row>
            <v-row class="data">
                <label for="Portal">Portal Name: </label>
                <input type="text" id="Portal" v-model="UserList.portal_name" />
            </v-row>
            <v-row align="center" justify="center">
                <label for="Status">Status:</label>
                <v-radio-group inline class="radiobtn" v-model="UserList.isactive">
                    <v-radio label="Unblock" value="true"></v-radio>
                    <v-radio label="Block" value="false"></v-radio>
                </v-radio-group>
                <!-- <label for="Status" >Status:</label>
    <input type="radio" id="Unblock" name="Status" value="true" v-model="UserList.isactive" >
    <label for="Unblock">Unblock</label>
    <input type="radio" id="Block" name="Status" value="false" v-model="UserList.isactive">
    <label for="Block">Block</label> -->
            </v-row>
        </form>
    </v-row>

    <v-row v-align="center" justify="center">
        <v-btn variant="outlined" class="bg-light-blue-darken-4" v-on:click.prevent="Cancel()">
            Cancel
        </v-btn>
        <v-btn variant="outlined" class="bg-light-blue-darken-4" v-on:click.prevent="save()">
            Save
        </v-btn>
    </v-row>

</v-container>
</template>

<script>
import TitleSection from './TitleSection.vue';
import axios from 'axios';
export default {

    name: 'UpdateUser',
    components: {
        TitleSection
    },
    data() {
        return {
            role: "",
            requestId: window.localStorage.getItem('Requestid'),
            UserList: [],
            rolelist: [],
        }
    },
    methods: {
        save() {

            let assign = {
                supportUserId: this.UserList.support_user_id,
                name: this.UserList.name,
                email: this.UserList.email,
                mobileNo: this.UserList.mobileNo,
                isactive: this.UserList.isactive,
                roleId: this.role,
                portal_name: this.UserList.portal_description
            }
            console.log(assign);
            axios.put('https://demoetenders.tn.nic.in/supportdora/update-supportuser', assign, {

                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `application/x-www-form-urlencoded`
                    },

                })
                .then(response => {
                    response.data
                    console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
            this.$router.push('/AgentList')
        },
        Cancel() {
            this.$router.push('/AgentList')
        }
    },
    async mounted() {

        await axios.get("https://demoetenders.tn.nic.in/supportdora/roles", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                }
            })
            .then(response => {
                this.rolelist = response.data
            }).catch(error => {
                console.log("error fetching role", error)
            });
    },

    created() {
        axios.get('https://demoetenders.tn.nic.in/supportdora/support-users', {

                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    "Content-Type": 'application/json'
                }
            })
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].support_user_id == this.requestId) {
                        this.UserList = response.data[i]
                    }
                    console.log(this.UserList.support_user_id);
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }
}
</script>

<style scoped>
form {
    text-align: left;
}

.data {
    margin: 5px;
    font-weight: bold;
    /* width: 29rem; */
}

.radiobtn {
    font-size: 10px !important;
    color: black !important;
}

select {
    -webkit-appearance: menulist !important;
    -moze-appearance: menulist !important;
    appearance: menulist !important;
}

label {
    width: 100px;
    color: #000306;
}

.v-container {
    width: 500px;
}

.inputtext {
    border-radius: 5px;
    font-weight: lighter;
    background-color: white;
    width: 280px;
    padding: 5px;
}

.forminput {
    padding: 40px 0px;
    border: solid 1px rgb(167, 167, 167);
    border-radius: 15px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>
