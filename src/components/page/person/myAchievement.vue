<template>
    <div>
      <d-header>我的业绩</d-header>
      <d-nav class="nav">
        <li :class="{'active': activePage==1}" @click="activePage=1">云药房</li>
        <li :class="{'active': activePage==2}" @click="activePage=2">云处方</li>
        <li :class="{'active': activePage==3}" @click="activePage=3">检验订单</li>
      </d-nav>
      <section class="content">
        <keep-alive>
          <component v-bind:is="currentTabComponent"></component>
        </keep-alive>
      </section>
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import dNav from "@/components/common/dNav";
import cloudPharmacy from "./myAchievementPaging/cloudPharmacy";
import cloudRecipe from "./myAchievementPaging/cloudRecipe";
import inspectOrder from "./myAchievementPaging/inspectOrder";
export default {
  components: {
    dHeader,
    dNav,
    cloudPharmacy,
    cloudRecipe,
    inspectOrder
  },
  data() {
    return {
      activePage: 1
    };
  },
  computed: {
    currentTabComponent() {
      switch (this.activePage) {
        case 1:
          return "cloud-pharmacy";
          break;
        case 2:
          return "cloud-recipe";
          break;
        case 3:
          return "inspect-order";
          break;
        default:
          return "cloud-pharmacy";
          break;
      }
    }
  }
};
</script>

<style scoped>
:root .nav {
  position: fixed;
  margin-top: 2.75rem;
}
.content {
  position: relative;
  top: 11.75rem;
}
</style>
