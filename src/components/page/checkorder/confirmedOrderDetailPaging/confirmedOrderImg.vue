<template>
  <div>
    <info-header>上传图片</info-header>
    <div class="bg-fff p15 mb12 upload_img_block">
      <div class="add_img">+</div>
      <div class="add_img">+</div>
      <div class="add_img">+</div>
      <div class="add_img_title">最多可上传3张照片</div>
    </div>
  </div>
</template>

<script>
  import infoHeader from "@/components/common/infoHeader";

  export default {
    name: "newOrderImg",
    components: {
      infoHeader
    }
  }
</script>

<style scoped>

</style>
