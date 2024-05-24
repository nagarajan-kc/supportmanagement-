<template>
<TitleSection />
        <div class="over">

            <div class="menu">
                <ul>
                    <li>
                        <v-btn class="btn btn-outline-dark listbtn" v-on:click.prevent="UserCreate()"> Create SupportUsers </v-btn>
                    </li>
                    <li>
                        <v-btn class="btn btn-outline-dark listbtn" v-on:click.prevent="supportusers()"> Manage SupportUsers </v-btn>
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
                        <!-- <th>SubCategory</th> -->
                        <th>Subject</th>
                        <th>Portal Name</th>
                        <th>Status</th>
                        <th>View</th>
                    </thead>
                    <tbody v-for="issues in issue" v-bind:key="issues" style=" text-wrap:calc(10)">
                        <tr>
                            <td>{{ issues.request_id }}</td>
                            <td>{{ issues.createddate }}</td>
                            <td>{{ issues.category }}</td>
                            <!-- <td>{{ issues.subcategory }}</td> -->
                            <td>{{ issues.subject }}</td>
                            <td>{{ issues.portal }}</td>
                            <td>{{ issues.status }}</td>
                            <td>
                                <v-btn variant="outlined" size="small" class="bg-light-blue-darken-4"  v-on:click.prevent="View(issues.request_id)"> View </v-btn>
                            </td>
                        </tr>

                    </tbody>
                </v-table>
                <div class="text-center">
    <v-pagination  v-model="page"  :length="4" next-icon="mdi-menu-right" prev-icon="mdi-menu-left"  ></v-pagination>
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
            eprocRefNo: "",
            page: 1,
            pagecount:10
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

        pageincre(){
            this.pagecount += this.pagecount
        },

        pagedecr(){
            this.pagecount -= this.pagecount
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
                     console.log(response.data);
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
    width: 100%;
}
.requesttable{
    width: 1300px;
    margin: 0px 20px; 
    border: 1px solid black;
}
.tableheading{
    background-color: bisque;
}
.listbtn{
    width: 171px;
}

th,td{
    border-right: 1px solid black;
}

th{   
    border-bottom: 1px solid black;
}
</style>
