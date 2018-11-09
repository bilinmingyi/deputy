<template>
  <div>
    <d-timer class="timer" v-model="queryTime" @input="getData"></d-timer>
    <div class="bg-fff p15 mb12">
      <table class="d-table" data-type="2">
        <tbody>
          <tr>
            <th class="width-100"><div>业绩汇总</div></th>
            <th><div>{{totalAchievement | parseNum | priceFormat}}</div></th>
          </tr>
          <tr>
            <td class="bg-medium">中药饮片</td>
            <td>{{achievementData.yp_price | parseNum | priceFormat}}</td>
          </tr>
          <tr>
            <td class="bg-medium">颗粒饮片</td>
            <td>{{achievementData.kl_price | parseNum | priceFormat}}</td>
          </tr>
          <tr>
            <td class="bg-medium">中西成药</td>
            <td>{{achievementData.western_price | parseNum | priceFormat}}</td>
          </tr>
          <tr>
            <td class="bg-medium">中药产品</td>
            <td>{{achievementData.product_price | parseNum | priceFormat}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-fff">
      <div class="achi-item" v-for="item in achievementData.dataList">
        <div class="achi-item-title">
          <span>{{item.name}}</span>
          <span>业绩<span class="color-ec6464">{{item.total_price | parseNum | priceFormat}}</span></span>
        </div>
        <div class="achi-item-content">
          <div>
            <span>{{item.yp_price | parseNum | priceFormat}}</span>
            <span>中药饮片</span>
          </div>
          <div>
            <span>{{item.kl_price | parseNum | priceFormat}}</span>
            <span>颗粒饮片</span>
          </div>
          <div>
            <span>{{item.western_price | parseNum | priceFormat}}</span>
            <span>中成西药</span>
          </div>
          <div>
            <span>{{item.product_price | parseNum | priceFormat}}</span>
            <span>中药产品</span>
          </div>
        </div>
      </div>
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
      teamId: null,
      achievementData: {
        dataList: [],
      },
      queryTime: {
        start_time: 0,
        end_time: Date.now()
      }
    };
  },
  computed: {
    totalAchievement() {
      let res = 0;
      let keys = Object.keys(this.achievementData);
      keys.forEach(item => {
        let val = this.achievementData[item];
        if (typeof val == "number") {
          res += val;
        }
      });
      return res;
    }
  },
  created() {
    this.teamId = Number(this.$route.query.teamId);
  },
  methods: {
    getData() {
      this.showLoad = true;
      let params = Object.assign({ channel_id: this.teamId }, this.queryTime);
      this.axios
        .post("/statistic/dytreat/teamStatList", params)
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.achievementData = res.data;
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
  }
};
</script>

<style scoped>
:root .timer {
  position: fixed;
  top: 5.75rem;
}
.f12 {
  font-size: 0.75rem !important;
}
.width-100 {
  width: 6.25rem;
}
.achi-item {
  padding: 0 0.9375rem;
  position: relative;
}
.achi-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(0.5);
}
.achi-item-title {
  min-height: 2.25rem;
  padding: 0.375rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: PingFangSC-Medium;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
  line-height: 1.5rem;
  font-weight: 700;
}
.achi-item-content {
  min-height: 3.5rem;
  padding: 0.25rem 0;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.5rem;
}
.achi-item-content > * {
  padding: 0.25rem 0;
  min-width: 25%;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #7c7c7c;
  letter-spacing: 0;
}
.achi-item-content > * > * {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
