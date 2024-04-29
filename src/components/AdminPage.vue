<template>
    <div class="backcolor">
<div >
    <h3 class="admin">Welcome Admin</h3>
    <v-col >
        <input type='text' v-model="search" placeholder='Search ' class="search"/>
    </v-col>
    <v-container>
    <v-row>
     
        <v-col>
            <v-btn class="btn btn-outline-dark" v-on:click.prevent="UserCreate()"> Create </v-btn>
        </v-col>
        <v-col>
            <v-btn class="btn btn-outline-dark" v-on:click.prevent="UpdateUser()"> Update </v-btn>
        </v-col>
        <v-col>
            <v-btn class="btn btn-outline-dark" v-on:click.prevent="Agent()"> AgentDasboard </v-btn>
        </v-col>
        <v-col>
            <v-btn class="btn btn-outline-dark" v-on:click.prevent="supportusers()"> SupportUsers </v-btn>
        </v-col>
        
    </v-row>

</v-container>
<br>
    <v-table class="table">
<thead>
        <th>id</th>
        <th>Issue</th>
        <th>Description</th>
        <th>Portal Name</th>

</thead>
<tbody v-for="issues in issue" v-bind:key="issues">
    <tr>
        <td >{{ issues.request_id }}</td>
        <td v-align="center" justify="center">{{ issues.subject }}</td>
        <td >{{ issues.description }}</td>
        <td >{{ issues.Portal }}</td>
        <!-- <td ><v-btn class="btn btn-outline-dark"  v-on:click.prevent= "assignTask(user.id)" > Assign </v-btn></td> -->
    </tr>

</tbody>
</v-table>
</div>
<!-- {{ issue }} -->
<!-- <tbody v-for="issues in issue" v-bind:key="issues" > -->
    <!-- <tr> -->
        <!-- <td >Description: {{ issues.description }}</td> -->

    <!-- </tr> -->

<!-- </tbody> -->
</div>
</template>

<script>
// import userData from '../User.json'
import axios from 'axios'
export default {
    name: 'AdminPage',
    data() {
        return {
            // users:userData,
            requestid: null,
            issue: []
        }
    },
    methods: {
        logout() {
            this.$router.push('/');

        },
        UserCreate() {
            this.$router.push('/CreateSupportAgent');

        },
        UpdateUser() {
            this.$router.push('/UpdateAgent');
        },
        assignTask(id) {
            this.requestid = id
            console.log(this.requestid)
            window.localStorage.setItem('Requestid', this.requestid)
            this.$router.push('/AssignTask');
        },
        Search() {
            console.log('hello')
        },
        Agent() {
            this.$router.push('/Agent')
        },

        supportusers() {
            this.$router.push('/AgentList')
        },

        issuelist() {
            // console.log('issuelist');
            axios.get('https://demoetenders.tn.nic.in/supportdora/admin-requestlists', {
                    params: {
                        "rowNo": 0
                    },
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": 'application/json'
                    }
                })
                .then(response => {
                    this.issue = response.data
                    // console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
    },
    created() {
        this.issuelist()
    },
}
</script>
<style scoped >
.backcolor{
    background-color:rgb(170, 48, 4);
}

.search{
    background-color:rgb(212, 201, 201);
}

</style>
