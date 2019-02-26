<template>
  <div>采购订单11</div>
</template>

<script>
export default {
  props: ["clinicId"],
  data() {
    return {
      headerTitle: this.$route.query.name,
      currTab: 1
    };
  },
  created() {
    console.log(111)
    console.log(this.currTab)
  }
};
</script>

<style scoped>
</style>