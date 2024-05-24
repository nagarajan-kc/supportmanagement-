<template>
<TitleSection />
<h3>Request Creation</h3>
<v-container>
    <v-row align="center" justify="center" class="bg-green-lighten-5 forminput">
        <form enctype="multipart/form-data">
            <v-row class="data">
                <label class="require">PortalType:</label>
                <select v-model="portalid" class="outline" @change="portal">
                    <option disabled value="">Please select Portal</option>
                    <option v-for="portals in portaltype" v-bind:key="portals" :value="portals.id">{{ portals.name }}
                    </option>
                </select>
            </v-row>
            <v-row class="data">
                <label class="require">Portal:</label>
                <select v-model="formData.portalId" class="outline" @change="cat">
                    <option disabled value="">Please select Portal</option>
                    <option v-for="portal in portallist" v-bind:key="portal" :value="portal.id">{{ portal.description }}
                    </option>
                </select>
            </v-row>
            <v-row class="data">
                <label class="require">Category:</label>
                <select v-model="formData.categoryId" class="outline" @change="sub">
                    <option disabled value="">Please select Category</option>
                    <option v-for="cat in categorylist" v-bind:key="cat" :value="cat.id">{{ cat.name }}</option>
                </select>
            </v-row>
            <v-row class="data">
                <label class="require">Sub Category:</label>
                <select v-model="formData.subCategoryId" class="outline">
                    <option disabled value="">Please select Subcategory</option>
                    <option v-for="subcat in subCategorylist" v-bind:key="subcat" :value="subcat.id">{{ subcat.name }}
                    </option>
                </select>
            </v-row>
            <v-row class="data">
                <label class="require">Request Title</label>
                <input type="text" name="title" v-model="formData.subject" class="outline" required />
            </v-row>
            <v-row class="data">
                <label>Tender Id</label>
                <input type="text" name="tid" v-model="formData.tenderId" class="outline" required />
            </v-row>
            <v-row class="data">
                <label>Eproc Ref Number</label>
                <input type="number" name="refnum" v-model="formData.refNumber" class="outline" required />
            </v-row>
            <v-row class="data">
                <label class="require">Description:</label>
                <textarea v-model="formData.description" placeholder="Description of the Issue.." rows="4" cols="35" class="outline" required />
                </v-row>
        <v-row class="data">
          <label>Attachments</label>
          <!-- <input id="attach" type="file" class="outline" multiple @change="checkFile()" accept="image/png,application/pdf,image/jpeg"> -->
          <input id="attach" type="file" class="outline" multiple @change="checkFile">
        </v-row>
      </form>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn size="small" variant="outlined" v-on:click="cancelRequest()" class="bg-light-blue-darken-4">Back</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn size="small" type="submit" variant="outlined" v-on:click="submit()"
          class="bg-light-blue-darken-4">Submit</v-btn>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-dialog v-model="dialog" width="auto">
        <v-card max-width="500" text="Please fill the mandatory fields.">
          <template v-slot:actions>
            <v-btn class="ms-auto" @click="dialog = false">Ok</v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="reply" width="auto">
      <v-card max-width="500">
        {{ this.responsetext }}
        <template v-slot:actions>
          <v-btn class="ms-auto" @click="reply = false">Ok</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios"
import TitleSection from './TitleSection.vue'

export default {
    name: 'RequestCreation',
    components: {
        TitleSection
    },
    data() {
        return {
            formData: {
                portalId: "",
                categoryId: '',
                subCategoryId: '',
                subject: "",
                description: "",
                tenderId: "",
                refNumber: "",
                endUserId: 1,
                file: null
            },
            portaltype: [],
            portallist: [],
            rolelist: [],
            categorylist: [],
            subCategorylist: [],
            dialog: false,
            reply: false,
            saveData: {},
            responsetext: "",
            portalid: null
        }
    },

    methods: {
        checkFile(event) {
            let files = event.target.files;
            const formData1 = new FormData()
            // if (files['type'] != "application/pdf" || files['type'] != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || files['type'] != 'application/vnd.ms-excel' || files['type'] != "image/jpeg" || files['type'] != "image/png") {
            //   alert("file format not accepted")
            //   return false
            // } else {
            for (let i = 0; i < files.length; i++) {
                formData1.append('file', files[i]);
            }
            console.log(formData1.getAll('file'));
            this.formData.file = formData1.getAll('file')
            console.log(this.formData.file)
        },
        submit() {
            if (this.formData.categoryId != '' && this.formData.subCategoryId != '' && this.formData.subject != '' && this.formData.description != '') {
                const saveData = new FormData()
                saveData.append('portalId', this.formData.portalId)
                saveData.append('categoryId', this.formData.categoryId)
                saveData.append('subCategoryId', this.formData.subCategoryId)
                saveData.append('subject', this.formData.subject)
                saveData.append('description', this.formData.description)
                saveData.append('tenderId', this.formData.tenderId)
                saveData.append('eprocRefNo', this.formData.refNumber)
                saveData.append('endUserId', this.formData.endUserId)
                for (let i = 0; i < this.formData.file.length; i++) {
                    saveData.append('files', this.formData.file[i])
                }
                for (const pair of saveData.entries()) {
                    console.log(pair);
                }
                //axios.post('http://10.163.17.52:8082/supportdora/create-request', this.saveData, {
                axios.post('https://demoetenders.tn.nic.in/supportdora/create-request', saveData, {
                        headers: {
                            "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                            "Content-Type": `multipart/form-data`
                        },
                    })
                    .then(response => {
                        this.responsetext = response.data[0]
                        console.log(response.data[0].Status);
                        alert(response.data[0].Status);
                        this.reply = true
                        this.$router.push('/userhome')
                    })
                    .catch(error => {
                        console.log('Error fetching data:', error);
                    });
            } else {
                console.log('required')
                this.dialog = true
            }
        },
        cancelRequest() {
            this.$router.push('/userhome')
        },

        async sub() {
            await axios.get("https://demoetenders.tn.nic.in/supportdora/sub-categories", {
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    },
                    params: {
                        categoryId: this.formData.categoryId
                    }
                })
                .then(response => {
                    this.subCategorylist = response.data
                }).catch(error => {
                    console.log("error fetching role", error)
                });
        },
        async portal() {
            axios.get("https://demoetenders.tn.nic.in/supportdora/portals", {
                    params: {
                        portalType: this.portalid
                    },
                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                    }
                })
                .then(response => {
                    console.log(this.portalid);
                    this.portallist = response.data
                }).catch(error => {
                    console.log("error fetching Portal", error)
                });
        },
        async cat() {
            axios.get("https://demoetenders.tn.nic.in/supportdora/categories", {

                          params:{
                            portalType:  this.portalid
                          },
                          headers: {
                                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                                }
                            })
                            .then(response => {
                                this.categorylist = response.data
                            }).catch(error => {
                                console.log("error fetching role", error)
                            });
                    }
                },

                async mounted() {
                    await axios.get("https://demoetenders.tn.nic.in/supportdora/portal-type", {
                            headers: {
                                "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                            }
                        })
                        .then(response => {
                            console.log(response.data);
                            this.portaltype = response.data
                        }).catch(error => {
                            console.log("error fetching Portal", error)
                        });
                }
        }
</script>

<style scoped>
.require:after {
    content: "* ";
    color: red;
    font-size: 15px;
}

.data {
    margin: 5px;
    font-weight: bold;
}

form {
    text-align: left;
}

label {
    font-size: 15px;
    padding: 5px 0px;
    width: 140px;
    color: #023e6c;
}

.outline {
    border: solid 1px rgb(167, 167, 167);
    border-radius: 5px;
    font-weight: lighter;
    background-color: white;
    width: 470px;
    padding: 5px;
}

select {
    -webkit-appearance: menulist !important;
    -moze-appearance: menulist !important;
    appearance: menulist !important;
}

.v-container {
    width: 670px;
}

.forminput {
    padding: 40px 0px;
    border: solid 1px rgb(167, 167, 167);
    border-radius: 15px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>
