<template>
    <nav :class="['nav_block', {'border': !noBorder}]">
      <ul class="nav_list">
        <slot></slot>
      </ul>
    </nav>
</template>

<script>
export default {
  props: {
    defaultPage: {
      type: Number,
      default: 1
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activePage: this.defaultPage
    };
  }
};
</script>

<style scoped>
.nav_block {
  width: 100%;
  z-index: 999;
  position: absolute;
}
.nav_block.border::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(0.5);
}
.nav_list {
  display: flex;
  line-height: 3rem;
  height: 3rem;
  background: #fafafa;
  font-size: 1rem;
  color: #7c7c7c;
}
.nav_list li {
  flex: 1;
  text-align: center;
}

.nav_list .active {
  background: #ffffff;
  font-size: 1rem;
  color: #08bac6;
  font-weight: bold;
  border-bottom: 2px solid #08bac6;
}
</style>