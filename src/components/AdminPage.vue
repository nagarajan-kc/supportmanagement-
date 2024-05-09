<template>
<TitleSection />
<div class="backcolor">
    <div>
        <h3 class="admin">Welcome Admin</h3>
        <!-- <form @submit.prevent>
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
                <v-col cols="4">
                    <v-radio-group inline class="radiobtn" v-model="searchparameter">
                        <v-radio label="Request Id" value="requestId"></v-radio>
                        <v-radio label="Tender Id" value="tenderId"></v-radio>
                        <v-radio label="Eproc Reference Number" value="eprocRefNo"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="auto">
                    <v-btn size="small" type="submit" variant="outlined" prepend-inner-icon="mdi-magnify" v-on:click="search()">Search</v-btn>
                </v-col>
            </v-row>
        </form> -->
        <div class="over">

            <div class="menu">
                <ul>
                    <li>
                        <v-btn class="btn btn-outline-dark" v-on:click.prevent="UserCreate()"> Create </v-btn>
                    </li>
                    
                    <!-- <li> <v-btn class="btn btn-outline-dark" v-on:click.prevent="Agent()"> SupportUser </v-btn></li> -->
                    <li>
                        <v-btn class="btn btn-outline-dark" v-on:click.prevent="supportusers()"> ManageSupportUsers </v-btn>
                    </li>
                </ul>
            </div>
            <div>
                <v-table class="table">
                    <thead>
                        <th>Requestid</th>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Portal Name</th>

                    </thead>
                    <tbody v-for="issues in issue" v-bind:key="issues" style=" text-wrap:calc(10)">
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
            </div>
        </div>
    </div>

</div>
</template>

<script>
// import userData from '../User.json'
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
            searchvalue: "",
            searchparameter: "",
            requestids: "",
            tenderId: "",
            eprocRefNo: ""
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
        search() {
            if (this.searchvalue == '' || (this.searchvalue != '' && this.searchparameter == '')) {
                alert("select search by")
                console.log("ahhh")
            } else {
                if (this.searchparameter == 'requestId') {
                    this.requestids = this.searchvalue
                } else if (this.searchparameter == 'tenderId') {
                    this.tenderid = this.searchvalue
                } else {
                    this.refnumber = this.searchvalue
                }
                axios.get("https://demoetenders.tn.nic.in/supportdora/admin-requestlists", {
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    },
                    params: {
                        rowNo: 0,
                        requestId: this.requestid,
                        ...this.tenderid ?? {
                            tenderId: this.tenderid
                        },
                        ...this.refnumber ?? {
                            tenderId: this.refnumber
                        }
                    }
                }).then(response => {
                    this.rlist = response.data
                    this.reqlist = this.rlist
                }).catch(error => {
                    console.log("error fetching", error)
                });
            }
        },
        // Agent() {
        //     this.$router.push('/Agent')
        // },

        supportusers() {
            this.$router.push('/AgentList')
        },

        issuelist() {
            // console.log('issuelist');
            axios.get('https://demoetenders.tn.nic.in/supportdora/admin-requestlists', {
                    params: {
                        "rowNo": 0
                    },
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": 'application/json'
                    }
                })
                .then(response => {
                    this.issue = response.data
                    // console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
    },
    created() {
        this.issuelist()
    },
}
</script>

<style scoped>
h3 {
    margin: 5px;
}

.search {
    background-color: rgb(212, 201, 201);
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
}
</style>
