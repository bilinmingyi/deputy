<template>
    <div>
      <d-header>绑定手机</d-header>
      <section class="content">
        <div class="bg-fff pl15 pr15">
          <div class="info-item border">
            <input type="text" v-model="bindMobile" placeholder="请输入手机号码">
            <button class="get-code-btn">获取验证码</button>
          </div>
          <div class="info-item">
            <input type="text" v-model="msgCode" placeholder="请输入短信验证码">
          </div>
        </div>
      </section>
      <footer>
        <button>确定</button>
      </footer>
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
export default {
  components: {
    dHeader
  },
  data() {
    return {
      bindMobile: "",
      msgCode: ""
    };
  }
};
</script>

<style scoped>
.content {
  width: 100vw;
  margin-top: 2.75rem;
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
.info-item input::-webkit-input-placeholder {
  color: #999;
}
.get-code-btn {
  position: absolute;
  right: 0;
  background: #eeae1d;
  border-radius: 0.25rem;
  border: none;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #ffffff;
  letter-spacing: 0;
  min-width: 5rem;
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
