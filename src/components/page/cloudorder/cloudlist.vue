<template>
  <div class="checkList">
    <d-header>云处方订单</d-header>
    <d-search @on-search="getData" placeholder="诊所名称"></d-search>
    <section class="clinicList">
      <ul>
        <li class="clinic-item" v-for="item in dataList">
          <div class="clinic-item-content">
            <img src="@/assets/img/menzhen.png">
            <div>
              <span>{{item.clinic_name}}</span><br>
              <span class="color-8c">待付款：<span class="red_a">{{item.sum}}</span></span>
            </div>
          </div>
          <router-link :to="{path:`/cloudListPage/clinicCloudOrderPage/${item.clinic_id}`, query:{name:`${item.clinic_name}`}}" class="clinic-item-btn">去处理</router-link>
        </li>
        <li class="clinic-none" v-show="dataList.length==0">暂无数据</li>
      </ul>
      <!--<div class="add_more">查看更多...</div>-->
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
  import dHeader from '@/components/common/dHeader.vue'
  import dSearch from '@/components/common/dSearch.vue'
  import dLoad from "@/components/common/dLoad";
  export default {
    name: "cloudlist",
    data:function(){
      return{
        showLoad: false,
        dataList:[]
      }
    },
    components: {
      'd-search': dSearch,
      'd-header': dHeader,
      dLoad
    },
    created(){
      this.getData();
    },
    methods:{
      getData:function (name) {
        var self=this;
        this.showLoad = true;
        self.axios.post("/weixin/sales/dyTreatOrder/num",{
          "query":name
        }).then( (respone) => {
          var res=respone.data;
          if(res.code==1000){
            this.dataList=res.data;
          }else {
            this.$Message.infor(res.msg)
          }
        }).catch(console.log).then(() => this.showLoad = false)
      }
    }
  }
</script>

<style scoped>
  .checkList >>> .block-fix {
    top: 2.75rem;
  }

  .clinicList {
    margin-top: 6rem;
    background: #FFFFFF;
  }

  .clinic-item {
    min-height: 5rem;
    width: 100vw;
    padding: 0 0.9375rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 0.9375rem;
    color: #3F3F3F;
    letter-spacing: 0;
    line-height: 1.5rem;
  }
  .clinic-item::after {
    content: '';
    border-bottom: 1px solid #d9d9d9;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scaleY(.5);
  }

  .clinic-item:nth-last-child(1)::after{
    border: none;
  }

  .clinic-item-content {
    display: flex;
    align-items: center;
  }

  .clinic-item-content img {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }

  .clinic-item-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2rem;
    min-width: 3.75rem;
    padding: 0.25rem 0.5rem;
    background: #EBF8F9;
    border: 1px solid #08BAC6;
    border-radius: 0.25rem;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgb(90, 61, 61);
    letter-spacing: 0;
  }

  .clinic-none {
    color: #7c7c7c;
    font-size: .875rem;
    background: #fafafa;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
  }

  .color-8c {
    color: #8C8C8C;
  }

  .red_a{
    color: #ec6f6f;
  }
</style>
