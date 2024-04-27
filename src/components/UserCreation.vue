<template>
<h2>Agent Creation:</h2>
<form name="usercreate" enctype="multipart/form-data">
    <div class="mb-3">
        <label>Name: </label>
        <input type="text" v-model="formData.name" />
    </div>
    <div>
        <label>Email Id: </label>
        <input type="text" v-model="formData.email" />
    </div>
    <div class="mb-3">
        <label>Mobile No: </label>
        <input type="Number" v-model="formData.mobileNo" />
    </div>
    <div>
        <label>Portal Name: </label>
        <!-- <input type="text" id="Portal" v-model="input.Portal" /> -->
        <select v-model="formData.portal">
            <option v-for="portals in portallist" v-bind:key="portals" :value="portals.id ">{{ portals.name}}</option>
        </select>
    </div>
    <div>
        <label>Role: </label>
        <!-- <input type="text" id="Role" v-model="input.Role" /> -->
        <select v-model="formData.role">
            <option v-for="roles in rolelist" v-bind:key="roles" :value="roles.id ">{{ roles.name}}</option>
        </select>
    </div>

    <div>
        <label for="file">Upload File:</label>
        <input type="file" id="file" ref="file" @change="handleFileChange" required>
    </div>

    <v-container>
        <v-row>
            <v-col>
                <v-btn class="btn btn-outline-dark" v-on:click="back()"> Back </v-btn>
            </v-col>
            <v-col>
                <v-btn class="btn btn-outline-dark" v-on:click="submit()"> Save </v-btn>
            </v-col>
        </v-row>
    </v-container>
</form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserCreation',

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
            // const saveData = new FormData();
            // saveData.append('name', this.formData.name),
            //     saveData.append('email', this.formData.email),
            //     saveData.append('mobileNo', this.formData.mobileNo),
            //     saveData.append('portalId', this.formData.portal),
            //     saveData.append('roleId', this.formData.role),
            //     saveData.append('files', this.formData.file),
            this.saveData = {
                name: this.formData.name,
                email: this.formData.email,
                mobileNo: this.formData.mobileNo,
                portalId: this.formData.portal,
                roleId: this.formData.role,
                files: this.formData.file,
            }
            axios.post('http://10.163.17.52:8082/supportdora/create-supportuser', this.saveData, {

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
        await axios.get("http://10.163.17.52:8082/supportdora/roles", {
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
