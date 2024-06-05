<template>
<TitleSection />
<v-row align="center" justify="center">
    <v-col align="center" justify="center">
        <form @submit.prevent>
            <v-row align="center" justify="center">
                <v-btn size="small" variant="outlined" icon="mdi-arrow-left" v-on:click="previouspage()"></v-btn>
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
                <v-col cols="auto" align="center" justify="center">
                    <v-btn size="small" type="submit" variant="outlined" v-on:click="search()">Search</v-btn>
                </v-col>
            </v-row>
        </form>
    </v-col>
    <v-col cols="auto" align="center" justify="center">
        <v-btn size="small" type="submit" variant="outlined" v-on:click="clear()">Clear</v-btn>
    </v-col>
</v-row>
<v-divider :thickness="2"></v-divider>
<h2>Created Requests</h2>
<v-table class="requesttable">
    <thead class="tableheading">
        <th>Requestid</th>
        <th>Created Date</th>
        <th>Subject</th>
        <th>Description</th>
        <th>Status</th>
        <th>View</th>
    </thead>
    <tbody>
        <tr v-for="item in reqlist" v-bind:key="item">
            <td>{{ item.request_id }}</td>
            <td>{{ item.createddate.substring(0, 11) }}</td>
            <td class="issuedesc">{{ item.subject }}</td>
            <td class="issuedesc">{{ item.description }}</td>
            <td>{{ item.status }}</td>
            <td>
                <v-btn size="small" variant="outlined" v-on:click="show(item.request_id)">View</v-btn>
            </td>
        </tr>
    </tbody>
    <tbody v-if="this.nodata === true">
        <tr>
            <td class="record"></td>
            <td class="record"></td>
            <td class="record">No record found</td>
            <td class="record"></td>
            <td class="record"></td>
            <td></td>
        </tr>
    </tbody>
</v-table>
<div class="text-center">
    <v-btn variant="plain" v-on:click="pagedecr()">
        <v-icon icon="mdi-menu-left"></v-icon>Previous
    </v-btn>
    <v-btn variant="plain" v-on:click="pageincre()">Next<v-icon icon="mdi-menu-right"></v-icon>
    </v-btn>
</div>
</template>

<script>
import axios from "axios"
import TitleSection from './TitleSection.vue'

export default {
    name: 'RequestList',
    components: {
        TitleSection
    },
    data() {
        return {
            rlist: null,
            reqid: null,
            searchvalue: "",
            searchparameter: "",
            reqlist: [],
            requestid: "",
            tenderid: "",
            refnumber: "",
            rowNumber: 0,
            nodata: false
        }
    },
    methods: {
        show(id) {
            this.reqid = id
            console.log(this.reqid)
            window.localStorage.setItem('Requestid', this.reqid)
            this.$router.push('/listrequest/viewrequest')
        },
        previouspage() {
            this.$router.push('/userhome')
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
                        endUserId: 1,
                        rowNo: this.rowNumber,
                        ...(this.requestid ? {
                            requestId: this.requestid
                        } : {}),
                        ...(this.tenderid ? {
                            tenderId: this.tenderid
                        } : {}),
                        ...(this.refnumber ? {
                            tenderId: this.refnumber
                        } : {})
                    }
                }).then(response => {
                    this.rlist = response.data
                    this.reqlist = this.rlist
                    if(this.reqlist.length == 0){
                        this.nodata = true
                    }
                }).catch(error => {
                    console.log("error fetching", error)
                });
            }
        },
        pageincre() {
            if (this.reqlist.length === 10){
              this.rowNumber += 10;
            this.issuelist()
            }       
        },

        pagedecr() {
            if (this.rowNumber > 0) {
                this.rowNumber = this.rowNumber - 10
                this.issuelist()
            }
        },
        issuelist() {
            axios.get("https://demoetenders.tn.nic.in/supportdora/portal-requestlists", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                },
                params: {
                    portalId: 1,
                    rowNo: this.rowNumber,
                    endUserId: 1
                }
            }).then(response => {
                this.rlist = response.data
                console.log(response.data)
                this.reqlist = this.rlist
            }).catch(error => {
                console.log("error fetching", error)
            });
        },
        clear() {
            this.listrequest(),
                this.searchvalue = '',
                this.searchparameter = '',
                this.nodata = "fasle"
        },
        listrequest() {
            axios.get("https://demoetenders.tn.nic.in/supportdora/portal-requestlists", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                },
                params: {
                    portalId: 1,
                    rowNo: this.rowNumber,
                    endUserId: 1
                }
            }).then(response => {
                this.rlist = response.data
                console.log(response.data)
                console.log(this.rowNumber);
                this.reqlist = this.rlist
            }).catch(error => {
                console.log("error fetching", error)
            });
        }
    },
    async mounted() {
        this.listrequest()
    }
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

.v-data-table>.v-data-table__wrapper>table>thead>tr>th,
td {
    min-width: 125px !important;
}

.issuedesc {
    text-align: left;
    justify-self: center;
}

.requesttable {
    width: 98%;
    margin: 0px 10px;
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

.record{
  border-right: none;
}
</style>
