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
          <div>广东省深圳市福田区福民路196号XXX栋</div>
        </div>
        <div class="clinic_infor_item mt5">
          <div>联系电话：</div>
          <div>090088998979798989</div>
        </div>
      </section>
    </section>
    <section class="home_top">
      <div class="top_item">
        <img src="../../../assets/img/jyld.png">
        <span>检验录单</span>
      </div>
      <router-link class="top_item" to="/checkListPage">
        <img src="../../../assets/img/jy.png">
        <span>检验订单查询</span>
      </router-link>
      <router-link class="top_item" to="/cloudListPage">
        <img src="../../../assets/img/cf.png">
        <span>云处方订单查询</span>
      </router-link>
    </section>
    <section>

    </section>
  </div>
</template>

<script>
  import dHeader from '@/components/common/dHeader.vue'

  export default {
    name: "clinicDetail",
    props:['clinicId'],
    components: {
      dHeader
    },
    data(){
      return{
        clinicDetail:{},
        doctorList:[]
      }
    },
    created(){
      var self=this;
      this.axios.all([this.getDoctorList(),this.getClinicDetail()]).then(this.axios.spread(function (acct, perms) {
        console.log(acct,perms);
        if(acct.data.code===1000){
          self.doctorList=acct.data.data;
        }else {
          alert("获取医生列表出错："+acct.data.msg)
        }
        if(perms.data.code===1000){
          self.clinicDetail=perms.data.data;
        }else {
          alert("获取医生详情出错："+perms.data.msg)
        }
      }))
    },
    methods:{
      getDoctorList(){
        var self=this;
       return self.axios.post("/apis/weixin/sales/clinic/doctorList",{
         "clinic_id":self.clinicId
       })
      },
      getClinicDetail(){
        var self=this;
        return self.axios.post("/apis/weixin/sales/clinic/detail",{
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
    width: 2.25rem;
    height: 2.25rem;
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
</style>
