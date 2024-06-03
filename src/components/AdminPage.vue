<template>
    <TitleSection />
    <v-row align="center" justify="center">
        <v-btn size="small" variant="outlined" icon="mdi-arrow-left" v-on:click="previouspage()"></v-btn>
      <v-col cols="auto">
        <label class="require">Filter:</label>
          <select v-model="statusid" class="outline" @change="issuelist()">
            <option disabled value="">Please select Status</option>
            <option v-for="status in statuslist" v-bind:key="status" :value="status.id">{{ status.name }}
            </option>
          </select>
      </v-col>
      <v-col cols="auto">
        <v-btn size="small" type="submit" variant="outlined" v-on:click="clear()">Clear</v-btn>
      </v-col>
    </v-row>
  <v-divider :thickness="2"></v-divider>
    <div class="over">
        <div class="menu">
            <ul>
                <li>
                    <v-btn class="btn btn-outline-dark listbtn" v-on:click.prevent="UserCreate()"> Create SupportUsers
                    </v-btn>
                </li>
                <li>
                    <v-btn class="btn btn-outline-dark listbtn" v-on:click.prevent="supportusers()"> Manage SupportUsers
                    </v-btn>
                </li>
            </ul>
        </div>
        <div>
            <h3 class="admin">Welcome Admin</h3>
            <v-table class="requesttable">
                <thead class="tableheading">
                    <th>Requestid</th>
                    <th>Created Date</th>
                    <th>Category</th>
                    <th>Subject</th>
                    <th>Portal Name</th>
                    <th>Status</th>
                    <th>View</th>
                </thead>
                <tbody v-for="issues in issue" v-bind:key="issues" style=" text-wrap:calc(10)">
                    <tr>
                        <td>{{ issues.request_id }}</td>
                        <td class="issuedate">{{ issues.createddate }}</td>
                        <td>{{ issues.category }}</td>
                        <td class="issuedesc">{{ issues.subject }}</td>
                        <td class="issueportal">{{ issues.portal }}</td>
                        <td class="issueportal">{{ issues.status }}</td>
                        <td>
                            <v-btn variant="outlined" size="small" class="bg-light-blue-darken-4"
                                v-on:click.prevent="View(issues.request_id)"> View </v-btn>
                        </td>
                    </tr>

                </tbody>
            </v-table>
            <div class="text-center">
                <v-btn variant="plain" v-on:click="pagedecr()"><v-icon icon="mdi-menu-left"></v-icon >Previous</v-btn>
                <v-btn variant="plain" v-on:click="pageincre()">Next<v-icon icon="mdi-menu-right"></v-icon></v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import TitleSection from './TitleSection.vue';

export default {
    name: 'AdminPage',
    components: {
        TitleSection
    },
    data() {
        return {
            // users:userData,
            requestid: null,
            issue: [],
            page: 1,
            pagecount: 10,
            rownumber: 0,
            statuslist: [],
            statusid: null
        }
    },
    methods: {

        logout() {
            this.$router.push('/');

        },
        UserCreate() {
            this.$router.push('/CreateSupportAgent');

        },

        View(request_id) {
            this.requestid = request_id
            console.log(this.requestid)
            window.localStorage.setItem('Requestid', this.requestid)
            this.$router.push('/AssignTask');
        },

        pageincre() {
            if(this.issue.length === 10)
            this.rownumber = this.rownumber + 10
            this.issuelist(this.rownumber)
        },

        pagedecr() {
            if(this.rownumber > 0){
                this.rownumber = this.rownumber - 10
            this.issuelist(this.rownumber)
            }
        },
        // Agent() {
        //     this.$router.push('/Agent')
        // },

        supportusers() {
            this.$router.push('/AgentList')
        },

        issuelist() {
            axios.get('https://demoetenders.tn.nic.in/supportdora/admin-requestlists', {
                params: {
                    "rowNo": this.rownumber,
                    ...(this.statusid ? { statusId: this.statusid } : {}),
                },
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    "Content-Type": 'application/json'
                }
            })
                .then(response => {
                    this.issue = response.data
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        getstatus(){
            axios.get('https://demoetenders.tn.nic.in/supportdora/status', {                
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                }
            })
                .then(response => {
                    this.statuslist = response.data
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        clear(){
            this.statusid = null
            this.issuelist()
        }
    },
    created() {
        this.issuelist(),
        this.getstatus()
    },
}
</script>

<style scoped>
h3 {
    margin: 5px;
}

.outline {
    border: solid 1px rgb(167, 167, 167);
    border-radius: 5px;
    padding: 0px 5px;
    font-weight: lighter;
}

.menu {
    width: 200px;
    height: 100vh;
    background-color: #f0f0f0;
    padding-top: 10%;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
}

.over {
    display: inline-flex;
    width: 100%;
}

.requesttable {
    width: 1300px;
    margin: 0px 20px;
    border: 1px solid black;
}

.tableheading {
    background-color: bisque;
}

.listbtn {
    width: 171px;
}

th,
td {
    border-right: 1px solid black;
}

th {
    border-bottom: 1px solid black;
}

.issuedesc{
  text-align: left;
  justify-self: center;
}

.issuedate{
    width: 182px;
}

.issueportal{
    width: 90px;
}
</style>