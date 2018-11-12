<template>
  <div>
    <info-header>支付信息</info-header>
    <div class="bg-fff pl15 pr15 mb12">
      <div class="pay_line">
        <span>订单金额</span>
        <span class="pay_money">{{orderPrice | priceFormat}}</span>
      </div>

      <section v-if="isPay===1">
        <hr class="full-screen-hr">
        <div class="pay_line">
          <span>支付方式</span>
          <span>微信</span>
        </div>
      </section>

      <section v-if="isPay===0">
        <hr class="full-screen-hr">
        <div class="pay_line pay_type_block">
          <div>
            <d-radio :name="'pay-type'" :id="'pay-type-yb'" :checkedVal=1 :curVal="checkedPayType"
                     @change="set_payType(1)">微信
            </d-radio>
          </div>
          <div>
            <d-radio :name="'pay-type'" :id="'pay-type-qf'" :checkedVal=0  :curVal="checkedPayType"
                     @change="set_payType(0)">欠费处理
            </d-radio>
          </div>
          <div></div>
        </div>
      </section>
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

    };
  },
  created() {
    this.set_payType(this.checkedPayType);
  },
  computed: {
    ...mapState("changeCheckOrder", {
      projectList: state => state.order.items_info,
      isPay: state => state.order.is_paid,
      checkedPayType: state => state.order.pay_type
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
