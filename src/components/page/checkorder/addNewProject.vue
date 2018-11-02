<template>
  <div class="main">
    <d-header>检验项目</d-header>
    <div class="nav_block">
      <nav class="nav_list">
        <li :class="{'active': activePage==1}" @click="activePage=1">组合项目</li>
        <li :class="{'active': activePage==2}" @click="activePage=2">基本项目</li>
      </nav>
    <hr class="full-screen-hr">
    </div>
    <d-search @on-search="getData"></d-search>
    <section class="content">
      <div class="project-box p15" v-if="activePage==1">
        <ul>
          <li>尿检（100元）</li>
          <li>甲功三项（299元）</li>
          <li>性激素六项</li>
        </ul>
      </div>
      <div class="project-box p15" v-if="activePage==2">
        <ul>
          <li>血常规 | 全血2ml（30元）</li>
          <li>肾功能常规 | 血清1ml（30元） </li>
          <li>血常规 | 全血2ml（30元）</li>
          <li>血常规 | 全血2ml（30元）</li>
          <li>肾功能常规 | 血清1ml（30元） </li>
          <li>血常规 | 全血2ml（30元）</li>
          <li>血常规 | 全血2ml（30元）</li>
          <li>肾功能常规 | 血清1ml（30元） </li>
          <li>血常规 | 全血2ml（30元）</li>
          <li>血常规 | 全血2ml（30元）</li>
          <li>肾功能常规 | 血清1ml（30元） </li>
          <li>血常规 | 全血2ml（30元）</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import dSearch from "@/components/common/dSearch";
export default {
  components: {
    dHeader,
    dSearch
  },
  data() {
    return {
      activePage: 1
    };
  },
  methods: {
    getData: function(name) {
      console.log(name);
    }
  }
};
</script>

<style scoped>
.nav_block {
  position: fixed;
  top: 44px;
  width: 100%;
  z-index: 999;
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
.main >>> .block-fix {
  top: calc(44px + 3rem);
}
.content {
  position: relative;
  top: calc(44px + 6rem);
}
.project-box {
  background: #fff;
}
.project-box ul {
  display: flex;
  flex-wrap: wrap;
}
.project-box ul li {
  min-height: 2.75rem;
  min-width: 100%;
  padding: 0 0.5rem;
  margin-bottom: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  flex: 1;
  background: #ebf8f9;
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
}
</style>
