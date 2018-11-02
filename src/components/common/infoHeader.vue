<template>
  <div :class="['info-header', {'border': !noBorder}]">
    <span class="info-header-text">
      <slot></slot>
    </span>
    <slot name='btn'></slot>
  </div>
</template>



<script>
export default {
  props: {
    'noBorder': {
      type: Boolean,
      default: false,
    }
  },
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
.info-header.border::after {
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
.info-header button {
  position: absolute;
  right: 0.94rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ebf8f9;
  border: 1px solid #08bac6;
  border-radius: 3.125rem;
  padding: 0 1.625rem;
  min-height: 2rem;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
}
</style>
