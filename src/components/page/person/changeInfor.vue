<template>
    <div>
      <d-header>个人资料</d-header>
      <section class="content">
        <info-header>基本信息</info-header>
        <div class="bg-fff pl15 pr15">
          <div class="info-item border">
            <span>姓名</span>
            <input type="text" v-model="infoName">
          </div>
          <div class="info-item border">
            <span>年龄</span>
            <input type="text" v-model="infoYear" class="width-30">
            <span class="mr28">岁</span>
            <input type="text" v-model="infoMonth" class="width-30">
            <span class="mr28">月</span>
          </div>
          <div class="info-item border">
            <span>性别</span>
            <span>
              <radio-group :name="'sex'" :data="sexType" v-model="infoSex"></radio-group>
            </span>
          </div>
          <div class="info-item">
            <span>电话</span>
            <span>{{infoMobile}}</span>
            <router-link to="/personal/changePhone" class="change-mobile-btn">
              修改
            </router-link>
          </div>
        </div>
      </section>
      <footer>
        <button>保存</button>
      </footer>
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import infoHeader from "@/components/common/infoHeader";
import radioGroup from "@/components/common/radioGroup";
export default {
  components: {
    dHeader,
    infoHeader,
    radioGroup
  },
  data() {
    return {
      infoName: "李老板",
      infoYear: 20,
      infoMonth: 9,
      infoSex: 1,
      infoMobile: "13245678901",
      sexType: [
        {
          id: "sex-male",
          value: 1,
          label: "男"
        },
        {
          id: "sex-female",
          value: 2,
          label: "女"
        }
      ]
    };
  }
};
</script>

<style scoped>
.content {
  width: 100vw;
  margin-top: 2.75rem;
  margin-bottom: 3.5rem;
}
.info-item {
  min-height: 3rem;
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
  position: relative;
}
.info-item.border::after {
  content: "";
  border-bottom: 1px solid #d9d9d9;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(0.5px) scaleY(0.5);
}
.info-item > span {
  line-height: 1.5rem;
}
.info-item > span:nth-child(1) {
  margin-right: 1.44rem;
}
.info-item input {
  border: none;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
}
.info-item input:focus {
  outline-color: transparent;
}
.width-30 {
  width: 2rem;
}
.change-mobile-btn {
  position: absolute;
  right: 0;
  background: #eeae1d;
  border-radius: 0.25rem;
  border: none;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #ffffff;
  letter-spacing: 0;
  min-width: 3.75rem;
  min-height: 2rem;
  line-height: 1.25rem;
  padding: 0.375rem 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3.5rem;
  background: #fff;
  padding: 0.5rem 0.9375rem;
  display: flex;
}
footer button {
  flex: 1;
  border: none;
  background: #08bac6;
  border-radius: 0.25rem;
  font-family: PingFangSC-Regular;
  font-size: 0.9375rem;
  color: #fff;
  letter-spacing: 0;
}
</style>
