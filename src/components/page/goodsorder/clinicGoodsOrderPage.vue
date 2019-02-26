<template>
  <div>
    <d-header>{{headerTitle}}</d-header>
    <div class="nav_block">
      <nav class="nav_list">
        <li :class="{'active':currTab==1}" @click.stop="changeTab(1)">待付款</li>
        <li :class="{'active':currTab==2}" @click.stop="changeTab(2)">订单查询</li>
      </nav>
      <hr class="full-screen-hr">
    </div>
    <section class="mt92">
      <keep-alive>
        <component :is="currComponent" :clinicId="clinicId"></component>
      </keep-alive>
    </section>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader.vue";
import allList from "@/components/page/goodsorder/clinicGoodsOrderPaging/allList.vue";
import payList from "@/components/page/goodsorder/clinicGoodsOrderPaging/payList.vue";
export default {
  props: ["clinicId"],
  components: {
    dHeader,
    allList,
    payList
  },
  data() {
    return {
      headerTitle: this.$route.query.name,
      currTab: 1
    };
  },
  computed: {
    currComponent() {
      switch (this.currTab) {
        case 1:
          return "payList";
          break;
        case 2:
          return "allList";
          break;
      }
    }
  },
  methods: {
    changeTab(tab) {
      this.currTab = tab;
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

.search_block {
  position: fixed;
  top: 5.85rem;
  background: #ffffff;
  width: 100%;
}

.fast_block {
  display: flex;
  width: 100%;
  padding: 0 0.75rem;
}

.fast_block button {
  flex: 1;
  background: #ebf8f9;
  border: 0.0625rem solid #08bac6;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #3f3f3f;
  padding: 0.375rem 0;
  margin: 0.5rem 0.25rem;
}

.input_block {
  display: flex;
  width: 100vw;
  padding: 0.5rem 0.94rem;
}

.input_block input {
  border: 0.0625rem solid #08bac6;
  border-radius: 0.25rem;
  width: calc(50vw - 3.38rem);
  margin-right: 0.565rem;
  text-align: center;
}

.input_block button {
  background: #08bac6;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #ffffff;
  border: none;
  width: 3.75rem;
  padding: 0.375rem 1rem;
  display: block;
}

.order_item {
  background: #ffffff;
  font-size: 0.94rem;
  color: #7c7c7c;
}

.order_item_top {
  color: #3f3f3f;
  display: flex;
  padding: 0.625rem 0.94rem 0.25rem;
}

.order_item_top span:first-child {
  flex: 1;
  font-weight: bold;
}

.order_item_top span:last-child {
  font-size: 0.875rem;
}

.order_item_middle {
  display: flex;
  padding: 0 0.94rem 0.25rem;
}

.order_item_middle span:first-child {
  flex: 1;
}

.order_item_middle span:last-child {
  color: #eb6262;
}

.order_item_bottom {
  padding: 0 0.94rem 0.625rem;
}
</style>