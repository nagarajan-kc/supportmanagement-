<template>
<div class="bg-light-blue-lighten-1 headertitle">
    <img :src="require('@/assets/GepnicLogo.png')"/>
    <h1>Support Management System</h1>
</div>
</template>

<script>
export default {
    name: 'HeaderSection',
}
</script>

<style scoped>
.headertitle{
    display:flex;
}

h1 {
    text-align: center;
    padding: 10px 420px;
    margin-bottom: 8px;
}

</style>
