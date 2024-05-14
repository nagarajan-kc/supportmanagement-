<template>
    <TitleSection />
    <form @submit.prevent>
      <v-row align="center" justify="center">
        <v-btn size="small" variant="outlined" icon="mdi-arrow-left" v-on:click="previouspage()"></v-btn>
        <v-col cols="auto">
          <label>Search:</label>
        </v-col>
        <v-col cols="auto">
          <input type="text" class="outline" v-model="searchvalue" required/>
        </v-col>
        <v-col cols="auto">
          <label>Search By:</label>
        </v-col>
        <v-col cols="4" >
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
    <v-divider :thickness="2"></v-divider>
    <h2>Created Requests</h2>
    <v-data-table :headers="headers" :items="reqlist" item-value="name" items-per-page="10"> 
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.request_id }}</td>
          <td>{{ item.createddate.substring(0, 11) }}</td>
          <td class="issuedesc">{{ item.subject }}</td>
          <td class="issuedesc">{{ item.description }}</td>
          <td>{{ item.status }}</td>
          <td><v-btn size="small" variant="outlined" v-on:click="show(item.request_id)">View</v-btn></td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" icon="warning">
          Sorry, nothing to display here 
        </v-alert>
      </template>
    </v-data-table>
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
        headers: [
          { title: 'Request Id', align: 'center', sortable: false, key: 'id', width: '7%', class:"headercolor"},
          { title: 'Created Date', key: 'Created Date', align: 'center', sortable: false, width: '10%' },
          { title: 'Request Title', key: 'title', align: 'center', sortable: false, width: '25%' },
          { title: 'Description', key: 'description', align: 'center', sortable: false },
          { title: 'Status', key: 'status', align: 'center', sortable: false, width: '10%' },
          { title: 'Action', key: 'action', align: 'center', sortable: false  },
        ],
        reqlist: [],
        requestid: "",
        tenderid: "",
        refnumber: ""
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
        if (this.searchvalue == '' ||(this.searchvalue != '' && this.searchparameter == '')) {
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
              rowNo: 0,
              requestId: this.requestid,
              ...this.tenderid ?? { tenderId: this.tenderid },
              ...this.refnumber ?? { tenderId: this.refnumber }
            }
          }).then(response => {
            this.rlist = response.data
            this.reqlist = this.rlist
          }).catch(error => {
            console.log("error fetching", error)
          });
        }
      }
    },
    async mounted() {
      await axios.get("https://demoetenders.tn.nic.in/supportdora/portal-requestlists", {
        headers: {
          "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
        },
        params: {
          portalId: 1,
          rowNo: 0,
          endUserId: 1
        }
      }).then(response => {
        this.rlist = response.data
        this.reqlist = this.rlist
      }).catch(error => {
        console.log("error fetching", error)
      });
  
      console.log(this.headers)
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
  
  .v-data-table{
    margin: 0px 15px;
    width: 1475px;
  }
  
  .issuedesc{
    text-align: left;
    justify-self: center;
  }
  
  .v-table > .v-table__wrapper > table > tbody > tr > td, .v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > td, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > td, .v-table > .v-table__wrapper > table > tfoot > tr > th{
    padding: 0px 10px !important;
  }
  
  </style>