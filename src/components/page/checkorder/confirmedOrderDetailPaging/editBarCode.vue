<template>
  <div>
    <d-header>条码编辑</d-header>
    <section class="content">
      <div v-for="(item, index) in specimens">
        <info-header noBorder>{{item.name}}</info-header>
        <div class="bg-fff pl12 pr12 pb20 mb12">
          <div class="pl12 pr12 input-btn-box">
            <input type="text" placeholder="条码" v-model="item.barcode" :readonly="status!='WAITCONFIRM'">
            <button @click.stop="scanCode(index)">扫码</button>
          </div>
          <div class="pl12 pr12 pt16 counter-box">   
            <counter :min=1 v-model="item.volumn" :disable="status!='WAITCONFIRM'"></counter>
          </div>
          <div class="input-box pl12 pr12 pt16">
            <input type="text" placeholder="标本备注" v-model="item.memo" :readonly="status!='WAITCONFIRM'">
          </div>
        </div>
      </div>
    </section>
    <div class="pay_operation">
        <button @click="handleBarCode(1)">关闭</button>
        <button @click="handleBarCode(2)" v-if="status == 'WAITCONFIRM'">确认</button>
      </div>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader";
import infoHeader from "@/components/common/infoHeader";
import counter from "@/components/common/counter";
import { mapState, mapActions } from "vuex";
import getWXSign from "@/assets/js/wx";

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
      specimens: state => state.order.dyCheckOrderSpecimenInfos,
      status: state => state.order.status
    })
  },
  methods: {
    scanCode(index) {
      if (this.status != 'WAITCONFIRM') {
        return;
      }
      var self = this;
      getWXSign.apply(this).then(wx => {
        wx.scanQRCode({
          needResult: 1,
          scanType: ["qrCode", "barCode"],
          success: function(res) {
            var result = res.resultStr;
            self.$Message.infor(result.split(",")[1]);
            self.specimens[index].barcode = result.split(",")[1];
          }
        });
      });
    },
    handleBarCode(type) {
      if (type == 1) {
        this.$router.go(-1);
      } else if (type == 2) {
        let axios = this.axios;
        let barCodeInfo = this.specimens;
        let updateArr = [];
        for (let i = 0, len = barCodeInfo.length; i < len; i++) {
          if (barCodeInfo[i].barcode === "") {
            this.$Message.infor("条码不能为空");
            return;
          }
          updateArr.push(
            axios.post("/weixin/sales/dyCheckOrderSpecimens/update", {
              id: barCodeInfo[i].id,
              order_seqno: this.orderSeqno,
              volumn: barCodeInfo[i].volumn,
              barcode: barCodeInfo[i].barcode,
              memo: barCodeInfo[i].memo
            })
          );
        }
        axios.all(updateArr).then(
          axios.spread((...rest) => {
            let status = true;
            for (let i = 0, len = rest.length; i < len; i++) {
              let response = rest[i].data;
              let config = rest[i].config;
              if (response.code != 1000) {
                status = false;
                break;
              }
            }
            status && this.handleBarCode(1);
          })
        );   
      }
    }
  }
};
</script>

<style scoped>
.content {
  min-height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 2.75rem 0 0 0;
  padding-bottom: 8.75rem;
}

.content input:focus {
  outline-color: #08bac6;
}

.content input:disabled {
  background: #fff;
  color: #7c7c7c;
}

.input-btn-box {
  display: flex;
  width: 100%;
}

.input-btn-box input {
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
  flex: 1;
  min-height: 2.75rem;
  padding: 0 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-family: PingFangSC-Regular;
  font-size: 0.9375rem;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
}

.input-box input:disabled {
  background: #ededed;
  color: #7c7c7c;
}

.counter-box {
  width: calc(100% - 4rem);
}
</style>
