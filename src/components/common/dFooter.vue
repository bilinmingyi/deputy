<template>
  <footer class="d-footer">
    <div :class="['d-footer-item', {active: activeBar==1}]" @click="activeBar=1">
        <span class="yunicon" v-if="activeBar==1">&#xe60b;</span>
        <span class="yunicon" v-else="activeBar!=1">&#xe60e;</span>
        <span class="d-footer-text">首页</span>
    </div>
    <div :class="['d-footer-item', {active: activeBar==2}]" @click="activeBar=2">
        <span class="yunicon" v-if="activeBar==2">&#xe60a;</span>
        <span class="yunicon" v-else="activeBar!=2">&#xe60c;</span>
        <span class="d-footer-text">诊所</span>
    </div>
    <div :class="['d-footer-item', {active: activeBar==3}]" @click="activeBar=3">
        <span class="yunicon" v-if="activeBar==3">&#xe60d;</span>
        <span class="yunicon" v-else="activeBar!=3">&#xe609;</span>
        <span class="d-footer-text">个人</span>
    </div>
  </footer>
</template>

<script>
export default {
  props: ["activeItem"],
  data() {
    return {
      activeBar: this.activeItem
    };
  },
};
</script>

<style scoped>
.d-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -ms-flex-align: center;
  justify-content: space-around;
  width: 100vw;
  height: 3.125rem;
  color: #7c7c7c;
  background: #fff;
}

.d-footer::after {
  content: "";
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-top: 0.0625rem solid #d9d9d9;
  transform: scaleY(0.5);
}

.d-footer-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 0.5625rem;
  color: #8c8c8c;
  letter-spacing: 0;
}

.d-footer-item > .yunicon {
  font-size: 1.375rem;
}

.d-footer-item.active {
  color: #08BAC6 !important;
}
</style>
