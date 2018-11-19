<template>
  <div>
    <d-header>订单详情</d-header>
    <section class="content">
      <order-report v-if="status!='WAITCONFIRM'"></order-report>
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
      <order-img :img-list="imgDataList" v-on:datachange="changeImg" :can-change="status==='WAITCONFIRM'?true:false"></order-img>
      <!--订单支付方式组件-->
      <order-pay></order-pay>
      <div :class="['payment',{'bottom': status!='DONE'}, {'mb12': status=='DONE'}]">
        <span>备注</span>
        <input v-if="status!='WAITCONFIRM'" disabled type="text" :value="order.memo ? order.memo : '无'" style="border: none;outline: none">
        <input v-else type="text" :value="order.memo" placeholder="请输入备注" style="border: none;outline: none"
               @input="set_order({memo:$event.target.value})">
      </div>
      <div class="pay_operation" v-if="status=='WAITCONFIRM'">
        <button @click="handleOrder(-1)">关闭</button>
        <button @click="handleOrder(3)" v-if="order.is_paid==0">取消订单</button>
        <button @click="handleOrder(1)" v-if="order.is_paid==1">给诊所退款</button>
        <button @click="handleOrder(2)">确认</button>
      </div>
      <div class="pay_operation" v-else>
        <button @click="handleOrder(-1)">关闭</button>
        <button @click="handleOrder(4)" v-if="order.is_paid==0">去支付</button>
      </div>
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader.vue";
import infoHeader from "@/components/common/infoHeader";
import infoBar from "@/components/common/infoBar";
import orderCheck from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderCheck";
import orderCode from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderCode";
import orderImg from "@/components/page/checkorder/newOrderPaging/newOrderImg";
import orderPay from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderPay";
import dLoad from "@/components/common/dLoad";
import orderReport from "@/components/page/checkorder/confirmedOrderDetailPaging/confirmedOrderReport";
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
    dLoad,
    infoHeader,
    orderReport
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
      order: state => state.order,
      status: state => state.order.status,
      checkedPayType: state => state.order.pay_type,
      isPay: state => state.order.is_paid
    }),
    ...mapGetters("changeCheckOrder", ["curProjects", "imgDataList"])
  },
  methods: {
    ...mapActions("changeCheckOrder", [
      "set_order",
      "update_imgs",
      "reset_order",
      "set_payType"
    ]),
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
            this.set_payType(1);
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(console.log)
        .then(() => (this.showLoad = false));
    },
    changeImg(str) {
      this.update_imgs(str);
    },
    handleOrder(type) {
      if (type == -1) {
        this.$router.go(-1);
      } else if (type == 1) {
        this.axios
          .post("/weixin/sales/dyCheckOrder/refund", {
            order_seqno: this.orderSeqno
          })
          .then(response => {
            let res = response.data;
            if (res.code == 1000) {
              this.$Message.infor("已确认退款");
              this.$router.go(-1);
            } else {
              this.$Message.infor(res.msg);
            }
          })
          .catch(console.log);
      } else if (type == 2) {
        if (this.order.items_info.length === 0) {
          this.$Message.infor("至少添加一个检验项目");
          return;
        }
        let barCodeInfo = this.order.dyCheckOrderSpecimenInfos;
        for (let i = 0, len = barCodeInfo.length; i < len; i++) {
          if (barCodeInfo[i].barcode === "") {
            this.$Message.infor("条码不能为空");
            return;
          }
        }
        this.axios
          .post("/weixin/sales/dyCheckOrder/comfirm", {
            order_seqno: this.orderSeqno,
            check_images:
              typeof this.imgDataList === "string"
                ? this.imgDataList
                : JSON.stringify(this.imgDataList),
            pay_type: this.order.pay_type,
            memo: this.order.memo
          })
          .then(response => {
            let res = response.data;
            if (res.code == 1000) {
              if (this.checkedPayType == 1 && this.isPay==0) {
                this.handleOrder(4);
              } else {
                this.$router.go(-1);
              }
            } else {
              this.$Message.infor(res.msg);
            }
          })
          .catch(console.log);
      } else if (type == 3) {
        this.axios
          .post("/weixin/sales/dyCheckOrder/cancel", {
            order_seqno: this.orderSeqno
          })
          .then(respone => {
            const res = respone.data;
            if (res.code === 1000) {
              this.$router.go(-1);
            } else {
              this.$Message.infor(res.msg);
            }
          });
      } else if (type == 4) {
        window.location.href =
          "/dyyzs/weixin/pay/?orderType=5&orderSeqno=" + this.orderSeqno;
      }
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
  display: flex;
}

.bottom {
  margin-bottom: 7rem;
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

input:disabled {
  background-color: #fff;
  color: #aca899;
}
</style>
