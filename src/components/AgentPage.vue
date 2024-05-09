<template>
<!-- <TitleSection /> -->

<v-table class="table">
    <thead>
        <th>Requestid</th>
        <th>Category</th>
        <th>SubCategory</th>
        <th>Portal Name</th>

    </thead>
    <tbody v-for="issues in asignissue" v-bind:key="issues" style=" text-wrap:calc(10)">
        <tr>
            <td>{{ issues.request_id }}</td>
            <td>{{ issues.category }}</td>
            <td>{{ issues.subcategory }}</td>
            <td>{{ issues.portal }}</td>
            <td>
                <v-btn class="btn btn-outline-dark" v-on:click.prevent="View(issues.request_id)"> View </v-btn>
            </td>
        </tr>

    </tbody>
</v-table>
</template>

<script>
import axios from 'axios';
// import TitleSection from './TitleSection.vue';

export default {
    name: 'AgentPage',
    // components: {
    //     TitleSection
    // },
    data() {
        return {
            requestid: null,
            asignissue: []
        }
    },
    methods: {
        logout() {
            this.$router.push('/AdminPageDashboard');

        },
        View(request_id) {
            this.requestid = request_id
            console.log(this.requestid)
            window.localStorage.setItem('Requestid', this.requestid)
            this.$router.push('/Issue');
        },
        open(id) {
            this.issueid = id
            console.log(this.issueid)
            window.localStorage.setItem('Issueid', this.issueid)
            this.$router.push('/ViewIssue');
        },

        assignedIssue() {
            axios.get('https://demoetenders.tn.nic.in/supportdora/portal-requestlists', {
                    params: {
                        "support_user_id": 2,
                        "portalId": 1,
                        "rowNo": 0
                    },
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": 'application/json'
                    }
                })
                .then(response => {
                    this.asignissue = response.data

                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        }
    },
    created() {
        this.assignedIssue()
    },
}
</script>
