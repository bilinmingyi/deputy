<template>
  <div class="checkList">
    <d-header>检验收款</d-header>
    <d-search @on-search="getData" placeholder="患者姓名、电话"></d-search>
    <div class="content">
      <div class="select-box">
        <span class="pr16">选择诊所</span>
        <select :class="['doctor_select', {'color-8c8c8c': curClinicId == ''}]"
          @input="selectClinic($event.target.value)">
          <option value="" class="color-8c8c8c">请选择诊所</option>
          <option v-for="clinic in clinicList" :value="clinic.id" :selected="curClinicId == clinic.id">{{clinic.name}}</option>
        </select>
      </div>
      <div class="order_item" v-for="(order,index) in dataList" @click="jumpToDetail(order.order_seqno)">
          <div class="order_item_top">
            <span><span>{{order.clinic_name}}:&nbsp;&nbsp;</span><span>{{order.doctor_name}}</span></span>
            <span>{{order.create_time|dateFormat('yy/MM/dd hh:mm')}}</span>
          </div>
          <div class="order_item_middle">
            <span>{{order.patient_name}}:&nbsp;&nbsp;{{order.patient_mobile}}</span>
          </div>
          <div class="order_item_bottom">
            <span>付款金额：{{order.trade_price}}</span>
            <span>待付款</span>
          </div>
          <hr class="full-screen-hr">
        </div>
      <div class="add_more" v-show="isComplete && dataList.length==0">暂无数据</div>
      <div class="add_more" v-if="isCanAdd" @click.stop="addMore()">查看更多...</div>
    </div>
    <d-load v-if="showLoad"></d-load>
  </div>
</template>

<script>
import dHeader from "@/components/common/dHeader.vue";
import dSearch from "@/components/common/dSearch.vue";
import dLoad from "@/components/common/dLoad";
import { mapActions } from "vuex";
export default {
  components: {
    dSearch,
    dHeader,
    dLoad
  },
  data() {
    return {
      showLoad: false,
      dataList: [],
      curClinicId: "",
      clinicList: [],
      isCanAdd: false,
      isComplete: false,
      page: 1,
      pageSize: 10
    };
  },
  created() {
    this.getData("", "clinicList");
    this.getData("");
  },
  methods: {
    ...mapActions("changeCheckOrder", ["reset_order"]),
    getData: function(name, type, isAdd) {
      this.showLoad = true;
      let [url, params] = ["", {}];
      if (type === "clinicList") {
        (url = "/weixin/sales/clinic/list"),
          (params = {
            page: 1,
            page_size: 100
          });
      } else {
        url = "/weixin/sales/dyCheckOrder/list";
        params = {
          is_paid: 0,
          status_arr: ["CHECKING", "DONE"],
          page: this.page,
          page_size: this.pageSize,
          query: name
        };
        this.curClinicId !== "" &&
          Object.assign(params, {
            clinic_id: this.curClinicId
          });

        this.isComplete = false;
      }
      this.axios
        .post(url, params)
        .then(respone => {
          var res = respone.data;
          if (res.code == 1000) {
            if (type === "clinicList") {
              this.clinicList = res.data;
            } else {
              if (isAdd) {
                this.dataList = this.dataList.concat(res.data);
              } else {
                this.page = 1;
                this.dataList = res.data;
              }
              this.isCanAdd = res.total_num > this.dataList.length;
              this.isComplete = true;
            }
          } else {
            this.$Message.infor(res.msg);
          }
        })
        .catch(console.log)
        .then(() => (this.showLoad = false));
    },
    addMore() {
      this.page++;
      let search = document.getElementById('dsearch');
      let searchVal = search ? search.value : '';
      this.getData(searchVal, '', true)
    },
    selectClinic(val) {
      this.curClinicId = val;
      let search = document.getElementById('dsearch');
      let searchVal = search ? search.value : '';
      this.getData(searchVal)
    },
    jumpToDetail(url) {
      this.reset_order();
      this.$router.push(`/checkListPage/clinicCheckOrderPage/confirmedOrderDetail/${url}`)
    },
  }
};
</script>

<style scoped>
.checkList >>> .block-fix {
  top: 2.75rem;
}

.content {
  min-height: calc(100vh - 2.75rem);
  width: 100vw;
  margin: 9.75rem 0 0 0;
}

.doctor_select {
  border: none;
  outline: none;
  font-size: 1rem;
  color: #3f3f3f;
  flex: 1;
}

.select-box {
  width: 100vw;
  min-height: 3rem;
  position: fixed;
  top: 6.75rem;
  background: #fff;
  display: flex;
  padding: 0 4vw;
  z-index: 10;
}

.select-box::before {
  content: '';
  height: 0.75rem;
  background: #f5f5f5;
  position: absolute;
  top: -0.75rem;
  left: 0;
  right: 0;
}

.select-box::after {
  content: '';
  border-bottom: 1px solid #d9d9d9;
  margin: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: scaleY(.5);
}

.select-box > span {
  line-height: 3rem;
  font-family: PingFangSC-Regular;
  font-size: 1rem;
  color: #3f3f3f;
  letter-spacing: 0;
  text-align: left;
}

.color-8c8c8c {
  color: #8c8c8c;
}

.order_item {
  background: #ffffff;
  font-size: 0.94rem;
  color: #7c7c7c;
  min-height: 5.75rem;
}

.order_item_top {
  color: #3f3f3f;
  display: flex;
  padding: 0.625rem 0.94rem 0.25rem;
}

.order_item_top > span:first-child {
  flex: 1;
  font-weight: bold;
}

.order_item_top > span:last-child {
  font-size: 0.875rem;
}

.order_item_middle > span:first-child {
  flex: 1;
  color: #3F3F3F;
}

.order_item_bottom {
  display: flex;
  padding: 0 0.94rem 0.25rem;
  color: #3F3F3F;
}

.order_item_bottom > span:first-child {
  flex: 1;
}

.order_item_bottom span:last-child {
  color: #eb6262;
}

.order_item_bottom {
  padding: 0 0.94rem 0.625rem;
}
</style>