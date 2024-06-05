<template>
    <TitleSection />
    <v-row align="center" justify="center">
        <h3>Request Details</h3>
    </v-row>
    <v-container v-for="item in listdetails" :key="item">
        <v-row class="reqdetails" align="center" justify="center">
            <v-col cols="1">
                <v-btn size="small" variant="outlined" icon="mdi-arrow-left" v-on:click="previouspage()"></v-btn>
            </v-col>
            <v-col cols="9" align="center" justify="center">
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
                <v-row>
                    <label class="heading"> Status </label>
                    <label class="labeldesc">{{ item.status }}</label>
                </v-row>
                <v-row v-if="listattachment">
                    <label class="heading">Attachments</label>
                    <label  class="labeldesc">
                        <ul v-for="item in listattachment" :key="item">
                        <li v-on:click="downloadreqFile(item)">
                            {{ item.file_name +"."+ item.file_type.split('/')[1]}}
                        </li>
                    </ul>  
                    </label>
                                      
                </v-row>
            </v-col>

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
        <v-col cols="auto">
            <v-btn size="small" variant="outlined" v-on:click="showcomm()">Show Communications</v-btn>
        </v-col>
    </v-row>
    <v-container v-if="showdetails" align="center" justify="center">
        <form enctype="multipart/form-data" class="queryform" >
            <h3>Raise Query</h3>
            <v-row align="center" justify="center">
                <v-col cols="auto">Description: </v-col>
                <textarea v-model="formData.description" placeholder="Description of the Issue.." rows="4" cols="35"
                    required></textarea>
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

    <v-container v-if="showComm" class="communicationsec">
        <v-row>
            <v-col align="left" cols="1">
                <v-btn align="left" size="small" variant="outlined" icon="mdi-close" v-on:click="hidecomm()"></v-btn>
            </v-col>
            <v-col align="center" justify="center">
                <h2>Communications</h2>
            </v-col>
        </v-row>        
        <v-row v-for="item in communicationlist" :key="item.communication_id">
            <v-col align="left" justify="center" v-if="item.gepnic_enduser_id" cols="12" class="replytext">
                <v-card subtitle="Me:" variant="outlined">
                    <v-card-subtitle align="right">{{ item.createddate }} </v-card-subtitle>
                    <v-card-text>
                        {{ item.remarks }}
                    </v-card-text>
                    <v-card-text v-if="item.attachments">
                        <ul v-for="doc in item.attachments" :key="doc">
                            <li v-on:click="downloadFile(doc)">{{ doc.file_type }}</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col align="left" justify="center" v-if="item.support_user_id" cols="7" >
                <v-card subtitle="Reply:" variant="outlined" class="bg-grey-lighten-4">
                    <v-card-subtitle align="right">{{ item.createddate }} </v-card-subtitle>
                    <v-card-text>{{ item.remarks }}</v-card-text>
                    <v-card-text v-if="item.attachments">
                        <p v-for="doc in item.attachments" :key="doc">
                            <a v-on:click="downloadFile(doc)">{{ doc.file_type }}</a>
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from "axios"
import TitleSection from './TitleSection.vue'
import saveAs from 'file-saver';

export default {
    name: 'ViewRequest',
    components: {
        TitleSection
    },
    data() {
        return {
            reqid: Number.parseInt(window.localStorage.getItem('Requestid')),
            portalId: window.localStorage.getItem('portalId'),
            userId:  window.localStorage.getItem('endUserId'),
            rlist: null,
            showdetails: false,
            communicationlist: 0,
            listdetails: null,
            listattachment: null,
            formData: {
                description: "",
                file: ""
            },
            saveData: {},
            attacheddoc: [],
            showComm: false
        }
    },
    methods: {
        previouspage() {
            this.$router.push('/Listrequest')
        },
        checkFile(event) {
            let files = event.target.files;
            const formData1 = new FormData()
            for (let i = 0; i < files.length; i++) {
                if (files[i]['type'] === "application/pdf" || files[i]['type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || files[i]['type'] === 'application/vnd.ms-excel' || files[i]['type'] === "image/jpeg" || files[i]['type'] === "image/png") {
                    console.log(files[i]['type'])
                    formData1.append('file', files[i]);
                }
                else {
                    alert("file format not accepted")
                    return
                }
            }
            console.log(formData1.getAll('file'));
            this.formData.file = formData1.getAll('file')
            console.log(this.formData.file)
        },
        showinp() {
            this.showdetails = true
        },
        hideinp() {
            // if (this.formData.description != null) {
                const saveData = new FormData()
                saveData.append('portalId', 1)
                saveData.append('requestId', this.reqid)
                saveData.append('remarks', this.formData.description)
                saveData.append('endUserId', this.userId)
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
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log('Error fetching data:', error);
                    });
                this.showdetails = false
            // }
        },
        downloadreqFile(attachfile) {
            axios.get("https://demoetenders.tn.nic.in/supportdora/doc-download", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                },
                params: {
                    id: attachfile.request_attachment_id,
                    // docType: attachfile.doctype,
                    docType: 'REQ',
                },
                responseType: 'blob'
            }).then(response => {
                saveAs(new Blob([response.data], { type: attachfile.file_type }), attachfile.file_name, { autoBOM: false });
            }).catch(error => {
                console.log("error fetching", error)
            });
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
                    docType: 'COMM',
                },
                responseType: 'blob'
            }).then(response => {
                // console.log(response.data)
                // console.log(this.listattachment[0].file_type)
                // let filetype = this.listattachment[0].file_type.split('/')
                // console.log(filetype[1])
                // console.log(attachfile.file_name + "." + filetype[1])
                saveAs(new Blob([response.data], { type: attachfile.file_type }), "attachment", { autoBOM: false });
            }).catch(error => {
                console.log("error fetching", error)
            });
        },
        showcomm(){
            this.showComm = true
        },
        hidecomm(){
            this.showComm = false
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
            this.listattachment = this.rlist[1].requestattachments
            console.log(this.listattachment)
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
}

.heading {
    font-weight: bold;
    width: 15%;
    text-align: left;
    border: solid 1px rgb(167, 167, 167);
    padding: 5px;
}

.labeldesc {
    width: 85%;
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

li {
    list-style-type: none;
    text-decoration: underline;
    color: blue;
    cursor: pointer;
}

.queryform{
    margin: 35px;
    padding: 30px;
    border: 1px solid rgb(167, 167, 167);
    widows: 500px;
}
</style>