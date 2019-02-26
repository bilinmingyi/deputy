<template>
  <div>
    <dTime v-model="timeObj" class="search_block" @input="getData()"></dTime>
    <section class="mt191">
      <router-link
        v-for="(order,index) in dataList"
        :key="index"
        :to="{path:`/goodsOrderPage/clinicGoodsOrderPage/goodsOrderDetailPage/${order.order_seqno}`,query:{clinicId:clinicId}}"
      >
        <div class="order_item">
          <div class="order_item_top">
            <span class="font-normal">
              下单人员：
              <span class="font-bold">{{order.creator}}</span>
            </span>
            <span class="color-red font-bold">{{order.status|goodsOrderType}}</span>
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
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dTime from "@/components/common/dTimer.vue";
import dLoad from "@/components/common/dLoad";
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
  created() {},
  methods: {
    getData(isAdd) {
      this.showLoad = true;
      this.axios
        .post("/stockmng/goodsOrder/list", {
          start_time: this.timeObj.start_time,
          end_time: this.timeObj.end_time,
          clinic_id: this.clinicId,
          page_size: this.pageSize,
          page: this.page,
          // query: this.timeObj.searchData
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
.mt191 {
  margin-top: 11.9375rem;
}
.search_block {
  position: fixed !important;
  top: 5.75rem;
  background: #ffffff;
  width: 100%;
}
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
