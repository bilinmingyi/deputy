<template>
  <div>
    <d-header>检验录单</d-header>
    <section class="content">
      <!--订单患者信息组件-->
      <order-patient></order-patient>
      <!--订单检查项目组件-->
      <order-check></order-check>
      <!--订单条码组件-->
      <order-code></order-code>
      <!--订单图片组件-->
      <order-img></order-img>
      <!--订单支付方式组件-->
      <order-pay></order-pay>
      <div class="payment">
        <span>备注</span>
        <input type="text" placeholder="请输入备注">
      </div>
      <div class="pay_operation">
        <button>关闭</button>
        <button>取消订单</button>
        <button>提交</button>
      </div>
    </section>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue";
  import orderPatient from "@/components/page/checkorder/newOrderPaging/newOrderPatient"
  import orderCheck from "@/components/page/checkorder/newOrderPaging/newOrderCheck"
  import orderCode from "@/components/page/checkorder/newOrderPaging/newOrderCode"
  import orderImg from "@/components/page/checkorder/newOrderPaging/newOrderImg"
  import orderPay from "@/components/page/checkorder/newOrderPaging/newOrderPay"
  export default {
    name: "newOrderPage",
    components: {
      dHeader,
      orderPatient,
      orderCheck,
      orderCode,
      orderImg,
      orderPay
    },
    data() {
      return {};
    },
    created(){
      this.init();
    },
    methods:{
      init(){
        this.$store.commit('newCheckOrder/SET_CLINICID',this.$route.query.clinicId)
      }
    }
  }
</script>

<style scoped>
  .content {
    min-height: calc(100vh - 2.75rem);
    width: 100vw;
    margin: 2.75rem 0 0 0;
  }

  .payment {
    background: #FFFFFF;
    color: #3F3F3F;
    font-size: 1rem;
    padding: 0.78rem 0.94rem;
    margin-bottom: 4.25rem;
    display: flex;
  }

  .payment input {
    font-size: 1rem;
    padding: 0 1rem;
    flex: 1;
    border: none;
    outline: none
  }

</style>
