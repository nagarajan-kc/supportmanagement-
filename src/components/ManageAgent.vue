<template>
<TitleSection />
<v-table class="manageuser">
    <thead class="tableheading">
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>MobileNumber</th>
        <th>Portal</th>
        <th>Role</th>
        <th>Action</th>
    </thead>
    <tbody v-for="(agents,index) in agent" v-bind:key="index">
        <tr>
            <td>{{ agents.support_user_id }}</td>
            <td>{{ agents.name }}</td>
            <td>{{ agents.email }}</td>
            <td>{{ agents.mobile_number }}</td>
            <td>{{ agents.portal_name }}</td>
            <td>{{ agents.role_name }}</td>
            <td>
                <v-btn variant="outlined" size="small" class="bg-light-blue-darken-4" v-on:click.prevent="UpdateUser(agents.support_user_id)"> Update </v-btn>
            </td>
        </tr>

    </tbody>

</v-table>
<v-col>
    <v-btn class="btn btn-outline-dark" v-on:click.prevent="backPage()" color="blue"> Back </v-btn>
</v-col>
<!-- <button class="btn btn-outline-dark" type="back" v-on:click.= "back()">Back</button>  -->
</template>

<script>
import axios from 'axios';
import TitleSection from './TitleSection.vue';

export default {
    name: 'ManageAgent',
    components: {
        TitleSection
    },
    data() {
        return {
            requestid: null,
            agent: [],
        }
    },

    methods: {
       
        fetchData() {
            axios.get('https://demoetenders.tn.nic.in/supportdora/support-users', {
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": 'application/json'
                    },
                })
                .then(response => {
                    this.agent = response.data
                    console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        backPage() {
            this.$router.push('/AdminPageDashboard')
        },
        UpdateUser(support_user_id) {
            this.requestid = support_user_id
            console.log(this.requestid)
            window.localStorage.setItem('Requestid', this.requestid)
            this.$router.push('/UpdateAgent');
        },
    },
    created() {
        this.fetchData()
    },

    backPage() {
        this.$router.push('/AdminPageDashboard')
    }

}
</script>

<style scoped>
.manageuser{
    width: 98%;
    margin: 10px 20px; 
    border: 1px solid black;
}
.tableheading{
    background-color: bisque;
}
th,td{
    border-right: 1px solid black;
}

th{   
    border-bottom: 1px solid black;
}
</style>
