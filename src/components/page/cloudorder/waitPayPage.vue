<template>
  <div>
    <d-header>订单详情</d-header>
    <section class="content">
      <info-bar :title="'患者详情'">
        <div>
          <span>就诊时间：</span>
          <span v-if="order.create_time!=undefined">{{order.create_time|fullTime}}</span>
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
      <info-header>处方信息</info-header>
      <div class="bg-fff p16 mb12">
        <table class="d-table" data-type="1">
          <tbody>
          <tr>
            <th>处方类型</th>
            <th>发药类型</th>
            <th>金额</th>
          </tr>
          <tr v-for="recipe in order.recipe_list">
            <td>{{recipe.recipe_type|treatOrderType}}处方</td>
            <td>
              <span v-if="recipe.is_cloud==1">云药房</span>
              <span v-else>本机构</span>
            </td>
            <td>￥{{recipe.price}}</td>
          </tr>

          </tbody>
        </table>
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
  import dHeader from "@/components/common/dHeader.vue"
  import infoBar from "@/components/common/infoBar";
  import infoHeader from "@/components/common/infoHeader";
  import dLoad from "@/components/common/dLoad";

  export default {
    name: "waitPayPage",
    props: ['orderSeqno'],
    data() {
      return {
        showLoad: false,
        clinicId: this.$route.query.clinicId,
        order: {},
      }
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
        vm.getData();
      });
    },
    components: {
      dHeader,
      infoHeader,
      infoBar,
      dLoad
    },
    created() {

    },
    methods: {
      getData() {
        this.showLoad = true;
        this.axios.post("/weixin/sales/dyTreatOrder/detail", {
          'order_seqno': this.orderSeqno,
          'clinic_id': this.clinicId
        }).then(respone => {
          var res = respone.data;
          if (res.code === 1000) {
            this.order = res.data;
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(console.log).then(() => this.showLoad = false)
      },
      toPay() {
        window.location.href = '/dyyzs/weixin/pay/?orderType=5&orderSeqno=' + this.orderSeqno;
      },
      cancelOrder() {
        this.axios.post("/treatmng/dytreatorder/cancel", {
          order_seqno: this.orderSeqno
        }).then(respone => {
          var res = respone.data;
          if (res.code === 1000) {
            this.$router.go(-1);
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
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
    background: #FFFFFF;
    color: #7C7C7C;
    font-size: 1rem;
    padding: 0.78rem 0.94rem;
    margin-bottom: 4.25rem;
  }

  .payment span:last-child {
    margin-left: 1rem;
    color: #EB6262;
    font-weight: bold;
  }


</style>
