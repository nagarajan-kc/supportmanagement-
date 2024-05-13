<template>
<TitleSection />
<h2>Update Agent:</h2>
<form name="UpdateUser" >

    <div class="mb-3">
        <label for="SupportID">SupportID: {{ UserList.support_user_id }}</label>
        <!-- <input  id="SupportID" v-model="UserList.support_user_id" /> -->
    </div>
    <div class="mb-3">
        <label for=" Name">Name: </label>
        <input type="text" id="First Name" v-model="UserList.name" />
    </div>

    <div class="mb-3">
        <label for="MobileNo">Mobile No: </label>
        <input type="Number" id="MobileNo" v-model="UserList.mobileNo" />
    </div>

    <div>
        <label for="EmailId">Email Id: </label>
        <input type="text" id="EmailId" v-model="UserList.email" />
    </div>

    <div>
        <label>Role:</label>
        <!-- <select v-model="this.roleId"> -->
            <!-- <option type="text">-Select-</option> -->
            <select v-model="this.role">
                    <option v-for="roles in rolelist" v-bind:key="roles" :value="roles.id ">{{ roles.name}}</option>
                </select>
        <!-- </select> -->
    </div>
    <div>
        <label for="Portal">Portal Name: </label>
        <input type="text" id="Portal" v-model="UserList.portal_name" />
    </div>
    <v-row align="center" justify="center">
        <v-col cols="auto">
            <label for="Status" >Status:</label>
        </v-col>
        <v-col cols="auto">
            <v-radio-group inline class="radiobtn" v-model="UserList.isactive">
          <v-radio label="Unblock" value="true"></v-radio>
          <v-radio label="Block" value="false"></v-radio>
         
        </v-radio-group>
        </v-col>

        
        <!-- <label for="Status" >Status:</label>
        <input type="radio" id="Unblock" name="Status" value="true" v-model="UserList.isactive" >
        <label for="Unblock">Unblock</label>
        <input type="radio" id="Block" name="Status" value="false" v-model="UserList.isactive">
        <label for="Block">Block</label> -->
        </v-row>
    <br>

    <v-btn class="btn btn-outline-dark" type="submit" v-on:click.prevent="Cancel()">
        Cancel
    </v-btn>
    <v-btn class="btn btn-outline-dark" type="submit" v-on:click.prevent="save()">
        Save
    </v-btn>
</form>
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
            UserList:[],
            rolelist: [],
        }
    },
    methods: {
        save() {

            let assign = {
                supportUserId : this.UserList.support_user_id,
                name: this.UserList.name,
                email: this.UserList.email,
                mobileNo : this.UserList.mobileNo ,
                isactive: this.UserList.isactive,
                roleId: this.role,
                portal_name:this.UserList.portal_name
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
                // this.$router.push('/AgentList')
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
                for(let i=0; i< response.data.length;i++){
                    if(response.data[i].support_user_id == this.requestId){
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
.radiobtn{
    font-size: 10px !important;
    color: black !important;
}

select {
  -webkit-appearance: menulist !important;
  -moze-appearance: menulist !important;
  appearance: menulist !important;
}
</style>