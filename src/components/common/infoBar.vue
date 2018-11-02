<template>
  <section>
    <div class="info-header">
      <span class="info-header-text">{{infoTitle}}</span>
      <slot name='btn'></slot>
    </div>
    <div class="info-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      infoTitle: this.title
    };
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
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(.5);
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
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  min-height: 2rem;
  font-family: PingFangSC-Regular;
  font-size: 0.75rem;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
}
.info-content {
  padding: 0.5rem 0.9375rem;
  margin-bottom: 0.75rem;
  background: #fff;
}
.info-content > * {
  display: flex;
}
.info-content > * > *:nth-child(1) {
  line-height: 1.5rem;
  min-width: 20vw;
  font-family: PingFangSC-Regular;
  font-size: 0.9375rem;
  color: #7C7C7C;
  letter-spacing: 0;
}
.info-content > * > *:nth-child(2) {
  flex: 1;
  font-family: PingFangSC-Regular;
  line-height: 1.5rem;
  font-size: 0.9375rem;
  color: #000;
}
</style>