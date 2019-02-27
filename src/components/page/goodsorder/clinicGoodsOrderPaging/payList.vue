<template>
  <div>
    <router-link
      v-for="(order,index) in dataList"
      :key="index"
      :to="{path:`/goodsOrderPage/clinicGoodsOrderPage/goodsOrderDetailPage/${order.order_seqno}`,query:{clinicId:clinicId}}"
    >
      <div class="order_item">
        <!-- <div class="order_item_top">
          <span>下单人员：{{order.creator}}</span>
          <span>{{order.create_time|dateFormat('yy/MM/dd hh:mm')}}</span>
        </div>-->
        <div class="order_item_top">
          <span class="font-normal">下单人员：
            <span class="font-bold">{{order.creator}}</span>
          </span>
          <span class="color-red font-bold">待付款</span>
        </div>
        <div class="order_item_bottom">
          <span>金额：{{order.price}}</span>
          <span>{{order.create_time|dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
        </div>
        <hr class="full-screen-hr">
      </div>
    </router-link>
    <div class="add_more" v-show="isComplete && dataList.length==0">暂无数据</div>
    <div class="add_more" v-if="isCanAdd" @click.stop="addMore()">查看更多...</div>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dLoad from "@/components/common/dLoad";
export default {
  components: {
    dLoad
  },
  props: ["clinicId"],
  data() {
    return {
      showLoad: false,
      dataList: [],
      page: 1,
      pageSize: 10,
      isCanAdd: false,
      isComplete: false
    };
  },
  created() {
    this.getData();
  },
  activated() {},
  methods: {
    getData(isAdd) {
      this.showLoad = true;
      this.axios
        .post("/weixin/sales/dyGoodsOrder/list", {
          status: "UNPAID",
          clinic_id: Number(this.clinicId),
          page_size: this.pageSize,
          page: this.page
        })
        .then(respone => {
          var res = respone.data,
            self = this;
          self.isComplete = true;
          if (res.code === 1000) {
            this.isCanAdd =
              Math.ceil(res.total_num / this.pageSize) > this.page
                ? true
                : false;
            if (isAdd) {
              res.data.forEach(function(item) {
                self.dataList.push(item);
              });
            } else {
              this.dataList = res.data;
            }
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(console.log)
        .then(() => (this.showLoad = false));
    },
    addMore() {
      this.page++;
      this.getData(true);
    }
  }
};
</script>

<style scoped>
.order_item .font-normal {
  font-weight: normal;
}
.order_item .font-bold {
  font-weight: bold;
}

.order_item .color-red {
  font-size: 0.9375rem;
  color: #EB6262;
}
</style>
