<template>
  <header class="d-header">
    <img v-if="isCanBack" src="@/assets/img/fanghui@2x.png" @click="goBack(cb)" class="d-header-img">
    <span><slot></slot></span>
  </header>
</template>

<script>
  export default {
    props: {
      isCanBack: {
        type: Boolean,
        default: true
      },
      cb: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goBack() {
        this.$emit('click');
        if (this.cb) {
          return;
        }
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push("/");
      }
    }
  };
</script>

<style scoped>
  .d-header {
    width: 100%;
    height: 2.75rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    line-height: 2.75rem;
    text-align: center;
    font-size: 1rem;
    color: #3f3f3f;
    background: #fafafa;
  }

  .d-header-img {
    position: absolute;
    left: 0.9375rem;
    top: 0.625rem;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
