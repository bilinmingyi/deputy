<template>
  <div>
    <d-header>订单详情</d-header>
    <section class="content">
      <info-bar :title="'患者详情'">
        <div>
          <span>就诊时间：</span>
          <span>{{order.create_time | dateFormat('yyyy-MM-dd hh:mm')}}</span>
        </div>
        <div>
          <span>患者姓名：</span>
          <span>{{order.patient_name}}</span>
        </div>
        <div>
          <span>联系电话：</span>
          <span>{{order.patient_mobile}}</span>
        </div>
        <div>
          <span>就诊医生：</span>
          <span>{{order.doctor_name}}</span>
        </div>
      </info-bar>
      <!--订单检查项目组件-->
      <order-check @update="getData(true)"></order-check>
      <!--订单条码组件-->
      <order-code></order-code>
      <!--订单图片组件-->
      <order-img></order-img>
      <!--订单支付方式组件-->
      <order-pay></order-pay>

      <div class="payment">
        <span>备注</span>
        <input type="text" :value="order.memo" placeholder="请输入备注" style="border: none;outline: none">
      </div>
      <div class="pay_operation">
        <button @click="$router.go(-1)">关闭</button>
        <button>给诊所退款</button>
        <button>确认</button>
      </div>
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader.vue";
import infoBar from "@/components/common/infoBar";
import orderCheck from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderCheck";
import orderCode from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderCode";
import orderImg from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderImg";
import orderPay from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderPay";
import dLoad from "@/components/common/dLoad";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "confirmedOrderDetail",
  components: {
    dHeader,
    infoBar,
    orderCheck,
    orderCode,
    orderImg,
    orderPay,
    dLoad
  },
  props: ["orderSeqno"],
  data() {
    return {
      showLoad: false
    };
  },
  created() {
    document.documentElement.scrollTop = 0;
    this.getData();
  },
  computed: {
    ...mapState("changeCheckOrder", {
      order: state => state.order
    }),
    ...mapGetters("changeCheckOrder", ["curProjects"])
  },
  methods: {
    ...mapActions("changeCheckOrder", ["set_order"]),
    getData(noLoad) {
      if (!noLoad) {
        this.showLoad = true;
      }
      let params = { order_seqno: this.orderSeqno };
      this.axios
        .post("/weixin/sales/dyCheckOrder/detail", params)
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.set_order(res.data);
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(console.log)
        .then(() => (this.showLoad = false));
    }
  }
};
</script>

<style scoped>
.content {
  min-height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 2.75rem 0 0 0;
}

.payment {
  background: #ffffff;
  color: #3f3f3f;
  font-size: 1rem;
  padding: 0.78rem 0.94rem;
  margin-bottom: 4.25rem;
  display: flex;
}

.payment input {
  font-size: 1rem;
  padding: 0 1rem;
  flex: 1;
}

.pay_line {
  font-size: 1rem;
  color: #7c7c7c;
  padding: 0.78rem 0;
}

.pay_line span:nth-child(2) {
  color: #3f3f3f;
  padding-left: 1rem;
}
.pay_line .pay_money {
  color: #eb6262 !important;
  font-weight: bold;
}
.pay_type_block {
  display: flex;
}
.pay_type_block div {
  flex: 1;
}
</style>
