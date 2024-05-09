<template>
<TitleSection />
<h1>Task Manager - Admin Dashboard</h1>
<v-container>

    <!-- <div v-for="issues in issue" v-bind:key="issues" style=" text-wrap:calc(10)"> -->
    <!-- <tr> -->
    <p><label class="labeltext">Requestid:</label>{{ issue.request_id }}</p>
    <p><label class="labeltext">Issue: </label> {{ issue.subject }}</p>
    <p><label class="labeltext">Description: </label> {{ issue.description }}</p>
    <p><label class="labeltext">AssignedUser: </label>: {{ issue.name }}</p>
    <!-- </div> -->
</v-container>
<form>
    <label for="agent">Send To:</label>
    <select v-model="name" placeholder="Assign">
        <option>Assign To</option>
        <option v-for="agents in agent" :key="agents.support_user_id" :value="[agents.support_user_id]">{{ agents.name }}</option>
    </select>
    <br>
    <br>
    <v-btn type="submit" v-on:click.prevent="sendTask()">Send Task</v-btn>
</form>
<br>
<br>
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
                    //  response.data
                    console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });

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
}
</style>
