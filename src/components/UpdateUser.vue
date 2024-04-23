<template>
<h2>Update Agent:</h2>
    <form name="UpdateUser" >
        <div>
          <div>
            <label>Title:</label>
            <select v-model="input.select">
           <option type="text">-Select-</option>
           <option type="text">Mr</option>
           <option type="text">Mrs</option>
           <option type="text">Ms</option>
           </select>
          </div>
          <br>
          <br>
        </div>
          <div class="mb-3">
            <label for="First Name">First Name: </label>
            <input type="text" id="First Name" v-model="input.FirstName" />
          </div>
          <br>
          <br>
        <div class="mb-3">
           <label for="MobileNo">Mobile No: </label>
           <input type="Number" id="MobileNo" v-model="input.MobileNo" />
        </div>
        <br>
          <br>
        <div>
          <label for="EmailId">Email Id: </label>
           <input type="text" id="EmailId" v-model="input.EmailId" />
        </div>
        <br>
          <br>
          <div>
            <label>Role:</label>
            <select v-model="input.select" >
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
          <label for="Status" >Status:</label>
             <input type="radio" id="Unblock" name="Status" value="Unblock">
              <label for="Unblock">Unblock</label>
              <input type="radio" id="Block" name="Status" value="Block">
             <label for="Block">Block</label>
        </div>
        <br>
          <br>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent= "save()">
            Save
          </button>
          <br>
          <br>
          <button class="btn btn-outline-dark" type="submit" v-on:click.prevent= "Cancel()">
            Cancel
          </button>
        </form>
</template>

<script>

export default{

name: 'UpdateUser',

data(){
return{
    input:{
        select:{
            value:''
          },
        FirstName: "",
            MobileNo: "",
            EmailId:"",
            Portal:""
    }
}
},
methods:{
    save(){
        console.log(this.input),
        this.$router.push('/AdminPageDashboard')
    },
    Cancel(){
        this.$router.push('/AdminPageDashboard')
    }
}
}

</script>