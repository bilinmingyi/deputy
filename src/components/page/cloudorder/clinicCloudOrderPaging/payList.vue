<template>
  <div>
    <router-link v-for="(order,index) in dataList" :key="index" :to="{path:`/cloudListPage/clinicCloudOrderPage/waitPayPage/${order.orderSeqno}`,query:{clinicId:clinicId}}">
      <div class="order_item">
        <div class="order_item_top">
          <span>{{order.doctorName}}</span>
          <span>{{order.createTime|fullTime}}</span>
        </div>
        <div class="order_item_middle">
          <span>{{order.patientName}}</span>
          <span>待付款</span>
        </div>
        <div class="order_item_bottom">
          <span>付款金额：{{order.price}}</span>
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
    props: ['clinicId'],
    data() {
      return {
        showLoad: false,
        dataList: [],
        page: 1,
        pageSize: 10,
        isCanAdd:false,
        isComplete:false
      }
    },
    created(){
      this.getData()
    },
    activated(){

    },
    methods: {
      getData(isAdd) {
        this.showLoad = true;
        this.axios.post("/weixin/sales/dyTreatOrder/list", {
          "status":'UNPAID',
          "clinic_id":this.clinicId,
          "page_size": this.pageSize,
          "page": this.page
        }).then(respone => {
          var res=respone.data,self=this;
          self.isComplete=true;
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
            this.$Message.infor(res.msg)
          }
        }).catch(console.log)
          .then(() => this.showLoad = false); 
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
