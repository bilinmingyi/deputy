<template>
  <div>
    <d-header>检验录单</d-header>
    <section class="content">
      <!--订单患者信息组件-->
      <order-patient></order-patient>
      <!--订单检查项目组件-->
      <order-check></order-check>
      <!--订单条码组件-->
      <order-code></order-code>
      <!--订单图片组件-->
      <order-img :img-list="JSON.stringify(imgDataList)" v-on:datachange="changeImg"></order-img>
      <!--订单支付方式组件-->
      <order-pay></order-pay>
      <div class="payment">
        <span>备注</span>
        <input type="text" placeholder="请输入备注" :value="remark" @input="set_remark($event.target.value)">
      </div>
      <div class="pay_operation">
        <button @click.stop="close(1)">关闭</button>
        <button @click.stop="close(2)">取消订单</button>
        <button @click.stop="sureOrder()">提交</button>
      </div>
    </section>
  </div>
</template>

<script>
  import dHeader from "@/components/common/dHeader.vue";
  import orderPatient from "@/components/page/checkorder/newOrderPaging/newOrderPatient"
  import orderCheck from "@/components/page/checkorder/newOrderPaging/newOrderCheck"
  import orderCode from "@/components/page/checkorder/newOrderPaging/newOrderCode"
  import orderImg from "@/components/page/checkorder/newOrderPaging/newOrderImg"
  import orderPay from "@/components/page/checkorder/newOrderPaging/newOrderPay"
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "newOrderPage",
    components: {
      dHeader,
      orderPatient,
      orderCheck,
      orderCode,
      orderImg,
      orderPay
    },
    data() {
      return {};
    },
    computed: {
      ...mapState('newCheckOrder', {
        imgDataList: state => state.prescription.imgList,
        remark: state => state.prescription.doctorRemark,
        allState: state => state
      })
    },
    created() {
      this.init();
    },
    methods: {
      ...mapActions('newCheckOrder', [
        'set_imgList',
        'set_remark',
        'cancel_order'
      ]),
      init() {
        this.$store.commit('newCheckOrder/SET_CLINICID', this.$route.query.clinicId)
      },
      changeImg(str) {
        this.set_imgList(str)
      },
      close(type) {
        if (type == 1) {
          this.$router.go(-1);
        } else if (type == 2) {
          this.cancel_order();
          this.$router.go(-1);
        }
      },
      sureOrder() {
        if (this.allState.clinic.clinicId === '') {
          this.$Message.infor("请先选择所属医生");
          return
        }

        if (this.allState.patient.name === ''
          || this.allState.patient.mobile ===''
          || this.allState.patient.age === ''
          || this.allState.patient.birthMonth === ''
        ) {
          this.$Message.infor('请填写全部患者信息')
          return
        }

        if (this.allState.prescription.items.length === 0) {
          this.$Message.infor("至少添加一个检查项目");
          return
        }
        var today = new Date();
        today.setFullYear(Number(today.getFullYear()) - Number(this.allState.patient.age));
        today.setMonth(Number(today.getMonth()) - Number(this.allState.patient.birthMonth));

        var checkList = [], checkSetList = [];
        this.allState.prescription.items.forEach(item => {
          if (item.type === 1) {
            checkList.push({cloud_item_id: item.id})
          } else if (item.type === 2) {
            checkSetList.push({set_id: item.id})
          }
        });
        var specimenList = [];
        this.allState.prescription.contains.forEach(item => {
          specimenList.push({
            container_code:item.code,
            name:item.name,
            barcode:item.barCode,
            volumn:item.num,
            memo:item.memo
          })
        });
        this.axios.post("/apis/weixin/sales/dyCheckOrder/create", {
          "clinic_id": this.allState.clinic.clinicId,
          "doctor_id": this.allState.clinic.doctorId,
          "patient_mobile": this.allState.patient.mobile,
          "patient_name": this.allState.patient.name,
          "patient_age": this.allState.patient.age,
          "patient_birthday": today.getTime(),
          "patient_sex": this.allState.patient.sex,
          "recipe_list": [{
            "recipe_type": this.allState.prescription.recipeType,
            "is_cloud": this.allState.prescription.isCould,
            "doctor_remark": this.allState.prescription.doctorRemark,
            "check_images": JSON.stringify(this.allState.prescription.imgList),
            "check_list": checkList,
            "checkset_list": checkSetList,
            "specimen_list": specimenList
          }]
        }).then(respone => {
          var res=respone.data;
          if(res.code===1000){
            this.cancel_order();
            if(this.allState.prescription.payType==1){
              window.location.href='/weixin/pay/?orderType=5&orderSeqno='+res.data;
            }else {
              this.close(1);
            }
          }else {
            this.$Message.infor(res.msg)
          }

        }).catch(error => {
          console.log(error)
        }).then(()=>{
          window.location.href
        })
      }
    }
  }
</script>

<style scoped>
  .content {
    min-height: calc(100vh - 2.75rem);
    width: 100vw;
    margin: 2.75rem 0 0 0;
  }

  .payment {
    background: #FFFFFF;
    color: #3F3F3F;
    font-size: 1rem;
    padding: 0.78rem 0.94rem;
    margin-bottom: 4.25rem;
    display: flex;
  }

  .payment input {
    font-size: 1rem;
    padding: 0 1rem;
    flex: 1;
    border: none;
    outline: none
  }

</style>
