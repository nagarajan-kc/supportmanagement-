<template>
<v-row class="bg-light-blue-lighten-1 headertitle">
    <v-col align="left" cols="1">
        <img :src="require('@/assets/GepnicLogo.png')" />
    </v-col>
    <v-col align="center" justify="center">
        <h1>Support Management System</h1>
    </v-col>
</v-row>
</template>

<script>
export default {
    name: 'HeaderSection',
}
</script>

<style scoped>
.headertitle {

margin-bottom: 10px;
padding-top: 10px;
}

img {
    height: 40px;
    margin-left: 25px;
    margin-top: 10px;
}
</style>
