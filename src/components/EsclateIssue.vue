<template>
    <!-- <TitleSection/> -->
<h1>Task Manager</h1>
<v-container>

    <div v-for="issues in issue" v-bind:key="issues" style=" text-wrap:calc(10)">
        <!-- <tr> -->
        <p><label class="labeltext">Requestid:</label> {{ issues.request_id }}</p>
        <p><label class="labeltext">Issue: </label>{{ issues.subject }}</p>
        <p><label class="labeltext">Description: </label>{{ issues.description }}</p>
    </div>
</v-container>
<form>
    <label for="agent">Send To:</label>
    
    <v-btn type="submit"  v-on:click.prevent="sendTask()">Send Task</v-btn>
</form>
<br>
<br>
<v-btn class="btn btn-outline-dark" type="submit" v-on:click.prevent="back()">
    Back
</v-btn>
</template>

<script>
import axios from 'axios';
// import TitleSection from './TitleSection.vue';

export default {
    name: 'EsclateIssue',
    // components:{
    //   TitleSection
    // },
    data() {
        return {
            
            sentTasks: [],
            requestId: window.localStorage.getItem('Requestid'),
            issue: [],
            agent: []
        };

    },
    methods: {
        back() {
            // console.log(this.requestId)
            this.$router.push('/Agent')
        },
        sendTask() {
           console.log(this.agent)
        
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
                this.issue = response.data[0].requestdetails
                console.log(response.data);
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
.labeltext{
    font-weight: bold;
}
</style>