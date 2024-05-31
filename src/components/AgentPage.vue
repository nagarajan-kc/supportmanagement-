<template>
    <UserTitle />
    <v-row align="center" justify="center">
        <v-col align="center" justify="center">
            <form @submit.prevent>
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <label>Search:</label>
                    </v-col>
                    <v-col cols="auto">
                        <input type="text" class="outline" v-model="searchvalue" required />
                    </v-col>
                    <v-col cols="auto">
                        <label>Search By:</label>
                    </v-col>
                    <v-col cols="6">
                        <v-radio-group inline class="radiobtn" v-model="searchparameter">
                            <v-radio label="Request Id" value="requestId"></v-radio>
                            <v-radio label="Tender Id" value="tenderId"></v-radio>
                            <v-radio label="Eproc Reference Number" value="eprocRefNo"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn size="small" type="submit" variant="outlined" v-on:click="search()">Search</v-btn>
                    </v-col>
                </v-row>
            </form>
        </v-col>
        <v-col cols="auto" align="center" justify="center">
            <v-btn size="small" type="submit" variant="outlined" v-on:click="clear()">Clear</v-btn>
        </v-col>
    </v-row>
    <v-table class="manageissue">
        <thead class="tableheading">
            <th>Requestid</th>
            <th>Subject</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Portal Name</th>
            <th>View Issue</th>

        </thead>
        <tbody>
            <tr v-for="issues in asignissue" v-bind:key="issues" style=" text-wrap:calc(10)">
                <td>{{ issues.request_id }}</td>
                <td>{{ issues.subject }}</td>
                <td>{{ issues.category }}</td>
                <td>{{ issues.subcategory }}</td>
                <td>{{ issues.portal }}</td>
                <td>
                    <v-btn variant="outlined" size="small" v-on:click.prevent="View(issues.request_id)"
                        class="bg-blue-darken-3"> View </v-btn>
                </td>
            </tr>
        </tbody>
        <tbody v-if="this.nodata === true">
            <tr>
                <td class="data">No record found</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
import axios from 'axios';
import UserTitle from './UserTitle.vue';

export default {
    name: 'AgentPage',
    components: {
        UserTitle
    },
    data() {
        return {
            requestid: null,
            asignissue: [],
            searchvalue: "",
            searchparameter: "",
            requestids: "",
            tenderId: "",
            eprocRefNo: "",
            nodata: false
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
                    console.log(this.asignissue);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        search() {
            if (this.searchvalue == '' || (this.searchvalue != '' && this.searchparameter == '')) {
                alert("select search by")
                console.log("ahhh")
            } else {
                if (this.searchparameter == 'requestId') {
                    this.requestid = this.searchvalue
                } else if (this.searchparameter == 'tenderId') {
                    this.tenderid = this.searchvalue
                } else {
                    this.refnumber = this.searchvalue
                }
                this.nodata= false
                axios.get("https://demoetenders.tn.nic.in/supportdora/portal-requestlists", {
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    },
                    params: {
                        portalId: 1,
                        rowNo: 0,
                        ...(this.requestid ? { requestId: this.requestid } : {}),
                        ...(this.tenderid ? { tenderId: this.tenderid } : {}),
                        ...(this.refnumber ? { tenderId: this.refnumber } : {})
                    }
                }).then(response => {
                    console.log(response.data);
                    this.asignissue = response.data
                    if(this.asignissue.length == 0){
                        this.nodata = true
                        console.log(this.nodata)
                    }
                }).catch(error => {
                    console.log("error fetching", error)
                });
            }
        },
        clear() {
            this.assignedIssue(),
            this.searchvalue = '',
            this.searchparameter = '',
            this.nodata = "fasle"
        }
    },
    created() {
        this.assignedIssue()
    },
}
</script>

<style scoped>
.outline {
    border: solid 1px rgb(167, 167, 167);
    border-radius: 5px;
    padding: 0px 5px;
    font-weight: lighter;
}

.radiobtn {
    padding-top: 25px;
    font-size: 10px !important;
    color: black;
}

.manageissue {
    width: 98%;
    margin: 10px 20px;
    border: 1px solid black;
}

.tableheading {
    background-color: bisque;
}

th,
td {
    border-right: 1px solid black;
}

th {
    border-bottom: 1px solid black;
}

.data{
    text-align: center;
    border-right: 0px !important; 
}
</style>