<template>
  <div>
    <d-header>{{headerTitle}}</d-header>
    <div class="nav_block">
      <nav class="nav_list">
        <li :class="{active:currTab==1}" @click.stop="changeTab(1)">待确认</li>
        <li :class="{active:currTab==2}" @click.stop="changeTab(2)">待付款</li>
        <li :class="{active:currTab==3}" @click.stop="changeTab(3)">订单查询</li>
      </nav>
      <hr class="full-screen-hr">
    </div>
    <section class="mt92 mb56">
      <keep-alive>
        <component :is="currComponent" :clinicId="clinicId"></component>
      </keep-alive>
    </section>
    <div class="record_sheet">
      <router-link to="/checkListPage/newOrderPage">
        <button>
          我要录单
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue"
  import allList from "@/components/page/checkorder/clinicCheckOrderPaging/allList.vue"
  import confirmedList from "@/components/page/checkorder/clinicCheckOrderPaging/confirmedList.vue"
  import payList from "@/components/page/checkorder/clinicCheckOrderPaging/payList.vue"

  export default {
    name: "clinicCheckOrderPage",
    props: ['clinicId'],
    data() {
      return {
        headerTitle: this.$route.query.name,
        currTab: 1,
      }
    },
    computed:{
      currComponent(){
        switch (this.currTab) {
          case 1:
            return 'confirmedList';
            break;
          case 2:
            return 'payList';
            break;
          case 3:
            return 'allList';
            break;
        }
      }
    },
    created() {

    },
    components: {
      dHeader,
      allList,
      confirmedList,
      payList
    },
    methods: {
      changeTab(tab) {
        this.currTab = tab;
      },
    }
  }
</script>

<style scoped>
  .nav_block {
    position: fixed;
    top: 44px;
    width: 100%;
  }

  .nav_list {
    display: flex;
    line-height: 3rem;
    height: 3rem;
    background: #FAFAFA;
    font-size: 1rem;
    color: #7C7C7C;
  }

  .nav_list li {
    flex: 1;
    text-align: center;
  }

  .nav_list .active {
    background: #FFFFFF;
    font-size: 1rem;
    color: #08BAC6;
    font-weight: bold;
    border-bottom: 2px solid #08BAC6;;
  }


  .record_sheet {
    background: #FFFFFF;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    padding: 0.5rem 0.94rem;
  }

  .record_sheet button {
    background: #08BAC6;
    border: 1px solid #08BAC6;
    border-radius: 4px;
    font-size: 0.94rem;
    color: #FFFFFF;
    width: 100%;
    line-height: 2.5rem;
    height: 2.5rem;
  }
</style>
