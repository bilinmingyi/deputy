<template>
  <div>
    <d-timer class="timer" v-model="queryTime" @input="getData"></d-timer>
    <div class="content-title pl15 pr15">
      <span class="mr8">业绩总汇</span><span class="color-ec6464">{{totalAchievement | priceFormat}}</span>
    </div>
    <div class="bg-fff pl15 pr15 pb12 mb12">
      <table class="d-table" data-type="2">
        <tbody>
          <tr>
            <th class="width-80"><div>序号</div></th>
            <th><div>诊所名称</div></th>
            <th><div>业绩</div></th>
          </tr>
          <tr v-for="(item, index) in dataList">
            <td class="bg-medium">{{index + 1}}</td>
            <td class="f12">{{item.clinic_name}}</td>
            <td>{{item.price | priceFormat}}</td>
          </tr>
          <tr v-if="dataList.length === 0">
            <td colspan="3">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dTimer from "@/components/common/dTimer";
import dLoad from "@/components/common/dLoad";
export default {
  components: {
    dTimer,
    dLoad
  },
  data() {
    return {
      showLoad: false,
      salesId: null,
      dataList: [],
      queryTime: {
        start_time: 0,
        end_time: Date.now()
      }
    };
  },
  computed: {
    totalAchievement() {
      let res = 0;
      this.dataList.forEach((item) => {
        res += item.price;
      })
      return res;
    }
  },
  created() {
    this.salesId = Number(this.$route.query.salesId); 
  },
  methods: {
    getData() {
      this.showLoad = true;
      let params = Object.assign({ sales_id: this.salesId }, this.queryTime);
      this.axios
        .post("/apis/statistic/dycheck/personalGradeStat", params)
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.dataList = res.data;
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.showLoad = false;
        })
    }
  },
};
</script>

<style scoped>
:root .timer {
  position: fixed;
  top: 5.75rem;
}
.content-title {
  background: #fff;
  min-height: 2.75rem;
  font-family: PingFangSC-Medium;
  font-size: 1rem;
  line-height: 3rem;
  font-weight: 700;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
}
.width-80 {
  width: 5rem;
}
.f12 {
  font-size: 0.75rem !important;
}
</style>
