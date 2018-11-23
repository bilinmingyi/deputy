<template>
  <div>
    <d-header>报告详情</d-header>
    <div class="content">
      <info-header>
        {{order.patient_name}}<span class="color-7c7c7c"> ({{order.patient_sex | sexFormat}} {{order.patient_age}}岁)</span>
      </info-header>
      <div class="report-item pl15 pr15 bg-fff">
        <span>检查结果</span>
        <button @click="showPic" v-if="report.report_imgs.length > 0">查看报告</button>
      </div>
      <div class="p15 bg-fff">
        <table class="d-table h36" data-type="2">
              <tbody>
                <tr>
                  <th><div>指标项</div></th>
                  <th><div>代码</div></th>
                  <th><div>检测值</div></th>
                  <th><div>参考值</div></th>
                </tr>
                <tr v-for="item in report.report_detail" :class="[{'trend': item.trend !== ''}]">
                  <td>{{item.testName}}</td>
                  <td>{{item.testShortName}}</td>
                  <td>{{item.result}}{{item.trend}}</td>
                  <td>{{item.reference}}</td>
                </tr>
              </tbody>
            </table>
      </div>
    </div>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader.vue";
import infoHeader from "@/components/common/infoHeader";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {
    dHeader,
    infoHeader,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("changeCheckOrder", {
      order: state => state.order,
      report: state => state.report
    })
  },
  methods: {
    showPic() {
      WeixinJSBridge.invoke('imagePreview', {
        'current': report.report_imgs[0],
        'urls': report.report_imgs
      })
    }
  }
};
</script>

<style scoped>
.content {
  min-height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 2.75rem 0 0 0;
}
.color-7c7c7c {
  color: #7c7c7c;
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
  position: relative;
}

.report-item::after {
  content: "";
  border-bottom: 1px solid #d9d9d9;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(0.5px) scaleY(0.5);
}

.report-item > span {
  flex: 1;
  line-height: 3.5rem;
  font-size: 1rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(63,63,63,1);
}

.report-item button,
.report-title button {
  height: 2rem;
  min-width: 3.75rem;
  text-align: center;
  line-height: 2rem;
  background: #ebf8f9;
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
}

:root .d-table tr td {
  height: 3.5rem;
  padding: 0.375rem;
  line-height: 1.5rem;
}

.trend td {
  color: #EB6262;
}
</style>