<template>
  <div>
    <dTime v-model="timeObj" class="search_block" @input="getData()"></dTime>
    <section class="mt188">
      <router-link v-for="(order,index) in dataList" :key="index" :to="`/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/${order.id}`">
        <div class="order_item">
          <div class="order_item_top">
            <span>{{order.doctorName}}</span>
            <span>{{order.createTime|fullTime}}</span>
          </div>
          <div class="order_item_middle">
            <span>{{order.patientName}}</span>
            <span>{{order.status|treatOrdeType}}</span>
          </div>
          <div class="order_item_bottom">
            <span>付款金额：{{order.tradePrice}}</span>
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
  import dTime from "@/components/common/dTimer.vue"
  import dLoad from "@/components/common/dLoad";
  export default {
    props: ['clinicId'],
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
      }
    },
    created(){

    },
    methods: {
      getData(isAdd) {
        this.showLoad = true;
        this.axios.post("/apis/weixin/sales/dyTreatOrder/list", {
          "start_time": this.timeObj.start_time,
          "end_time": this.timeObj.end_time,
          "clinic_id": this.clinicId,
          "page_size": this.pageSize,
          "page": this.page
        }).then(respone => {
          var res = respone.data, self = this;
          self.isComplete = true;
          if (res.code === 1000) {
            this.isCanAdd = Math.ceil(res.total_num / this.pageSize) > this.page ? true : false;
            if (isAdd) {
              res.data.forEach(function (item) {
                self.dataList.push(item);
              })
            } else {
              this.dataList = res.data;
            }
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(console.log)
          .then(() => this.showLoad = false);
      },

      addMore() {
        this.page++;
        this.getData(true);
      }
    }
  }
</script>

<style scoped>
  .search_block {
    position: fixed !important;
    top: 5.75rem;
    background: #FFFFFF;
    width: 100%;
  }
</style>
