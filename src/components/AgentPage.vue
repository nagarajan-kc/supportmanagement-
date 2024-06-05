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
        <tbody v-if="this.userlevel === 1">
            <tr v-for="issue in L1list" v-bind:key="issue" style=" text-wrap:calc(10)">
                <td>{{ issue.request_id }}</td>
                <td>{{ issue.subject }}</td>
                <td>{{ issue.category }}</td>
                <td>{{ issue.subcategory }}</td>
                <td>{{ issue.portal }}</td>
                <td>
                    <v-btn variant="outlined" size="small" v-on:click.prevent="View(issue.request_id)"
                        class="bg-blue-darken-3"> View </v-btn>
                </td>
            </tr>
        </tbody>
        <tbody v-if="this.userlevel === 2">
            <tr v-for="issue in L2list" v-bind:key="issue" style=" text-wrap:calc(10)">
                <td>{{ issue.request_id }}</td>
                <td>{{ issue.subject }}</td>
                <td>{{ issue.category }}</td>
                <td>{{ issue.subcategory }}</td>
                <td>{{ issue.portal }}</td>
                <td>
                    <v-btn variant="outlined" size="small" v-on:click.prevent="View(issue.request_id)"
                        class="bg-blue-darken-3"> View </v-btn>
                </td>
            </tr>
        </tbody>
        <tbody v-if="this.userlevel === 2">
            <tr v-for="issue in L3list" v-bind:key="issue" style=" text-wrap:calc(10)">
                <td>{{ issue.request_id }}</td>
                <td>{{ issue.subject }}</td>
                <td>{{ issue.category }}</td>
                <td>{{ issue.subcategory }}</td>
                <td>{{ issue.portal }}</td>
                <td>
                    <v-btn variant="outlined" size="small" v-on:click.prevent="View(issue.request_id)"
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
    <div class="text-center">
                <v-btn variant="plain" v-on:click="pagedecr()"><v-icon icon="mdi-menu-left"></v-icon >Previous</v-btn>
                <v-btn variant="plain" v-on:click="pageincre()">Next<v-icon icon="mdi-menu-right"></v-icon></v-btn>
            </div>
    
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
            nodata: false,
            L1list:[],
            L2list:[],
            L3list:[],
            userlevel: 1,
            rownumber: 0,   
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
        pageincre() {
            if(this.asignissue.length === 10)
            this.rownumber = this.rownumber + 10
            this.assignedIssue(this.rownumber)
        },

        pagedecr() {
            if(this.rownumber > 0){
                this.rownumber = this.rownumber - 10
            this.assignedIssue(this.rownumber)
            }
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
                    let j=0, k=0, n=0
                    for(let i=0;i<this.asignissue.length;i++){
                        if(this.asignissue[i].role === "L1"){
                            this.L1list[j] = this.asignissue[i];
                            j=j+1;
                        }else if(this.asignissue[i].role === "L2"){
                            this.L2list[k] = this.asignissue[i];
                            k=k+1;
                        }else{
                            this.L3list[n] = this.asignissue[i];
                            n=n+1;
                        }

                    }
                    console.log(this.L1list);
                    console.log(this.L2list);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        search() {
            if (this.searchvalue == '' || (this.searchvalue != '' && this.searchparameter == '')) {
                alert("select search by")
            } else {
                if (this.searchparameter == 'requestId') {
                    this.requestid = this.searchvalue
                } else if (this.searchparameter == 'tenderId') {
                    this.tenderid = this.searchvalue
                } else {
                    this.refnumber = this.searchvalue
                }
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