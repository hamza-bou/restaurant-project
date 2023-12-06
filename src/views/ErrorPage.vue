<template>
    <div class="mt-5">
        <h1>Error page</h1>
        <h2>404 error Page</h2>
    </div>
    <router-link :to="{name: 'home'}">Visit Home page</router-link>
</template>

<script>
    export default {
        name: "ErrorPage",
    }
</script>

<style lang="scss" scoped>

</style>