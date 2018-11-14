<template>
  <section>
  <!-- <section v-if="status=='DONE'"> -->
    <div class="bg-fff pl15 pr15 mb12">
      <div class="report">
        <div class="report-title">
          <img src="@/assets/img/report.png" class="mr12">
          <span v-if="dataList.length === 0">等待报告出炉</span>
          <span v-else-if="dataList.length > 0 && dataList.length < barCodeList.length">部分报告已出</span>
          <span v-else>全部报告已出</span>
        </div>
        <div class="report-item" v-for="(item, index) in dataList">
          <span><span style="color: #7c7c7c;">{{index + 1}}: </span>{{item.testName.length > 20 ? item.testName.slice(0, 20) + '...' : item.testName}}</span>
          <button @click="showPic(item.reportData)">查看</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import getWXSign from "@/assets/js/wx.js";
export default {
  data() {
    return {
      orderSeqno: this.$route.params.orderSeqno,
      dataList: []
    };
  },
  computed: {
    ...mapState("changeCheckOrder", {
      barCodeList: state => state.order.dyCheckOrderSpecimenInfos
    })
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      this.axios
        .post("/treatmng/dycheckorder/getCheckReport", {
          order_seqno: this.orderSeqno
        })
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            let arr = res.data;
            arr.forEach(item => {
              let childPics = [];
              if (item.reportData) {
                let childArr = JSON.parse(item.reportData);
                childArr.forEach(childItem => {
                  if (childItem.picReportUrl) {
                    childPics.push(childItem.picReportUrl);
                  }
                });
              }
              this.dataList.push({
                testName: item.testName,
                reportData: [item.picReportUrl].concat(childPics)
              });
            });
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(console.log);
    },
    showPic(pics) {
      getWXSign.apply(this).then(wx => {
        wx.previewImage({
          current: pics[0],
          urls: pics
        });
      });
    }
  }
};
</script>

<style scoped>
.report-title {
  height: 4.5rem;
  display: flex;
  align-items: center;
  position: relative;
}
.report-title::after {
  content: "";
  border-bottom: 1px solid #d9d9d9;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(0.5px) scaleY(0.5);
}
.report-title img {
  width: 2.75rem;
  height: 2.75rem;
}
.report-title span {
  font-family: PingFangSC-Medium;
  font-size: 1.125;
  color: #3f3f3f;
  letter-spacing: 0;
  font-weight: bold;
}
.report-item {
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: PingFangSC-Medium;
  font-size: 0.9375rem;
  color: #000000;
  letter-spacing: 0;
  text-align: left;
  line-height: 42px;
}

.report-item button {
  height: 2rem;
  min-width: 3.75rem;
  text-align: center;
  line-height: 2rem;
  background: #ebf8f9;
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
}
</style>