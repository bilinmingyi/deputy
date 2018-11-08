<template>
  <div>
    <info-header>
      检验项目
      <button slot="btn" @click="$router.push({ path: `/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/${orderSeqno}/addNewProject` })">添加项目</button>
    </info-header>
    <div class="bg-fff p15 mb12">
      <touch-list :data="touchListData" @delete="deleteProject">
        <div slot-scope="{prop}">
          <span>{{prop.name}}</span>
        </div>
      </touch-list>
    </div>
  </div>
</template>

<script>
import infoHeader from "@/components/common/infoHeader";
import touchList from "@/components/common/touchList";
import { mapState, mapActions } from 'vuex';

export default {
  name: "orderCheck",
  components: {
    infoHeader,
    touchList
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('changeCheckOrder', {
      orderSeqno: state => state.order.order_seqno,
      touchListData: state => state.order.items_info,
    })
  },
  methods: {
    ...mapActions('changeCheckOrder', ['delete_project']),
    deleteProject(index) {
      this.delete_project(index);
      // TODO: 更新条码
    }
  }
};
</script>

<style scoped>
</style>
