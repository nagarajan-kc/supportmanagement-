<template>
<TitleSection />

<h2>Agent Creation</h2>
<v-container>
    <v-row v-align="center" justify="center" class="bg-green-lighten-5 forminput">
        <form name="usercreate" enctype="multipart/form-data">
            <v-row class="data">
                <label>Name: </label>
                <input type="text" class="inputtext" v-model="formData.name" />
            </v-row>
            <v-row class="data">
                <label>Email Id: </label>
                <input type="text" class="inputtext" v-model="formData.email" />
            </v-row>
            <v-row class="data">
                <label>Mobile No: </label>
                <input type="Number" class="inputtext" v-model="formData.mobileNo" />

            </v-row>
            <v-row class="data">
                <label>Portal Name: </label>                  
                <select v-model="formData.portal" class="inputtext">
                    <option disabled value="">select the role</option>
                    <option v-for="portals in portallist" v-bind:key="portals" :value="portals.id ">{{ portals.description}}</option>
                </select>
            </v-row>
            <v-row class="data">
                <label>Role: </label>
                <select v-model="formData.role" class="inputtext">
                    <option disabled value="">select the role</option>
                    <option v-for="roles in rolelist" v-bind:key="roles" :value="roles.id ">{{ roles.name}}</option>
                </select>
            </v-row>

            <v-row class="data">
                <label for="file">Upload File:</label>
                <input type="file" id="file" class="inputtext" ref="file" @change="handleFileChange" required>
            </v-row>
            <!-- </v-row> -->

        </form>
    </v-row>
    <v-row v-align="center" justify="center">
        <v-col cols="auto">
            <v-btn variant="outlined" class="bg-light-blue-darken-4" v-on:click="back()"> Back </v-btn>
        </v-col>
        <v-col cols="auto">
            <v-btn variant="outlined" class="bg-light-blue-darken-4" v-on:click="submit()"> Save </v-btn>
        </v-col>

    </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
import TitleSection from './TitleSection.vue';
export default {
    name: 'UserCreation',
    components: {
        TitleSection
    },
    data() {
        return {
            usercreate: [],
            formData: {
                name: '',
                mobileNo: '',
                email: '',
                file: "",
                portal: "",
                role: ""
            },
            portallist: [],
            rolelist: [],
            saveData: {}
        }
    },

    methods: {
        handleFileChange(event) {
            this.formData.file = event.target.files[0];
        },
        submit() {

            this.saveData = {
                name: this.formData.name,
                email: this.formData.email,
                mobileNo: this.formData.mobileNo,
                portalId: this.formData.portal,
                roleId: this.formData.role,
                files: this.formData.file,
            }
            axios.post('https://demoetenders.tn.nic.in/supportdora/create-supportuser', this.saveData, {

                    headers: {
                        "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                        "Content-Type": `multipart/form-data`
                    },

                })
                .then(response => {
                    this.usercreate = response.data

                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                });
        },
        back() {
            this.$router.push('/AdminPageDashboard')
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
        await axios.get("https://demoetenders.tn.nic.in/supportdora/roles", {
                headers: {
                    "api_key": `46187f6f-f40c-4434-adad-ddb06db4659e`,
                }
            })
            .then(response => {
                this.rolelist = response.data
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
    font-weight: bold;
   
}

select {
    -webkit-appearance: menulist !important;
    -moze-appearance: menulist !important;
    appearance: menulist !important;
}

label {
    width: 100px;
    color: #023e6c;
}

.inputtext {
    border-radius: 5px;
    font-weight: lighter;
    background-color: white;
    width: 280px;
    padding: 5px;
}

.forminput {
    padding: 40px 0px;
    border: solid 1px rgb(167, 167, 167);
    border-radius: 15px;
}

.v-container {
    width: 500px;
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
