<template>
  <div>
    <info-header>
      条码信息
      <button slot="btn">编辑条码</button>
    </info-header>
    <div class="bg-fff p15 mb12">

    </div>
  </div>
</template>

<script>
  import infoHeader from "@/components/common/infoHeader";

  export default {
    name: "newOrderCode",
    components: {
      infoHeader
    }
  }
</script>

<style scoped>

</style>
