<template>
  <div>
    <d-header>订单详情</d-header>
    <section class="content">
      <info-bar :title="'患者详情'">
        <div>
          <span>就诊时间：</span>
          <span>{{order.time}}</span>
        </div>
        <div>
          <span>患者姓名：</span>
          <span>{{order.patientName}}</span>
        </div>
        <div>
          <span>联系电话：</span>
          <span>{{order.mobile}}</span>
        </div>
        <div>
          <span>就诊医生：</span>
          <span>{{order.doctor}}</span>
        </div>
      </info-bar>
      <info-bar :title="'配送地址'">
        <button slot="btn">选择地址</button>
        <div>
          <span>联系人名：</span>
          <span>{{order.time}}</span>
        </div>
        <div>
          <span>联系电话：</span>
          <span>{{order.patientName}}</span>
        </div>
        <div>
          <span>详细地址：</span>
          <span>{{order.mobile}}</span>
        </div>
        <div>
          <span>配送金额：</span>
          <span style="color: red">￥12</span>
        </div>
      </info-bar>
      <info-header>处方信息</info-header>
      <div class="bg-fff p16 mb12">
        <table class="d-table" data-type="1">
          <tbody>
          <tr>
            <th>处方类型</th>
            <th>发药类型</th>
            <th>金额</th>
          </tr>
          <tr>
            <td>中药饮片</td>
            <td>云药房</td>
            <td>123</td>
          </tr>
          <tr>
            <td>颗粒饮片</td>
            <td>本机构</td>
            <td>456</td>
          </tr>
          <tr>
            <td>附加服务</td>
            <td>云药房</td>
            <td>789</td>
          </tr>
          <tr>
            <td>中药饮片</td>
            <td>本机构</td>
            <td>012</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="payment">
        <span>付款金额</span>
        <span>￥6666</span>
      </div>
      <div class="pay_operation">
        <button>关闭</button>
        <button>取消订单</button>
        <button>去支付</button>
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
export default {
  components: {
    dHeader,
    infoHeader,
    infoBar,
    dLoad
  },
  // props: ["clinicId", "orderSeqno"],
  data() {
    return {
      clinicId: this.$route.params.clinicId,
      orderSeqno: this.$route.params.orderSeqno,
      showLoad: false,
      order: {
        time: "2018-12-23 22:26",
        patientName: "王尼玛",
        mobile: "13245678901",
        doctor: "李教授"
      }
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      this.axios
        .post("/weixin/sales/dyTreatOrder/detail", {
          order_seqno: this.orderSeqno,
          clinic_id: this.clinicId
        })
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.set_order(res.data);
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(console.log);
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
