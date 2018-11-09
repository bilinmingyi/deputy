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
      <order-img :img-list="JSON.stringify(imgDataList)" v-on:datachange="changeImg"></order-img>
      <!--订单支付方式组件-->
      <order-pay></order-pay>
      <div class="payment">
        <span>备注</span>
        <input type="text" placeholder="请输入备注" :value="remark" @input="set_remark($event.target.value)">
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
  import {mapState, mapActions} from 'vuex'

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
    computed:{
      ...mapState('newCheckOrder',{
        imgDataList: state => state.prescription.imgList,
        remark: state => state.prescription.doctorRemark
      })
    },
    created() {
      this.init();
    },
    methods: {
      ...mapActions('newCheckOrder',[
        'set_imgList',
        'set_remark'
      ]),
      init() {
        this.$store.commit('newCheckOrder/SET_CLINICID', this.$route.query.clinicId)
      },
      changeImg(str){
        this.set_imgList(str)
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
