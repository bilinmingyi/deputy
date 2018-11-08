<template>
  <div>
    <info-header>
      条码信息
      <button slot="btn" @click="$router.push({ path: `/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/${orderSeqno}/editBarCode` })">编辑条码</button>
    </info-header>
    <div class="barcode-box p15 mb12">
      <ul>
        <li v-for="item in barCodeList">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import infoHeader from "@/components/common/infoHeader";
import { mapState, mapActions } from 'vuex';
export default {
  name: "newOrderCode",
  components: {
    infoHeader
  },
  computed: {
    ...mapState("changeCheckOrder", {
      orderSeqno: state => state.order.order_seqno,
      barCodeList: state => state.order.dyCheckOrderSpecimenInfos
    })
  }
};
</script>

<style scoped>
.barcode-box {
  background: #fff;
}
.barcode-box ul {
  display: flex;
  flex-wrap: wrap;
}
.barcode-box ul li {
  min-height: 2.75rem;
  min-width: 100%;
  padding: 0 0.5rem;
  margin-bottom: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  flex: 1;
  background: #fff;
  border: 1px solid #08bac6;
  border-radius: 0.25rem;
}
.barcode-box ul li:nth-last-child(1) {
  margin-bottom: 0;
}
</style>
