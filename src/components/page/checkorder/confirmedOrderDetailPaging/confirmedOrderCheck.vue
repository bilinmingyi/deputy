<template>
  <div>
    <info-header>
      检验项目
      <button slot="btn" @click="$router.push({ path: `/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/${orderSeqno}/addNewProject` })">添加项目</button>
    </info-header>
    <div class="bg-fff p15 mb12">
      <touch-list :data="curProjects.check_list" @delete="deleteCheckProject" class="mb10">
        <div slot-scope="{prop}">
          <span>{{prop.set_id ? prop.set_name : prop.name}}</span>
        </div>
      </touch-list>
      <touch-list :data="curProjects.checkset_list" @delete="deleteCheckSetProject">
        <div slot-scope="{prop}">
          <span>{{prop.set_name}}</span>
        </div>
      </touch-list>
    </div>
  </div>
</template>

<script>
import infoHeader from "@/components/common/infoHeader";
import touchList from "@/components/common/touchList";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "orderCheck",
  components: {
    infoHeader,
    touchList
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("changeCheckOrder", {
      orderSeqno: state => state.order.order_seqno
    }),
    ...mapGetters("changeCheckOrder", ["curProjects"])
  },
  methods: {
    ...mapActions("changeCheckOrder", [
      "delete_checkProject",
      "delete_checkSetProject"
    ]),
    deleteCheckProject(index) {
      let obj = this.curProjects.check_list[index];
      this.delete_checkProject(obj);
      this.updateProject();
    },
    deleteCheckSetProject(index) {
      let obj = this.curProjects.checkset_list[index];
      this.delete_checkSetProject(obj);
      this.updateProject();
    },
    updateProject() {
      const [check, checkSet] = [[], []];
      this.curProjects.check_list.forEach(item => {
        check.push({ cloud_item_id: item.item_id });
      });
      this.curProjects.checkset_list.forEach(item => {
        checkSet.push({ set_id: item.set_id });
      })
      let params = {
        order_seqno: this.orderSeqno,
        check_list: check,
        checkset_list: checkSet
      };
      this.axios
        .post("/apis/weixin/sales/dyCheckOrder/update", params)
        .then(respone => {
          const res = respone.data;
          if (res.code === 1000) {
            this.$emit('update');
          } else {
            this.$Message.infor(res.msg);
          }
        }).catch(console.log);
    }
  }
};
</script>

<style scoped>
</style>
