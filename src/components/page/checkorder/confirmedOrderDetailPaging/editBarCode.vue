<template>
    <div>
      <d-header>条码编辑</d-header>
      <section class="content">
        <div v-for="item in specimens">
          <info-header noBorder>{{item.name}}</info-header>
          <div class="bg-fff pl12 pr12 pb20 mb12">
            <div class="pl12 pr12 input-btn-box">
              <input type="text" placeholder="条码" v-model="item.barcode">
              <button>扫码</button>
            </div>
            <div class="pl12 pr12 pt16 counter-box">
              <counter :min=0 v-model="item.volumn"></counter>
            </div>
            <div class="input-box pl12 pr12 pt16">
              <input type="text" placeholder="标本备注" v-model="item.memo">
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import infoHeader from "@/components/common/infoHeader";
import counter from "@/components/common/counter";
import { mapState, mapActions } from "vuex";
export default {
  props: ["orderSeqno"],
  components: {
    dHeader,
    infoHeader,
    counter
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("changeCheckOrder", {
      specimens: state => state.order.dyCheckOrderSpecimenInfos
    })
  },
  beforeRouteLeave(to, from, next) {
    let axios = this.axios;
    let barCodeInfo = this.specimens;
    let updateArr = [];
    barCodeInfo.forEach((item) => {
      updateArr.push(this.axios.post("/weixin/sales/dyCheckOrderSpecimens/update", {
        id: item.id,
        order_seqno: this.orderSeqno,
        volumn: item.volumn,
        barcode: item.barcode,
        memo: item.memo
      }))
    })
    axios.all(updateArr).then(axios.spread((...rest) => {
      let status = true;
      for (let i = 0, len = rest.length; i < len; i++) {
        let response = rest[i].data;
        let config = rest[i].config;
        if (response.code != 1000) {
          this.$Message.infor(response.msg);
          status = false;
          next(false);
          break;
        }
      }
      status && next();
    }))
  }
};
</script>

<style scoped>
.content {
  min-height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 2.75rem 0 0 0;
}
.content input:focus {
  outline-color: #08bac6;
}
.input-btn-box {
  display: flex;
  width: 100%;
}
.input-btn-box input {
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
  font-family: PingFangSC-Light;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
  flex: 1;
  min-height: 2.75rem;
  padding: 0 0.75rem;
}
.input-btn-box input::-webkit-input-placeholder,
.input-box input::-webkit-input-placeholder {
  color: #8c8c8c;
}
.input-btn-box button {
  min-width: 3.25rem;
  display: flex;
  justify-content: center;
  align-items: cneter;
  background: #08bac6;
  border-radius: 0.25rem;
  border: none;
  margin-left: 0.75rem;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
}
.input-box {
  display: flex;
}
.input-box input {
  flex: 1;
  min-height: 2.75rem;
  background: #ededed;
  border-radius: 0.25rem;
  border: none;
  padding: 0 0.875rem;
  font-family: PingFangSC-Light;
  font-size: 0.875rem;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
}
.counter-box {
  width: calc(100% - 4rem);
}
</style>
