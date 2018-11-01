<template>
  <div>
    <d-header>{{headerTitle}}</d-header>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue"
  export default {
    name: "clinicCheckOrderPage",
    props:['clinicId'],
    data(){
      return{
        headerTitle:this.$route.query.name
      }
    },
    created(){

    },
    components:{
      'd-header':dHeader
    }
  }
</script>

<style scoped>

</style>
