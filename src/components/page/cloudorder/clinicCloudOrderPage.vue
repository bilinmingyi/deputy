<template>
  <div>
    <d-header>{{headerTitle}}</d-header>
    <div class="nav_block">
      <nav class="nav_list">
        <li>待付款</li>
        <li class="active">订单查询</li>
      </nav>
      <hr class="full-screen-hr">
    </div>
    <section class="search_block">
      <div class="fast_block">
        <button>今日</button>
        <button>昨日</button>
        <button>本月</button>
        <button>上月</button>
      </div>
      <div class="input_block">
        <input placeholder="起始日期" type="date"/>
        <input placeholder="结束日期" type="date"/>
        <div>
          <button>查询</button>
        </div>
      </div>
      <hr class="full-screen-hr">
    </section>
    <section class="mt188 mb50">
      <router-link to="/cloudListPage/clinicCloudOrderPage/waitPayPage/11">
        <div class="order_item">
          <div class="order_item_top">
            <span>李教授</span>
            <span>18/10/01 14:12</span>
          </div>
          <div class="order_item_middle">
            <span>王尼玛：15876890561</span>
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
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue"
  export default {
    name: "clinicCloudOrderPage",
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

  .search_block{
    position: fixed;
    top: 5.85rem;
    background: #FFFFFF;
    width: 100%;
  }
  .fast_block{
    display: flex;
    width: 100%;
    padding: 0 0.75rem;
  }
  .fast_block button{
    flex: 1;
    background: #EBF8F9;
    border: 0.0625rem solid #08BAC6;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #3F3F3F;
    padding: 0.375rem 0;
    margin: 0.5rem 0.25rem;
  }

  .input_block{
    display: flex;
    width: 100vw;
    padding: 0.5rem 0.94rem;
  }
  .input_block input{
    border: 0.0625rem solid #08BAC6;
    border-radius: 0.25rem;
    width: calc(50vw - 3.38rem);
    margin-right: 0.565rem;
    text-align: center;
  }
  .input_block button{
    background: #08BAC6;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #FFFFFF;
    border: none;
    width: 3.75rem;
    padding: 0.375rem 1rem;
    display: block;
  }
  .order_item {
    background: #FFFFFF;
    font-size: 0.94rem;
    color: #7C7C7C;
  }

  .order_item_top {
    color: #3F3F3F;
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
    color: #EB6262;
  }

  .order_item_bottom {
    padding: 0 0.94rem 0.625rem;
  }

</style>
