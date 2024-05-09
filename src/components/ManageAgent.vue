<template>
<TitleSection />
<v-table>
    <thead>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>MobileNumber</th>
        <th>Portal</th>
        <th>Role</th>
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
                <v-btn class="btn btn-outline-dark" v-on:click.prevent="UpdateUser()"> Update </v-btn>
            </td>
        </tr>

    </tbody>

</v-table>
<v-col>
    <v-btn class="btn btn-outline-dark" v-on:click.prevent="backPage()"> Back </v-btn>
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
        UpdateUser() {
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
