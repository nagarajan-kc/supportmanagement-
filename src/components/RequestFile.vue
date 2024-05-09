<template>
<h2>Agent Creation:</h2>
<v-container>
    <v-row v-align="center" justify="center">
        <form name="usercreate" enctype="multipart/form-data">
            <select v-model="formData.portalId">
                    <option v-for="portals in portallist" v-bind:key="portals" :value="portals.id ">{{ portals.name}}</option>
                </select>
                <select v-model="formData.categoryId" @change="sub">
                    <option v-for="catg in categorylist" v-bind:key="catg" :value="catg.id ">{{ catg.name}}</option>
                </select>
                <select v-model="formData.subCategoryId">
                    <option v-for="subcatg in subCategorylist" v-bind:key="subcatg" :value="subcatg.id ">{{ subcatg.name}}</option>
                </select>
            <label>
                Subject:
            </label>
            <input type="text" v-model="formData.subject" />

            <label>
                Description:
            </label>
            <input type="text" v-model="formData.description" />

            <div class="data">
                <label for="file">Upload File:</label>
                <input type="file" id="file" ref="file" @change="handleFileChange" required>
            </div>
            <!-- </v-row> -->

            <v-row v-align="center" justify="center">
                <v-col cols="auto">
                    <v-btn class="btn btn-outline-dark" v-on:click="back()"> Back </v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn class="btn btn-outline-dark" v-on:click="submit()"> Save </v-btn>
                </v-col>

            </v-row>

        </form>
    </v-row>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RequestFile',

    data() {
        return {
            usercreate: [],
            formData: {
                portalId: "",
                categoryId: '',
                subCategoryId: '',
                subject: "",
                description: "",
                endUserId: 1
            },
            portallist: [],
            rolelist: [],
            categorylist: [],
            subCategorylist: [],
            saveData: {}
        }
    },

    methods: {
        handleFileChange(event) {
            this.formData.file = event.target.files[0];
        },
        submit() {

            this.saveData = {
                portalId: this.formData.portalId,
                categoryId: this.formData.categoryId,
                subCategoryId: this.formData.subCategoryId,
                subject: this.formData.subject,
                description: this.formData.description,
                endUserId: this.formData.endUserId
            }
            axios.post('http://10.163.17.52:8082/supportdora/create-request', this.saveData, {

                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `multipart/form-data`
                    },

                })
                .then(response => {
                    this.usercreate = response.data
                    // console.log(response.data);
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        back() {
            this.$router.push('/AdminPageDashboard')
        },

       async sub(){
           await  axios.get("http://10.163.17.52:8082/supportdora/sub-categories", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                },
                params:{
                    categoryId:this.formData.categoryId
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
        await axios.get("http://10.163.17.52:8082/supportdora/portals", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                }
            })
            .then(response => {
                this.portallist = response.data
            }).catch(error => {
                console.log("error fetching Portal", error)
            });

        await axios.get("http://10.163.17.52:8082/supportdora/categories", {
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
form {
    text-align: left;
}

.data {
    margin: 5px;
    display: grid;
    font-weight: bold;
    /* width: 29rem; */
}
</style>
