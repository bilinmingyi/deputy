<template>
    <div>
      <d-header>绑定手机</d-header>
      <section class="content">
        <div class="bg-fff pl15 pr15">
          <div class="info-item">
            <input type="text" v-model="imgCode" placeholder="请输入图片验证码">
            <img :src="imgCodeUrl" class="img-code" @click="getImgCode">
          </div>
          <div class="info-item border">
            <input type="text" v-model="bindMobile" placeholder="请输入手机号码">
            <button class="get-code-btn bg-c5" @click="getMsgCode" v-if="sendMsgDisabled">{{time+'秒后获取'}}</button>
            <button class="get-code-btn" @click="getMsgCode" v-else>获取验证码</button>
          </div>
          <div class="info-item">
            <input type="text" v-model="msgCode" placeholder="请输入手机验证码">
          </div>
        </div>
      </section>
      <footer>
        <button @click="checkCode">确定</button>
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
      imgCode: "",
      imgCodeUrl: "",
      token: "",
      bindMobile: "",
      msgCode: "",
      time: 10,
      sendMsgDisabled: false
    };
  },
  created() {
    this.getImgCode();
  },
  methods: {
    getImgCode() {
      this.axios
        .post("/weixin/sales/checkImgCode", {})
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.imgCodeUrl = res.data.img_data;
            this.token = res.data.token;
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMsgCode() {
      if (this.imgCode == "") {
        this.$Message.infor("请先输入图片验证码");
        return;
      }
      if (this.bindMobile == "") {
        this.$Message.infor("请输入手机号");
        return;
      }
      this.axios({
        url: "/weixin/sales/sendChkcode",
        method: "post",
        data: {
          mobile: this.bindMobile,
          imgCode: this.imgCode,
          token: this.token
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.sendMsgDisabled = true;
            let interval = window.setInterval(() => {
              if (this.time-- <= 0) {
                this.time = 60;
                this.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkCode() {
      this.axios
        .post("/weixin/sales/mobile/update", {
          mobile: this.bindMobile,
          code: this.msgCode
        })
        .then(response => {
          let res = response.data;
          if (res.code == 1000) {
            this.$Message.infor("绑定成功");
            this.$router.push("/personal/changeInfor");
          } else {
            if (res.code == 100002) {
              this.$Message.infor('手机验证码错误');
              return;
            }
            this.$Message.infor(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
  flex: 1;
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
.img-code {
  /* margin: -0.5rem 0;
  height: 2.5rem; */
  width: 5rem;
}
.get-code-btn {
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
.bg-c5 {
  background: #c5c5c5;
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
