<template>
  <div>
    <info-header>支付信息</info-header>
    <div class="bg-fff pl15 pr15 mb12">
      <div class="pay_line">
        <span>订单金额</span>
        <span class="pay_money">{{orderPrice | priceFormat}}</span>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line">
        <span>支付方式</span>
        <span>微信</span>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line pay_type_block">
        <div>
          <d-radio :name="'pay-type'" :id="'pay-type-yb'" :checkedVal=4 :curVal="checkedPayType"
                   @change="checkedPayType=4">微信
          </d-radio>
        </div>
        <!-- <div>
          <d-radio :name="'pay-type'" :id="'pay-type-yhk'" :checkedVal=5 :curVal="checkedPayType"
                   @change="checkedPayType=5">支付宝
          </d-radio>
        </div> -->
        <div>
          <d-radio :name="'pay-type'" :id="'pay-type-qf'" :checkedVal=6 :curVal="checkedPayType"
                   @change="checkedPayType=6">欠费处理
          </d-radio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoHeader from "@/components/common/infoHeader";
import dRadio from "@/components/common/dRadio";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "newOrderPay",
  components: {
    infoHeader,
    dRadio
  },
  data() {
    return {
      checkedPayType: -1
    };
  },
  created() {
    this.set_payType(this.checkedPayType);
  },
  watch: {
    checkedPayType(newVal) {
      this.set_payType(newVal);
    }
  },
  computed: {
    ...mapState("changeCheckOrder", {
      projectList: state => state.order.items_info
    }),
    ...mapGetters("changeCheckOrder", ["orderPrice"]),
    // payType() {
    //   this.set_payType(this.checkedPayType);
    //   return this.checkedPayType;
    // }
  },
  methods: {
    ...mapActions("changeCheckOrder", ["set_payType"])
  }
};
</script>

<style scoped>
.pay_line {
  font-size: 1rem;
  color: #7c7c7c;
  padding: 0.78rem 0;
}

.pay_line span:nth-child(2) {
  color: #3f3f3f;
  padding-left: 1rem;
}

.pay_line .pay_money {
  color: #eb6262 !important;
  font-weight: bold;
}

.pay_type_block {
  display: flex;
}

.pay_type_block div {
  flex: 1;
}
</style>
