<template>
  <div>
    <info-header>支付信息</info-header>
    <div class="bg-fff pl15 pr15 mb12">
      <div class="pay_line">
        <span>订单金额</span>
        <span class="pay_money">{{money | priceFormat}}</span>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line pay_type_block">
        <div>
          <d-radio :name="'pay-type'" :id="'pay-type-yb'" :checkedVal=1 :curVal="payType"
                   @change="set_payType(1)">微信
          </d-radio>
        </div>
        <div>
          <d-radio :name="'pay-type'" :id="'pay-type-qf'" :checkedVal=0 :curVal="payType"
                   @change="set_payType(0)">欠费处理
          </d-radio>
        </div>
        <div>
          <!--<d-radio :name="'pay-type'" :id="'pay-type-yhk'" :checkedVal=5 :curVal="checkedPayType"-->
          <!--@change="checkedPayType=5">支付宝-->
          <!--</d-radio>-->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import infoHeader from "@/components/common/infoHeader";
  import dRadio from "@/components/common/dRadio";
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "newOrderPay",
    components: {
      infoHeader,
      dRadio
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState('newCheckOrder', {
        preItems: state => state.prescription.items,
        money: state => state.prescription.money,
        payType: state => state.prescription.payType
      })
    },
    watch: {
      preItems: {
        deep: true,
        handler(newVal, oldVal) {
          var allPrice=0;
          newVal.forEach(item => {
            allPrice+=Number(item.trade_price);
          })
          this.set_price(allPrice)
        }
      }
    },
    methods: {
      ...mapActions('newCheckOrder',[
        'set_price',
        'set_payType'
      ])
    }
  }
</script>

<style scoped>
  .pay_line {
    font-size: 1rem;
    color: #7C7C7C;
    padding: 0.78rem 0;
  }

  .pay_line span:nth-child(2) {
    color: #3F3F3F;
    padding-left: 1rem;
  }

  .pay_line .pay_money {
    color: #EB6262 !important;
    font-weight: bold;
  }

  .pay_type_block {
    display: flex;
  }

  .pay_type_block div {
    flex: 1;
  }
</style>
