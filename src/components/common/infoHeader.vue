<template>
  <div class="info-header">
    <span class="info-header-text">
      <slot></slot>
    </span>
  </div>
</template>



<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.info-header {
  background: #fff;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.info-header::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(0.5);
}
.info-header-text {
  font-family: PingFangSC-Medium;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
  font-weight: 600;
  line-height: 1.25rem;
  margin-left: 0.75rem;
  border-left: 0.25rem solid #08bac6;
  padding-left: 0.5rem;
}
</style>