<template>
  <div>
    <d-search @on-search="getData"></d-search>
    <section class="clinic_content">
      <ul>
        <li>
          <div class="order_infor">
            <div class="order_infor_top">
              <div>采购订单下单</div>
              <div class="bg_EB">综合诊所</div>
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
              <div class="bg_ED">西医诊所</div>
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
              <div class="bg_4D">西医诊所</div>
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
  </div>
</template>

<script>
  import dSearch from '@/components/common/dSearch.vue'
  export default {
    name: "clinicList",
    data:function () {
      return{

      }
    },
    components:{
      'd-search':dSearch
    },
    methods:{
      getData:function (name) {
        console.log(name)
      }
    }
  }
</script>

<style scoped>
  .clinic_content {
    background: #ffffff;
  }

  .order_infor {
    padding: 0.625rem 1rem;
  }

  .order_infor_top {
    display: flex;

  }

  .order_infor_top div:first-child {

    color: #3F3F3F;
    font-size: 1rem;
    font-weight: bolder;
  }

  .order_infor_top div:last-child {
    font-size: 0.625rem;
    color: #FFFFFF;
    border-radius: 4px;
    height: 1.25rem;
    line-height: 1.25rem;
    padding: 0 0.25rem;
    margin-left: 0.5rem;
  }

  .bg_EB {
    background: #EB6262;
  }

  .bg_ED {
    background: #EDAB15;
  }

  .bg_4D {
    background: #4DBC89;
  }

  .order_infor_bottom {
    margin-top: 0.5rem;
    color: #7C7C7C;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .add_more {
    color: #7C7C7C;
    font-size: 0.875rem;
    background: #FAFAFA;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    margin-bottom: 3.125rem;
  }
</style>
