<template>
    <TitleSection />
    <h3>Request Creation</h3>
    <v-container>
      <v-row align="center" justify="center" class="bg-green-lighten-5 forminput">
        <form enctype="multipart/form-data">
            <v-row class="data">
             <label class="require">Portal:</label>
            <select v-model="formData.portalId" class="outline">
              <option disabled value="">Please select Portal</option>
              <option v-for="portal in portallist" v-bind:key="portal" :value="portal.id">{{ portal.description }}</option>
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
            <textarea v-model="formData.description" placeholder="Description of the Issue.." rows="4" cols="35"
              class="outline" required />
          </v-row>
          <v-row class="data">
            <label>Attachments</label>
            <input id="attach" type="file" class="outline" multiple @change="checkFile">
            <!-- <input multiple type="file" id="files" ref="files" @change="selectMultiFile"> -->
          </v-row>
        </form>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn size="small" variant="outlined" v-on:click="cancelRequest()" class="bg-light-blue-darken-4">Back</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn size="small" type="submit" variant="outlined" v-on:click="submit()" class="bg-light-blue-darken-4">Submit</v-btn>
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
          // file: []
          file: ""
        },
        portallist: [],
        rolelist: [],
        categorylist: [],
        subCategorylist: [],
        dialog: false,
        reply: false,
        saveData: {},
        responsetext: "",
        uploadFiles: ''
      }
    },
  
    methods: {
      checkFile(event) {
        this.formData.file = event.target.files[0]; // single file
        
        // let files = event.target.files;
        // // this.formData.file = [...this.formData.file,...files]
        
        // for(let i=0; i < files.length; i++) {
          
        //   // this.formData.file[i]= files[i];
        //   this.formData.append('files[' + i + ']', files);
        // }
        console.log(this.formData.file)
        // console.log(this.formData.file[0])
      },
      selectMultiFile(){
        const files1 = this.$refs.files.files;
        this.uploadFiles = [...this.uploadFiles, ...files1]
      },
      submit() {
        if (this.formData.categoryId != '' && this.formData.subCategoryId != '' && this.formData.subject != '' && this.formData.description != '') {

          // const formData1 = new FormData();
          // this.uploadFiles.forEach(element => {
          //     console.log(element)
          //       formData1.append('files', element)
          // });

          this.saveData = {
            portalId: this.formData.portalId,
            categoryId: this.formData.categoryId,
            subCategoryId: this.formData.subCategoryId,
            subject: this.formData.subject,
            description: this.formData.description,
            tenderId: this.formData.tenderId,
            eprocRefNo: this.formData.refNumber,
            endUserId: this.formData.endUserId,
            files: this.formData.file //formData1
          }
          console.log(this.saveData)
          axios.post('http://10.163.14.67:8082/supportdora/create-request', this.saveData, {
          //  axios.post('https://demoetenders.tn.nic.in/supportdora/create-request', this.saveData, {
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
      }
  
    },
  
    async mounted() {
      await axios.get("https://demoetenders.tn.nic.in/supportdora/portals", {
        headers: {
          "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
        }
      })
        .then(response => {
          this.portallist = response.data
        }).catch(error => {
          console.log("error fetching Portal", error)
        });
  
      await axios.get("https://demoetenders.tn.nic.in/supportdora/categories", {
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
  
  .v-container{
    width: 670px;
  }
  
  .forminput{
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