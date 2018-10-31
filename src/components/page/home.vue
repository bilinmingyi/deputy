<template>
    <div>
      首页
      <router-link to="/checkListPage">检查列表页</router-link>
      <router-link to="/cloudListPage">云处方列表页</router-link>
      <router-link to="/clinic">诊所页</router-link>
      <router-link to="/home/personal">个人页</router-link>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>
