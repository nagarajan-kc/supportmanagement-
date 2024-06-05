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
    <v-cols cols="auto">
        <v-btn size="small" variant="outlined" v-on:click="showinp()" class="bg-blue-darken-3">Reply</v-btn>
    </v-cols>
    <v-btn type="submit" variant="outlined" size="small" class="bg-blue-darken-3" v-on:click.prevent="sendTask()">Escalet</v-btn>
    <!-- <v-row align="center" justify="center">
        <label for="Status">Status:</label>
        <v-radio-group inline class="radiobtn" >
            <v-radio label="Unblock" value="true"></v-radio>
            <v-radio label="Block" value="false"></v-radio>
        </v-radio-group> 
    </v-row> -->
    <v-container v-if="showdetails">
        <form enctype="multipart/form-data">
            <v-row align="center" justify="center">
                <v-col cols="auto">Description: </v-col>
                <textarea v-model="formData.description" placeholder="Description of the Issue.." rows="4" cols="35" required></textarea>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="auto">Attachments: </v-col>
                <input id="attach" type="file" @change="checkFile">
            </v-row>
            <v-row align="center" justify="center">
                <v-btn stype="submit" variant="outlined" size="small" class="bg-blue-darken-3" v-on:click="hideinp()">Submit</v-btn>
            </v-row>
        </form>

    </v-container>
</form>
<v-container class="communicationsec">
    <h2>Communications</h2>
    <v-row v-for="item in communicationlist" :key="item.communication_id">
        <v-col align="left" justify="center" v-if="item.support_user_id" cols="auto" class="replytext">
            <v-card subtitle="Agent:" variant="outlined" class="bg-grey-lighten-4">
                <v-card-subtitle align="right">{{ item.createddate }} </v-card-subtitle>
                <v-card-text>{{ item.remarks }}</v-card-text>
                <v-card-text v-if="item.attachments">
                    <a v-for="doc in item.attachments" :key="doc">
                        {{ doc.download_link }}
                    </a>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col align="left" justify="center" v-if="item.gepnic_enduser_id" cols="7">
            <v-card subtitle="User:" variant="outlined">
                <v-card-subtitle align="right">{{ item.createddate }} </v-card-subtitle>
                <v-card-text>
                    {{ item.remarks }}
                </v-card-text>
                <v-card-text v-if="item.attachments">
                    <p v-for="doc in item.attachments" :key="doc">
                        <v-btn v-on:click="downloadFile(doc)">download</v-btn>
                    </p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

</v-container>
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
    components: {
        UserTitle
    },
    data() {
        return {

            sentTasks: [],
            requestId: window.localStorage.getItem('Requestid'),
            issue: [],
            agent: [],
            communicationlist: 0,
            showdetails: false,
            formData: {
                description: "",
                file: ""
            }
        };

    },
    methods: {
        back() {

            this.$router.push('/Agent')
        },
        showinp() {
            this.showdetails = true
        },
        hideinp() {

            const saveData = new FormData()
            saveData.append('portalId', 1)
            saveData.append('requestId', this.requestId)
            saveData.append('remarks', this.formData.description)
            saveData.append('supportUserId', 2)
            for (let i = 0; i < this.formData.file.length; i++) {
                saveData.append('files', this.formData.file[i])
            }
            for (const pair of saveData.entries()) {
                console.log(pair);
            }
            axios.post('https://demoetenders.tn.nic.in/supportdora/create-communication', saveData, {

                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `multipart/form-data`
                    },

                })
                .then(response => {
                    this.usercreate = response.data

                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });

            this.showdetails = false
        },

        sendTask() {

            let send = {
                requestId: this.requestId,
                supportLevel: 2
            }
            // console.log(send);
            axios.put('https://demoetenders.tn.nic.in/supportdora/update-request', send, {

                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `application/x-www-form-urlencoded`
                    },

                })
                .then(response => {
                    response.data
                    // console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
            this.$router.push('/Agent')
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
                // console.log(response.data);
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
    },
    async mounted() {
        await axios.get("https://demoetenders.tn.nic.in/supportdora/communications", {
            headers: {
                "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,

            },
            params: {
                requestId: this.requestId
            }
        }).then(response => {
            this.communicationlist = response.data
            console.log(this.communicationlist)
            for (let i = 0; i < this.communicationlist.length; i++) {
                this.attacheddoc[i] = this.communicationlist[i].attachments
            }
        }).catch(error => {
            console.log("error fetching", error)
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

.labeltext {
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

textarea {
    border: solid 1px rgb(11, 0, 0);
}

.communicationsec {
    margin-top: 10px;
    border-top: solid 1px rgb(167, 167, 167);
}

.replytext {
    padding-left: 500px;
}
</style>
