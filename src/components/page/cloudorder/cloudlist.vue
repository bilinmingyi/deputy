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
            <th><div>待确认</div></th>
            <th><div>操作</div></th>
          </tr>
          <tr v-for="item in dataList">
            <td>深圳淳道门诊</td>
            <td>8</td>
            <td>
              <router-link :to="{path:`/cloudListPage/clinicCloudOrderPage/${item.id}`, query:{name:`${item.name}`}}" class="red_a">去处理</router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="add_more">查看更多...</div>
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
        dataList:[
          {name:"深圳淳道",id:1,wait:1},
          {name:"深圳淳道",id:2,wait:2},
          {name:"深圳淳道",id:3,wait:3},
          {name:"深圳淳道",id:4,wait:4},
          {name:"深圳淳道",id:5,wait:5},
          {name:"深圳淳道",id:6,wait:6},
          {name:"深圳淳道",id:7,wait:7},
          {name:"深圳淳道",id:8,wait:8},
          {name:"深圳淳道",id:9,wait:9},
          {name:"深圳淳道",id:0,wait:0}
        ]
      }
    },
    components: {
      'd-search': dSearch,
      'd-header': dHeader
    },
    methods:{
      getData:function (name) {
        console.log(name)
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
