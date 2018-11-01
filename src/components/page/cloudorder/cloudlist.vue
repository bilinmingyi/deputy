<template>
    <div>
      <d-header>云处方订单</d-header>
      <section class="content">
        <info-bar :title="'患者详情'">
          <div>
            <span>就诊时间：</span>
            <span>{{order.time}}</span>
          </div>
          <div>
            <span>患者姓名：</span>
            <span>{{order.patientName}}</span>
          </div>
          <div>
            <span>联系电话：</span>
            <span>{{order.mobile}}</span>
          </div>
          <div>
            <span>就诊医生：</span>
            <span>{{order.doctor}}</span>
          </div>
        </info-bar>
        <info-bar :title="'配送地址'">
          <button slot="btn">选择地址</button>
        </info-bar>
      </section>
      <!-- <d-footer :activeItem="2"></d-footer> -->
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import dFooter from "@/components/common/dFooter";
import infoBar from "@/components/common/infoBar";
export default {
  components: {
    dHeader,
    dFooter,
    infoBar
  },
  data() {
    return {
      order: {
        time: '2018-12-23 22:26',
        patientName: '王尼玛',
        mobile: '13245678901',
        doctor: '李教授'
      }
    }
  }
};
</script>

<style scoped>
.content {
  height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 2.75rem 0 0 0;
}
</style>
