<template>
<TitleSection />
<h2>Update Agent:</h2>
<form name="UpdateUser">

    <div class="mb-3">
        <label for="First Name">First Name: </label>
        <input type="text" id="First Name" v-model="input.FirstName" />
    </div>
    <br>
    <div class="mb-3">
        <label for="MobileNo">Mobile No: </label>
        <input type="Number" id="MobileNo" v-model="input.MobileNo" />
    </div>
    <br>

    <div>
        <label for="EmailId">Email Id: </label>
        <input type="text" id="EmailId" v-model="input.EmailId" />
    </div>
    <br>

    <div>
        <label>Role:</label>
        <select v-model="input.select">
            <option type="text">-Select-</option>
            <option type="text">L1</option>
            <option type="text">L2</option>
            <option type="text">L3</option>
        </select>
    </div>
    <div>
        <label for="Portal">Portal Name: </label>
        <input type="text" id="Portal" v-model="input.Portal" />
    </div>
    <div>
        <label for="Status">Status:</label>
        <input type="radio" id="Unblock" name="Status" value="Unblock">
        <label for="Unblock">Unblock</label>
        <input type="radio" id="Block" name="Status" value="Block">
        <label for="Block">Block</label>
    </div>
    <br>

    <v-btn class="btn btn-outline-dark" type="submit" v-on:click.prevent="Cancel()">
        Cancel
    </v-btn>
    <v-btn class="btn btn-outline-dark" type="submit" v-on:click.prevent="save()">
        Save
    </v-btn>
</form>
</template>

<script>
import TitleSection from './TitleSection.vue';
export default {

    name: 'UpdateUser',
    components: {
        TitleSection
    },
    data() {
        return {
            input: {
                select: {
                    value: ''
                },
                FirstName: "",
                MobileNo: "",
                EmailId: "",
                Portal: ""
            }
        }
    },
    methods: {
        save() {
            // console.log(this.input),
                this.$router.push('/AgentList')
        },
        Cancel() {
            this.$router.push('/AgentList')
        }
    }
}
</script>
