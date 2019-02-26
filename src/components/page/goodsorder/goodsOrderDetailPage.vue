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
          <span>详细地址：</span>
          <span>{{order.address}}</span>
        </div>
        <div>
          <span>配送金额：</span>
          <span style="color: red">￥{{order.deliver_price}}</span>
        </div>
      </info-bar>
      <div v-for="item in providerList" class="bg-ff mb12">
        <info-header>{{item.provider}}</info-header>
        <div class="mt16 mb16 ml15 mr15">
          <touch-list :canDelete="false" :data="item.list">
            <div slot-scope="{prop, index}">
              <span>{{index}}</span>
              <span>{{prop.name}}</span>
            </div>
          </touch-list>
        </div>
      </div>
      <div class="payment">
        <span>付款金额</span>
        <span>￥{{order.price}}</span>
      </div>
      <div class="pay_operation">
        <button @click.stop="$router.go(-1)">关闭</button>
        <button v-if="order.status==='UNPAID'" @click.stop="cancelOrder()">取消订单</button>
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

export default {
  props: ["orderSeqno"],
  components: {
    dHeader,
    infoHeader,
    infoBar,
    dLoad,
    touchList
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
        .post("/stockmng/goodsOrder/detail", {
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
      window.location.href =
        "/dyyzs/weixin/pay//weixin/pay/?orderType=4&orderSeqno=" +
        this.orderSeqno;
    },
    cancelOrder() {
      this.axios
        .post("/treatmng/dytreatorder/cancel", {
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
      console.log(this.providerList);
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
  padding-bottom: 8.75rem;
}

.payment {
  background: #ffffff;
  color: #7c7c7c;
  font-size: 1rem;
  padding: 0.78rem 0.94rem;
  margin-bottom: 4.25rem;
}

.payment span:last-child {
  margin-left: 1rem;
  color: #eb6262;
  font-weight: bold;
}
</style>
