<template>
  <div>
    <router-link v-for="(order,index) in dataList" :key="index" :to="`/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/${order.id}`">
      <div class="order_item">
        <div class="order_item_top">
          <span>{{order.doctor_name}}</span>
          <span>{{order.create_time|fullTime}}</span>
        </div>
        <div class="order_item_middle">
          <span>{{order.patient_name}}</span>
          <span>待确认</span>
        </div>
        <div class="order_item_bottom">
          <span>付款金额：{{order.trade_price}}</span>
        </div>
        <hr class="full-screen-hr">
      </div>
    </router-link>
    <div class="add_more" v-if="isCanAdd" @click.stop="addMore()">查看更多...</div>
  </div>
</template>

<script>
  export default {
    name: "confirmedList",
    data() {
      return {
        dataList: [],
        page: 1,
        pageSize: 10,
        isCanAdd:false
      }
    },
    activated(){
      this.getData()
    },
    methods: {
      getData(isAdd) {
        this.axios.post("/apis/weixin/sales/dyCheckOrder/list", {
          "status": "WAITCONFIRM",
          "page_size": this.pageSize,
          "page": this.page
        }).then(respone => {
          var res=respone.data,self=this;
          if(res.code===1000){
            this.isCanAdd=Math.ceil(res.total_num/this.pageSize)>this.page?true:false;
            if(isAdd){
              res.data.forEach(function (item) {
                self.dataList.push(item);
              })
            }else {
              this.dataList=res.data;
            }
          }else {
            alert(res.msg)
          }
        })
      },
      addMore(){
        this.page++;
        this.getData(true);
      }
    }
  }
</script>

<style scoped>

</style>
