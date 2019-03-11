<template>
  <div>
    <d-header>订单详情</d-header>
    <section class="content">
      <info-bar :title="'订单信息'">
        <div>
          <span>订单编号：</span>
          <span>{{orderSeqno}}</span>
        </div>
        <div>
          <span>下单时间：</span>
          <span v-if="order.create_time!=undefined">{{order.create_time|dateFormat}}</span>
        </div>
        <div>
          <span>下单人员：</span>
          <span>{{order.creator}}</span>
        </div>
        <div>
          <span>订单状态：</span>
          <span>{{order.status | goodsOrderType}}</span>
        </div>
      </info-bar>
      <info-bar :title="'配送地址'">
        <div>
          <span>联系人名：</span>
          <span>{{order.contact}}</span>
        </div>
        <div>
          <span>联系电话：</span>
          <span>{{order.phone_num}}</span>
        </div>
        <div>
          <span>配送地址：</span>
          <span>{{order.address}}</span>
        </div>
        <!-- <div>
          <span>配送金额：</span>
          <span style="color: red">￥{{order.deliver_price}}</span>
        </div>-->
      </info-bar>
      <div v-for="item in providerList" class="bg-ff mb12">
        <info-header>{{item.provider}}</info-header>
        <div class="mt16 mb16 ml15 mr15">
          <touch-list :canDelete="false" :data="item.list">
            <div class="list-content" slot-scope="{prop, index}">
              <div class="list-content-index">{{index + 1}}</div>
              <div class="list-content-detail">
                <span>{{ prop.name }}{{ prop.spec ? `(${prop.spec})` : "" }}</span>
                <br>
                <span style="white-space: nowrap">单价:{{ prop.trade_price | priceFormat }}</span>&nbsp;&nbsp;
                <span style="white-space: nowrap">数量:{{ prop.num }}</span>&nbsp;&nbsp;
                <span style="white-space: nowrap">
                  金额:<span
                    class="color-f57a76"
                  >{{ Number(prop.trade_price) * Number(prop.num) | priceFormat }}</span>
                </span>
              </div>
            </div>
          </touch-list>
        </div>
      </div>
      <div class="mb12">
        <div class="payment">
          <span>商品总价：</span>
          <span>{{order.goods_price | priceFormat}}</span>
        </div>
        <div class="payment">
          <span>邮寄费用：</span>
          <span>{{order.deliver_price | priceFormat}}</span>
        </div>
        <div class="payment">
          <span>订单总价：</span>
          <span>{{order.price||(order.goods_price+order.deliver_price) | priceFormat}}</span>
        </div>
        <div class="payment" v-if="orderStatus!='UNPAID'">
          <span>支付方式：</span>
          <div>
            <span v-if="order.pay_type==1">微信</span>
            <span v-if="order.pay_type==2">支付宝</span>
            <span v-if="order.pay_type==3">银行卡</span>
            <span v-if="order.pay_type==4">微信</span>
            <span v-if="order.pay_type==5">支付宝</span>
            <span v-if="order.pay_type==6">现金</span>
            <span v-if="order.pay_type==7">医保卡</span>
            <span v-if="order.pay_type==9">平台支付</span>
          </div>
        </div>
      </div>
      <div v-if="orderStatus=='UNPAID'">
        <info-header>支付信息</info-header>
        <div class="pay-type-box mb12">
          <span>支付方式</span>
          <div class="pay-radio-box">
            <div>
              <d-radio
                :name="'pay-type'"
                :id="'pay-type-wx'"
                :checkedVal="4"
                :curVal="order.pay_type"
                @change="order.pay_type = 4"
              >微信</d-radio>
            </div>
            <div>
              <d-radio
                :name="'pay-type'"
                :id="'pay-type-xx'"
                :checkedVal="6"
                :curVal="order.pay_type"
                @change="order.pay_type = 6"
              >线下转账</d-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="pay_operation">
        <button @click.stop="$router.go(-1)">关闭</button>
        <button v-if="order.status==='UNPAID'" @click.stop="cancelOrderConfirm()">取消订单</button>
        <button v-if="order.status==='UNPAID'" @click.stop="toPay()">去支付</button>
      </div>
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader.vue";
import infoBar from "@/components/common/infoBar";
import infoHeader from "@/components/common/infoHeader";
import dLoad from "@/components/common/dLoad";
import touchList from "@/components/common/touchList";
import dRadio from "@/components/common/dRadio";

export default {
  props: ["orderSeqno"],
  components: {
    dHeader,
    infoHeader,
    infoBar,
    dLoad,
    touchList,
    dRadio
  },
  data() {
    return {
      showLoad: false,
      clinicId: this.$route.query.clinicId,
      isPay: 0,
      orderStatus: "",
      order: {},
      projectList: [],
      providerList: []
    };
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.getData();
    });
  },
  created() {},
  methods: {
    getData() {
      this.showLoad = true;
      this.axios
        .post("/weixin/sales/dyGoodsOrder/detail", {
          order_seqno: this.orderSeqno
          // 'clinic_id': this.clinicId
        })
        .then(respone => {
          var res = respone.data;
          if (res.code === 1000) {
            this.order = res.data;
            this.classificationPro(res.data.goods_list);
            if (res.data.pay_type == 0) {
              this.order.pay_type = 4;
            }
            this.orderStatus = res.data.status;
            this.isPay = res.data.is_paid;
            this.projectList = this.formatProjectList(res.data.items_info);
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(console.log)
        .then(() => (this.showLoad = false));
    },
    toPay() {
      if (this.order.pay_type == 4) {
        window.location.href =
          "/dyyzs/weixin/pay/weixin/pay/?orderType=7&orderSeqno=" +
          this.orderSeqno;
      } else if (this.order.pay_type == 6) {
        this.$router.go(-1);
      } else {
        this.$Message.infor("请先选择支付方式！");
      }
    },
    cancelOrderConfirm() {
      this.$Message.confirm("是否要取消订单？", this.cancelOrder)
    },
    cancelOrder() {
      this.axios
        .post("/stockmng/goodsOrder/cancel", {
          order_seqno: this.orderSeqno
        })
        .then(respone => {
          var res = respone.data;
          if (res.code === 1000) {
            this.$router.go(-1);
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    classificationPro: function(goodList) {
      var proList = Array.from(
        new Set(
          goodList.map(function(item) {
            return item.provider;
          })
        )
      );
      proList.forEach(
        function(item) {
          var list = [];
          goodList.forEach(function(med) {
            if (item == med.provider) {
              list.push(med);
            }
          });

          this.providerList.push({
            provider: item,
            list: list
          });
        }.bind(this)
      );
    },
    formatProjectList(pros) {
      let ret = [];
      let arr = pros;
      if (!Array.isArray(arr)) return ret;
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].set_id !== 0) {
          if (ret.indexOf(arr[i].set_name) == -1) {
            ret.push(arr[i].set_name);
          }
        } else {
          ret.push(arr[i].name);
        }
      }
      return ret;
    }
  }
};
</script>

<style scoped>
.content {
  min-height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 2.75rem 0 0 0;
  padding-bottom: 3.75rem;
}

.payment {
  background: #ffffff;
  color: #7c7c7c;
  font-size: 1rem;
  padding: 0.78rem 0.94rem;
  display: flex;
  position: relative;
}
.payment::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  transform: scaleY(0.5) translateY(-0.5px);
  border-top: 1px solid rgba(217, 217, 217, 1);
}
.payment > span:first-child {
  flex: 1;
}
.payment > span:last-child {
  margin-left: 1rem;
  color: #eb6262;
  font-weight: bold;
}

.color-f57a76 {
  color: #f57a76;
}

.pay-type-box {
  background: #fff;
  padding: 0.5rem 0.9375rem;
  display: flex;
  /* align-items: center; */
  min-height: 48px;
  position: relative;
  font-size: 1rem;
  color: #7c7c7c;
}

.pay-type-box > span {
  line-height: 2rem;
}

.pay-radio-box {
  flex: 1;
  margin-left: 1.5rem;
  display: flex;
  flex-wrap: wrap;
}

.pay-radio-box > div {
  margin-right: 1rem;
}
</style>
