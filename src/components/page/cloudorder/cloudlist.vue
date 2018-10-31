<template>
    <div>
      <d-header>云处方订单</d-header>
      <span>这是云处方列表</span>
      <d-footer :activeItem="2"></d-footer>
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import dFooter from "@/components/common/dFooter";
export default {
  name: "cloudlist",
  components: {
    dHeader,
    dFooter
  }
};
</script>

<style scoped>
</style>
