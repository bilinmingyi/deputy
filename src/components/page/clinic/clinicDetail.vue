<template>
  <div>
    <d-header>诊所详情</d-header>
    <section class="clinic_ban">
      <img :src="clinicDetail.banner">
    </section>
    <section class="bg-fff">
      <section class="clinic_infor">
        <div class="clinic_infor_item">
          <div>诊所地址：</div>
          <div>{{clinicDetail.provinceName}}省{{clinicDetail.cityName}}市{{clinicDetail.countyName}}区{{clinicDetail.address}}</div>
        </div>
        <div class="clinic_infor_item mt5">
          <div>联系电话：</div>
          <div><a :href="'tel:'+clinicDetail.phoneNum" style="color: #111111">{{clinicDetail.phoneNum}}</a></div>
        </div>
      </section>
    </section>
    <section class="home_top">
      <!-- <router-link  class="top_item" :to="{path:'/checkListPage/newOrderPage',query:{clinicId:clinicId}}"> -->
      <div class="top_item" @click="jumpToNewOrder">
        <img src="../../../assets/img/jyld.png">
        <span>检验录单</span>
      </div>
      <!-- </router-link> -->
      <router-link class="top_item" :to="{path:`/cloudListPage/clinicCloudOrderPage/${clinicId}`, query:{name:`${clinicDetail.name}`}}">
        <img src="../../../assets/img/cfdd.png">
        <span>处方订单</span>
      </router-link>
      <router-link class="top_item" :to="{path:`/checkListPage/clinicCheckOrderPage/${clinicId}`, query:{name:`${clinicDetail.name}`}}">
        <img src="../../../assets/img/jydd.png">
        <span>检验订单</span>
      </router-link>
    </section>
    <section v-for="doc in doctorList">
      <div class="doctor_item">
        <img :src="doc.avatar" v-if="doc.avatar!='' && doc.avatar!=undefined">
        <img v-else src="../../../assets/img/ndb.png">
        <div class="doctor_infor">
          <div>
            <span class="doctor_name">{{doc.name}}</span>
            <span>{{doc.job_type_name}}</span>
          </div>
          <div>
            <span class="mr8" v-if="doc.hospital!=''">{{doc.hospital}}</span>
            <span>{{doc.department}}</span>
          </div>
        </div>
      </div>
      <hr class="full-screen-hr">
    </section>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
  import dHeader from '@/components/common/dHeader.vue'
  import dLoad from "@/components/common/dLoad";
  import { mapActions } from 'vuex'
  export default {
    name: "clinicDetail",
    props:['clinicId'],
    components: {
      dHeader,
      dLoad
    },
    data(){
      return{
        showLoad: false,
        clinicDetail:{},
        doctorList:[]
      }
    },
    created(){
      var self=this;
      this.showLoad = true;
      this.axios.all([this.getDoctorList(),this.getClinicDetail()]).then(this.axios.spread(function (acct, perms) {
        if(acct.data.code===1000){
          self.doctorList=acct.data.data;
        }else {
          self.$Message.infor("获取医生列表出错："+acct.data.msg)
        }
        if(perms.data.code===1000){
          self.clinicDetail=perms.data.data;
          }else {
          self.$Message.infor("获取医生详情出错："+perms.data.msg)
        }
      }))
        .catch(console.log)
        .then(() => this.showLoad = false);
    },
    methods:{
      ...mapActions('newCheckOrder', ['cancel_order']),
      jumpToNewOrder() {
        this.cancel_order();
        this.$router.push({path:'/checkListPage/newOrderPage',query:{clinicId:this.clinicId}})
      },
      getDoctorList(){
        var self=this;
       return self.axios.post("/weixin/sales/clinic/doctorList",{
         "clinic_id":self.clinicId
       })
      },
      getClinicDetail(){
        var self=this;
        return self.axios.post("/weixin/sales/clinic/detail",{
          "id":self.clinicId
        })
      }
    }
  }
</script>

<style scoped>
  .clinic_ban{
    margin-top: 2.75rem;
    background: #FFFFFF;
    padding: 0.75rem 0.97rem 0.625rem;
  }
  .clinic_ban img{
    width: calc( 100vw - 1.94rem);
    border-radius: 0.25rem;
  }
  .clinic_infor{
    margin: 0 0.97rem;
    width: calc(100vw - 1.94rem);
    padding: 0.625rem 0.94rem;
    background: #FAFAFA;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #7C7C7C;

  }
  .clinic_infor_item{
    display: flex;
    line-height: 1.25rem;
  }

  .clinic_infor_item div:last-child{
    flex: 1;
    color: #111111;
  }
  .home_top {
    display: flex;
    justify-content: center;
    background: #fff;
    margin-bottom: 0.75rem;
  }

  .home_top .top_item {
    flex: 1;
    padding: 1rem 0 1.125rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .home_top .top_item span {
    font-size: 0.875rem;
    color: #3F3F3F;
    padding-top: 0.625rem;
  }

  .home_top .top_item img {
    width: 2.75rem;
    height: 2.75rem;
    margin: 0 auto;
    display: inline-block;
  }

  .home_content {
    background: #ffffff;
  }

  .home_content_title {
    font-size: 0.875rem;
    color: #3F3F3F;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    align-items: center;
  }

  .home_content_title img {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.375rem;
    margin-left: 0.9375rem;
  }
  .doctor_item{
    display: flex;
    background: #FFFFFF;
    padding: 0.75rem 0.94rem;
  }
  .doctor_item img{
    margin-right: 0.75rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
  .doctor_item .doctor_infor{
    font-size: 0.875rem;
    color: #7C7C7C;
    flex: 1;
    line-height: 1.85rem;
  }
  .doctor_item .doctor_name{
    font-size: 1rem;
    font-weight: bold;
    color: #3F3F3F;
    margin-right: 0.5rem;
  }
</style>
