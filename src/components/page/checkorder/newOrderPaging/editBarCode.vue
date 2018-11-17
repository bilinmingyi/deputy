<template>
  <div>
    <d-header>条码编辑</d-header>
    <section class="content">
      <div v-for="(contain,index) in contains">
        <info-header noBorder>{{contain.name}}</info-header>
        <div class="bg-fff pl12 pr12 pb20 mb12">
          <div class="pl12 pr12 input-btn-box">
            <input type="text" placeholder="条码" v-model="contain.barCode">
            <button @click.stop="scanCode(index)">扫码</button>
          </div>
          <div class="pl12 pr12 pt16 counter-box">
            <counter :min=1 v-model="contain.num"></counter>
          </div>
          <div class="input-box pl12 pr12 pt16">
            <input type="text" placeholder="标本备注" v-model="contain.memo">
          </div>
        </div>
      </div>
    </section>
    <section class="pay_operation">
      <button @click.stop="$router.go(-1)">关闭</button>
      <button @click.stop="sureChange">确认</button>
    </section>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader";
  import infoHeader from "@/components/common/infoHeader";
  import counter from "@/components/common/counter";
  import getWXSign from '@/assets/js/wx'
  import {mapState, mapActions} from 'vuex'


  export default {
    components: {
      dHeader,
      infoHeader,
      counter
    },
    created() {

    },
    data() {
      return {

      };
    },
    computed: {
      ...mapState('newCheckOrder', {
        contains: state => JSON.parse(JSON.stringify(state.prescription.contains))
      })
    },
    methods: {
      ...mapActions('newCheckOrder', [
        'set_contain'
      ]),
      scanCode(index) {
        var self = this;



        getWXSign.apply(this).then(wx => {
          wx.scanQRCode({
            needResult: 1,
            scanType: ["qrCode", "barCode"],
            success: function (res) {
              var result = res.resultStr;
              self.contains[index].barCode = result.split(',')[1];
              self.$forceUpdate();
            }
          })
        });
      },
      sureChange() {
        try{
          this.contains.forEach(item => {
            if(item.barCode===""){
              throw new Error("条码不能为空");
            }
          });
        }catch (e) {
          this.$Message.infor(e.message)
          return
        }

        this.set_contain(this.contains);
        this.$router.go(-1)
      }
    }
  };
</script>

<style scoped>
  .content {
    min-height: calc(100vh - 2.75rem);
    width: 100vw;
    margin-top: 2.75rem;
    padding-bottom: 8.75rem;
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
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #3f3f3f;
    letter-spacing: 0;
    text-align: left;
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
    align-items: center;
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

  .counter-box {
    width: calc(100% - 4rem);
  }
</style>
