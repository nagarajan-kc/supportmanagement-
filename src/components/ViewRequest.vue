<template>
<TitleSection />
<v-row align="center" justify="center">
    <h3>Request Details</h3>
</v-row>
<v-btn size="small" variant="outlined" icon="mdi-arrow-left" v-on:click="previouspage()"></v-btn>
<v-container v-for="item in listdetails" :key="item">
    <v-row class="reqdetails" align="center" justify="center">      
        
            <v-row>
                <label class="heading"> RequestId </label>
                <label class="labeldesc">{{ item.request_id }}</label>
            </v-row>
            <v-row>
                <label class="heading"> Request Title </label>
                <label class="labeldesc">{{ item.subject }}</label>
            </v-row>
            <v-row>
                <label class="heading"> Description </label>
                <label class="labeldesc">{{ item.description }}</label>
            </v-row>
        

    </v-row>
    <v-row v-if="item.id == reqid" align="center" justify="center">
        <v-col cols="auto" class="heading">
            Description
        </v-col>
        <v-col cols="auto">
            {{ item.description }}
        </v-col>
    </v-row>
</v-container>
<v-row align="center" justify="center">
    <v-col cols="auto">
        <v-btn size="small" variant="outlined" v-on:click="showinp()">Raise Query</v-btn>
    </v-col>
</v-row>
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
            <v-btn size="small" variant="outlined" v-on:click="hideinp()">Submit</v-btn>
        </v-row>
    </form>

</v-container>

<v-container class="communicationsec">
    <h2>Communications</h2>
    <v-row v-for="item in communicationlist" :key="item.communication_id">
        <v-col align="left" justify="center" v-if="item.gepnic_enduser_id" cols="7">
            <v-card subtitle="Me:" variant="outlined">
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

        <v-col align="left" justify="center" v-if="item.support_user_id" cols="auto" class="replytext">
            <v-card subtitle="Reply:" variant="outlined" class="bg-grey-lighten-4">
                <v-card-subtitle align="right">{{ item.createddate }} </v-card-subtitle>
                <v-card-text>{{ item.remarks }}</v-card-text>
                <v-card-text v-if="item.attachments">
                    <a v-for="doc in item.attachments" :key="doc">
                        {{ doc.download_link }}
                    </a>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from "axios"
import TitleSection from './TitleSection.vue'

export default {
    name: 'ViewRequest',
    components: {
        TitleSection
    },
    data() {
        return {
            reqid: window.localStorage.getItem('Requestid'),
            pid: window.localStorage.getItem('portalId'),
            rlist: null,
            showdetails: false,
            communicationlist: 0,
            listdetails: null,
            formData: {
                description: "",
                file: ""
            },
            saveData: {},
            attacheddoc: []
        }
    },
    methods: {
        previouspage() {
            this.$router.push('/Listrequest')
        },
        checkFile(event) {
            this.formData.file = event.target.files;
            console.log(this.formData.file)
            console.log(this.formData.file[0])
        },
        showinp() {
            this.showdetails = true
        },
        hideinp() {
            console.log(this.reqid)
            this.saveData = {
                portalId: this.formData.portalid,
                requestId: this.reqid,
                remarks: this.formData.description,
                endUserId: this.formData.endUserId,
                files: this.formData.file
            }
            console.log(this.saveData)
            // axios.post('http://10.163.17.52:8082/supportdora/create-communication', this.saveData, {

            //     headers: {
            //         "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
            //         "Content-Type": `multipart/form-data`
            //     },

            // })
            //     .then(response => {
            //         this.usercreate = response.data
            //         // console.log(response.data);
            //     })
            //     .catch(error => {
            //         console.log('Error fetching data:', error);
            //     });
            this.showdetails = false
        },
        downloadFile(attachfile) {
            console.log(attachfile)
            console.log(attachfile.communication_attachment_id)
            console.log(attachfile.doctype)
            axios.get("https://demoetenders.tn.nic.in/supportdora/doc-download", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                },
                params: {
                    id: attachfile.communication_attachment_id,
                    docType: attachfile.doctype,
                }
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log("error fetching", error)
            });
        }
    },
    async mounted() {
        await axios.get("https://demoetenders.tn.nic.in/supportdora/requestdetails-with-attachments", {
            headers: {
                "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
            },
            params: {
                requestId: this.reqid
            }
        }).then(response => {
            this.rlist = response.data
            this.listdetails = this.rlist[0].requestdetails
        }).catch(error => {
            console.log("error fetching", error)
        });

        await axios.get("https://demoetenders.tn.nic.in/supportdora/communications", {
            headers: {
                "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,

            },
            params: {
                requestId: this.reqid
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
.reqdetails {
    margin: 5px;
    display: inline-grid;
    width: 1000px;
}

.heading {
    font-weight: bold;
    width: 100px;
    text-align: left;
    border: solid 1px rgb(167, 167, 167);
    padding: 5px;
}

.labeldesc {
    width: 300px;
    text-align: left;
    border: solid 1px rgb(167, 167, 167);
    padding: 5px;
}

textarea {
    border: solid 1px rgb(167, 167, 167);
}

.replytext {
    padding-left: 500px;
}

.communicationsec {
    margin-top: 10px;
    border-top: solid 1px rgb(167, 167, 167);
}
</style>
