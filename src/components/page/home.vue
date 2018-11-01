<template>
  <div>
    <section class="home_top">
      <div class="top_item">
        <img src="../../assets/img/yf.png">
        <span>云药房订单</span>
      </div>
      <router-link to="/checkListPage">
        <div class="top_item">
          <img src="../../assets/img/jy.png">
          <span>检验订单</span>
        </div>
      </router-link>
      <div class="top_item">
        <img src="../../assets/img/cf.png">
        <span>云处方订单</span>
      </div>
    </section>
    <section class="home_content">
      <div class="home_content_title">
        <img src="../../assets/img/xx.png">
        <span>订单消息</span>
      </div>
      <hr class="full-screen-hr">
      <ul>
        <li>
          <div class="order_infor">
            <div class="order_infor_top">
              <div>采购订单下单</div>
              <div>18/10/01 14:12</div>
            </div>
            <div class="order_infor_bottom">
              深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
            </div>
          </div>
          <hr class="full-screen-hr">
        </li>
        <li>
          <div class="order_infor">
            <div class="order_infor_top">
              <div>采购订单下单</div>
              <div>18/10/01 14:12</div>
            </div>
            <div class="order_infor_bottom">
              深圳淳道门诊：这是消息这是消息这是消这是消息消息这是消息这是消息这是消这是消息消息
            </div>
          </div>
          <hr class="full-screen-hr">
        </li>
      </ul>
      <div class="add_more">查看更多...</div>
    </section>
    <d-footer :activeItem="1"></d-footer>
  </div>
</template>

<script>
  import dFooter from "@/components/common/dFooter";
  export default {
    name: "home",
    components: {
      dFooter
    },
    data:function () {
      return{

      }
    },
    created:function(){

    },
    methods:{

    }
  }
</script>

<style scoped>
  .home_top {
    display: flex;
    justify-content: center;
    background: #fff;
    margin-bottom: 0.75rem;
  }

  .home_top .top_item {
    flex: 1;
    padding: 1rem 0 1.125rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .home_top .top_item span {
    font-size: 0.875rem;
    color: #3F3F3F;
    padding-top: 0.625rem;
  }

  .home_top .top_item img {
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 auto;
    display: inline-block;
  }

  .home_content {
    background: #ffffff;
  }

  .home_content_title {
    font-size: 0.875rem;
    color: #3F3F3F;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    align-items: center;
  }

  .home_content_title img {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.375rem;
    margin-left: 0.9375rem;
  }

  .order_infor {
    padding: 0.625rem 1rem;
  }

  .order_infor_top {
    display: flex;

  }
  .order_infor_top div:first-child{
    flex: 1;
    color: #3F3F3F;
    font-size: 1rem;
    font-weight: bolder;
  }
  .order_infor_top div:last-child{
    font-size: 0.875rem;
    color: #3F3F3F;
    margin-right: 0.5rem;
  }
  .order_infor_bottom {
    margin-top: 0.5rem;
    color: #7C7C7C;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .add_more{
    color: #7C7C7C;
    font-size: 0.875rem;
    background: #FAFAFA;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    margin-bottom: 3.125rem;
  }
</style>
