<template>
  <div class="checkList">
    <d-header>云处方订单</d-header>
    <d-search @on-search="getData"></d-search>
    <section class="clinicList">
      <div class="bg-fff p15">
        <table class="d-table" data-type="2">
          <tbody>
          <tr>
            <th><div>诊所名称</div></th>
            <th><div>待付款</div></th>
            <th><div>操作</div></th>
          </tr>
          <tr v-for="item in dataList">
            <td>{{item.clinic_name}}</td>
            <td>{{item.sum}}</td>
            <td>
              <router-link :to="{path:`/cloudListPage/clinicCloudOrderPage/${item.clinic_id}`, query:{name:`${item.clinic_name}`}}" class="red_a">去处理</router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--<div class="add_more">查看更多...</div>-->
    </section>
  </div>
</template>

<script>
  import dHeader from '@/components/common/dHeader.vue'
  import dSearch from '@/components/common/dSearch.vue'
  export default {
    name: "cloudlist",
    data:function(){
      return{
        dataList:[]
      }
    },
    components: {
      'd-search': dSearch,
      'd-header': dHeader
    },
    created(){
      this.getData();
    },
    methods:{
      getData:function (name) {
        var self=this;
        self.axios.post("/apis/weixin/sales/dyTreatOrder/num",{
          "query":name
        }).then( (respone) => {
          var res=respone.data;
          if(res.code==1000){
            this.dataList=res.data;
          }else {
            alert(res.msg)
          }
        }).catch((error) =>{
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .checkList >>> .block-fix {
    top: 2.75rem;
  }

  .clinicList {
    margin-top: 5.75rem;
    background: #FFFFFF;
  }
  .red_a{
    color: red;
  }
</style>
