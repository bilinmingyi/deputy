<template>
  <div>
    <info-header>患者信息</info-header>
    <div class="bg-fff pl15 pr15 mb12">
      <div class="pay_line_two">
        <span class="pr16">所属医生</span>
        <select class="doctor_select" :value="doctorId" @input="set_doctorId($event.target.value)">
          <option value="">请选择所属医生</option>
          <option v-for="doc in dataList" :value="doc.id">{{doc.name}}</option>
        </select>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line_two">
        <span class="pr16">患者姓名</span>
        <span>王尼玛</span>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line_two">
        <span class="pr16">患者电话</span>
        <span>15876789544</span>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line_two">
        <span class="pr16">患者性别</span>
        <span>
            <d-radio :name="'sex'" :id="'sex-man'" :checkedVal=1 :curVal="sex"
                     @change="set_patient({sex:1})">男</d-radio>
            <d-radio :name="'sex'" :id="'sex-woman'" :checkedVal=2 :curVal="sex"
                     @change="set_patient({sex:2})">女</d-radio>
            <d-radio :name="'sex'" :id="'sex-no'" :checkedVal=0 :curVal="sex"
                     @change="set_patient({sex:0})">保密</d-radio>
          </span>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line_two">
        <span class="pr16">患者年龄</span>
        <div>
          <input type="number" class="patient_age"/>岁
          <input type="number" class="patient_age"/>月
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
    name: "newOrderPatient",
    components: {
      infoHeader,
      dRadio
    },
    data() {
      return {
        dataList: [],
        ...mapState('newCheckOrder', {
          doctorId: state => state.clinic.doctorId,
        }),
      }
    },
    created() {
      this.getDoctorList()
    },
    computed: {
      ...mapState('newCheckOrder', {
        clinicId: state => state.clinic.clinicId,
        name: state => state.patient.name,
        mobile: state => state.patient.mobile,
        age: state => state.patient.age,
        birthday: state => state.patient.birthday,
        sex: state => state.patient.sex
      }),
    },
    //ff
    methods: {
      ...mapActions('newCheckOrder', [
        'set_patient',
        'set_doctorId'
      ]),
      getDoctorList() {
        const self = this;
        self.axios.post("/apis/weixin/sales/clinic/doctorList", {
          "clinic_id": self.clinicId
        }).then(respone => {
          var res = respone.data;
          if (res.code == 1000) {
            this.dataList = res.data;
          } else {
            this.$Message.infor(res.msg)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .pay_line_two {
    font-size: 1rem;
    color: #3F3F3F;
    padding: 0.78rem 0;
    display: flex;
  }

  .doctor_select {
    border: none;
    outline: none;
    font-size: 1rem;
    color: #7C7C7C;
    flex: 1;
  }

  .pay_line_two >>> .d-radio {
    margin-right: 1.5rem;
  }

  .patient_age {
    border: none;
    width: 2rem;
    outline: none;
    text-align: center;
    font-size: 1rem;
    color: #3C3C3C;
  }
</style>
