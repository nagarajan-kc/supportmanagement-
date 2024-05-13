<template>
   <UserTitle />
   <v-btn type="submit" v-on:click.prevent="back()" icon="mdi-arrow-left"> </v-btn>
<h1>Task Manager</h1>
<div class="issuelist">

    <div v-for="issues in issue" v-bind:key="issues" style=" text-wrap:calc(10)">
        <!-- <tr> -->
        <v-row>
            <label class="labeltext">Requestid:</label> 
            <label class="labeldesc">{{ issues.request_id }}</label>
        </v-row>
        <v-row>
            <label class="labeltext">Issue: </label>
            <label class="labeldesc">{{ issues.subject }}</label>
        </v-row>
        <v-row>
            <label class="labeltext">Description: </label>
            <label class="labeldesc">{{ issues.description }}</label>
        </v-row>
    </div>
</div>
<form>
    <v-btn variant="outlined" size="small" class="bg-blue-darken-3">Reply</v-btn>    
    <v-btn type="submit" variant="outlined" size="small" class="bg-blue-darken-3" v-on:click.prevent="sendTask()">Escalet</v-btn>
</form>
<br>
<br>
<!-- <v-btn class="btn btn-outline-dark" type="submit" v-on:click.prevent="back()"> <v-icon
          icon="mdi-arrow-left"
          start
        ></v-icon>
    Back
</v-btn> -->
</template>

<script>
import axios from 'axios';
import UserTitle from './UserTitle.vue';

export default {
    name: 'EsclateIssue',
    components:{
        UserTitle
    },
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
.labeltext {
    font-weight: bold;
    width: 200px;
    text-align: left;
    border: 1px solid black;
    padding: 5px;
}
.labeldesc {
    width: 600px;
    text-align: left;
    border: 1px solid black;
    padding: 5px;
}
.labeltext{
    font-weight: bold;
    width: 200px;
    text-align: left;
    border: 1px solid black;
    padding: 5px;
}
.issuelist {
    display: inline-grid;
    justify-content: center;
    padding: 20px;
}
select {
  -webkit-appearance: menulist !important;
  -moze-appearance: menulist !important;
  appearance: menulist !important;
}
</style>