<template>
  <div>
    <dTime v-model="timeObj" class="search_block" @input="getData()"></dTime>
    <section class="mt188 mb50">
        <div class="order_item" v-for="(order,index) in dataList" @click="jumpToDetail(order.order_seqno)">
          <div class="order_item_top">
            <span>{{order.doctor_name}}</span>
            <span>{{order.create_time|fullTime}}</span>
          </div>
          <div class="order_item_middle">
            <span>{{order.patient_name}}</span>
            <span>{{order.status|checkOrderType}}</span>
          </div>
          <div class="order_item_bottom">
            <span>付款金额：{{order.trade_price}}</span>
          </div>
          <hr class="full-screen-hr">
        </div>
      <div class="add_more" v-show="isComplete && dataList.length==0">暂无数据</div>
      <div class="add_more" v-if="isCanAdd" @click.stop="addMore()">查看更多...</div>
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dTime from "@/components/common/dTimer.vue";
import dLoad from "@/components/common/dLoad";
import { mapActions } from "vuex";
export default {
  props: ["clinicId"],
  components: {
    dTime,
    dLoad
  },
  data() {
    return {
      showLoad: false,
      dataList: [],
      page: 1,
      pageSize: 10,
      isCanAdd: false,
      timeObj: {},
      isComplete: false
    };
  },
  methods: {
    ...mapActions("changeCheckOrder", ["reset_order"]),
    jumpToDetail(url) {
      this.reset_order();
      this.$router.push(`/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/${url}`)
    },
    getData(isAdd) {
      this.showLoad = true;
      this.axios
        .post("/weixin/sales/dyCheckOrder/list", {
          start_time: this.timeObj.start_time,
          end_time: this.timeObj.end_time,
          clinic_id: this.clinicId,
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
.search_block {
  position: fixed !important;
  top: 5.75rem;
  background: #ffffff;
  width: 100%;
}

.order_item {
  background: #ffffff;
  font-size: 0.94rem;
  color: #7c7c7c;
}

.order_item_top {
  color: #3f3f3f;
  display: flex;
  padding: 0.625rem 0.94rem 0.25rem;
}

.order_item_top span:first-child {
  flex: 1;
  font-weight: bold;
}

.order_item_top span:last-child {
  font-size: 0.875rem;
}

.order_item_middle {
  display: flex;
  padding: 0 0.94rem 0.25rem;
}

.order_item_middle span:first-child {
  flex: 1;
}

.order_item_middle span:last-child {
  color: #eb6262;
}

.order_item_bottom {
  padding: 0 0.94rem 0.625rem;
}
</style>
