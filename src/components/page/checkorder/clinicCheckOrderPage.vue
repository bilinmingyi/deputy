<template>
  <div>
    <d-header>{{headerTitle}}</d-header>
    <div class="nav_block">
      <nav class="nav_list">
        <li class="active">待确认</li>
        <li>待付款</li>
        <li>订单查询</li>
      </nav>
      <hr class="full-screen-hr">
    </div>
    <section class="mt92 mb50">

      <router-link to="/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/1212">
        <div class="order_item">
          <div class="order_item_top">
            <span>李教授</span>
            <span>18/10/01 14:12</span>
          </div>
          <div class="order_item_middle">
            <span>王尼玛</span>
            <span>待确认</span>
          </div>
          <div class="order_item_bottom">
            <span>付款金额：323</span>
          </div>
          <hr class="full-screen-hr">
        </div>
      </router-link>
      <router-link to="/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/1212">
        <div class="order_item">
        <div class="order_item_top">
          <span>李教授</span>
          <span>18/10/01 14:12</span>
        </div>
        <div class="order_item_middle">
          <span>王尼玛</span>
          <span>待确认</span>
        </div>
        <div class="order_item_bottom">
          <span>付款金额：323</span>
        </div>
        <hr class="full-screen-hr">
      </div>
      </router-link>
      <div class="add_more">查看更多...</div>
    </section>
    <div class="record_sheet">
      <button>
        我要录单
      </button>
    </div>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue"

  export default {
    name: "clinicCheckOrderPage",
    props: ['clinicId'],
    data() {
      return {
        headerTitle: this.$route.query.name
      }
    },
    created() {

    },
    components: {
      'd-header': dHeader
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

  .order_item{
    background: #FFFFFF;
    font-size: 0.94rem;
    color: #7C7C7C;
  }
  .order_item_top{
    color: #3F3F3F;
    display: flex;
    padding: 0.625rem 0.94rem 0.25rem;
  }
  .order_item_top span:first-child{
    flex: 1;
    font-weight: bold;
  }
  .order_item_top span:last-child{
    font-size: 0.875rem;
  }
  .order_item_middle{
    display: flex;
    padding:  0 0.94rem 0.25rem;
  }
  .order_item_middle span:first-child{
    flex: 1;
  }
  .order_item_middle span:last-child{
    color: #EB6262;
  }
  .order_item_bottom{
    padding: 0 0.94rem 0.625rem;
  }
  .record_sheet{
    background: #FFFFFF;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    padding:0.5rem 0.94rem ;
  }
  .record_sheet button{
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
