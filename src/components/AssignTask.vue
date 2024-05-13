<template>
<TitleSection />
<h1>Task Manager - Admin Dashboard</h1>
<div class="issuelist">

    <!-- <div v-for="issues in issue" v-bind:key="issues" style=" text-wrap:calc(10)"> -->
    <!-- <tr> -->
    <v-row>
        <label class="labeltext">Requestid:</label>
        <label class="labeldesc">{{ issue.request_id }}</label>
    </v-row>
    <v-row>
        <label class="labeltext">Issue: </label>
        <label class="labeldesc">{{ issue.subject }}</label>
    </v-row>
    <v-row>
        <label class="labeltext">Description: </label>
        <label class="labeldesc">{{ issue.description }}</label>
    </v-row>
    <v-row>
        <label class="labeltext">AssignedUser: </label>
        <label class="labeldesc">{{ issue.name }}</label>
    </v-row>
    <!-- </div> -->
</div>
<form >
    <v-row align="center">
        <v-col>
            <label for="agent">Send To:</label>
            <select v-model="name">
                <option disabled value="">Assign To </option>
                <option v-for="agents in agent" :key="agents.support_user_id" :value="[agents.support_user_id,agents.name]">{{ agents.name }}</option>
            </select>
            <v-btn type="submit" variant="outlined" size="small" v-on:click.prevent="sendTask()">Assign</v-btn>
        </v-col>

    </v-row>

</form>

<v-btn class="btn btn-outline-dark" type="submit" v-on:click.prevent="back()">
    Back
</v-btn>
</template>

<script>
import axios from 'axios';
import TitleSection from './TitleSection.vue';

export default {
    name: 'AssignTask',
    components: {
        TitleSection
    },
    data() {
        return {

            sentTasks: [],
            requestId: window.localStorage.getItem('Requestid'),
            issue: {},
            agent: [],
            //    name: {},

        };

    },
    methods: {
        back() {
            // console.log(this.requestId)
            this.$router.push('/AdminPageDashboard')
        },
        sendTask() {

            let assign = {
                requestId: this.issue.request_id,
                assignedTo: this.name[0]
            }
            console.log(assign);
            axios.put('https://demoetenders.tn.nic.in/supportdora/update-request', assign, {

                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `application/x-www-form-urlencoded`
                    },

                })
                .then(response => {
                    //   response.data
                    console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
                this.$router.push('/AdminPageDashboard')
        },

    },

    created() {
        axios.get('https://demoetenders.tn.nic.in/supportdora/requestdetails-with-attachments', {
                params: {
                    "requestId": this.requestId
                },
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    "Content-Type": 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                console.log(response.data[0]);
                console.log(response.data[0].requestdetails);
                this.issue = response.data[0].requestdetails[0];
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
        axios.get('https://demoetenders.tn.nic.in/supportdora/support-users', {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    "Content-Type": 'application/json'
                },
            })
            .then(response => {
                this.agent = response.data
                // console.log(response.data);
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }
}
</script>

<style scoped>
.labeltext {
    font-weight: bold;
    width: 200px;
    text-align: left;
    border: 1px solid black;
    padding: 5px;
}

select {
    -webkit-appearance: menulist !important;
    -moze-appearance: menulist !important;
    appearance: menulist !important;
}

.labeldesc {
    width: 600px;
    text-align: left;
    border: 1px solid black;
    padding: 5px;
}

.issuelist {
    display: inline-grid;
    justify-content: center;
    padding: 20px;
}
form{
    width: 100%;
}
</style>
