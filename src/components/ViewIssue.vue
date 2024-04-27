<template>
<h1>Task Manager - Agent Dashboard</h1>
<v-container>
    <div v-for="user in users" :key="user.id">
        <v-row v-if="user.id == issueId">
            <v-col>
                Id: {{ user.id }}
            </v-col>
        </v-row>
        <v-row v-if="user.id == issueId">
            <v-col>
                Issue: {{ user.Issue }}
            </v-col>
        </v-row>
        <v-row v-if="user.id == issueId">
            <v-col>
                Description: {{ user.Description }}
            </v-col>
        </v-row>
        <v-row v-if="user.id == issueId">
            <v-col>
                Portal: {{ user.Portal }}
            </v-col>
        </v-row>

    </div>
</v-container>
<v-row>
    <v-col>
        <input type='text' placeholder='Reply ' />
    </v-col>
</v-row>
<button class="btn btn-outline-dark" type="back" v-on:click.prevent="back()">Back</button>
</template>

  
<script>
import userData from '../User.json'
export default {
    name: 'ViewIssue',

    data() {
        return {
            issueId: window.localStorage.getItem('Issueid'),
            users: userData,
        };
    },
    methods: {
        back() {
            this.$router.push('/Agent')
        }
    }
}
</script>
