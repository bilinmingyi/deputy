<template>
  <div>
    <info-header>患者信息</info-header>
    <div class="bg-fff pl15 pr15 mb12">
      <div class="pay_line_two">
        <span class="pr16">所属医生</span>
        <select class="doctor_select" @input="set_doctorId($event.target.value)">
          <option value="">请选择所属医生</option>
          <option v-for="doc in doctorList" :value="doc.id" :selected="doctorId == doc.id">{{doc.name}}</option>
        </select>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line_two">
        <span class="pr16">患者姓名</span>
        <input :value="name" class="infor_input" type="text" @input="setPatName($event)" @blur="hideSelectPat()"/>
      </div>
      <hr class="full-screen-hr">
      <div class="pay_line_two">
        <span class="pr16">患者电话</span>
        <input :value="mobile" class="infor_input" type="text" @input="setPatMobile($event)" @blur="hideSelectPat()"/>
      </div>
      <ul class="select_patient" v-show="showSelect" :style="{'top':inputType==2?'15rem':'11.875rem'}">
        <li v-for="pat in patientList" @click.stop="selectPat(pat)">
          <span class="pr5">{{pat.name}}</span>
          {{pat.mobile}}</li>
      </ul>
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
          <input type="number" class="patient_age" :value="age" @input="set_patient({age:$event.target.value})"/>岁
          <input type="number" class="patient_age" :value="birthMonth" @input="set_patient({birthMonth:$event.target.value})"/>月
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
        doctorList: [],
        patientList: [],
        inputType: 1,
        timer: "",
        showSelect: false
      }
    },
    created() {
      this.getDoctorList()
    },
    computed: {
      ...mapState('newCheckOrder', {
        clinicId: state => state.clinic.clinicId,
        doctorId: state => state.clinic.doctorId,
        name: state => state.patient.name,
        mobile: state => state.patient.mobile,
        age: state => state.patient.age,
        birthMonth: state => state.patient.birthMonth,
        birthday: state => state.patient.birthday,
        sex: state => state.patient.sex
      }),
    },
    methods: {
      ...mapActions('newCheckOrder', [
        'set_patient',
        'set_doctorId'
      ]),
      getDoctorList() {
        const self = this;
        self.axios.post("/weixin/sales/clinic/doctorList", {
          "clinic_id": self.clinicId
        }).then(respone => {
          var res = respone.data;
          if (res.code == 1000) {
            this.doctorList = res.data;
          } else {
            this.$Message.infor(res.msg)
          }
        })
      },
      searchPat(type) {
        var self = this, query = "";
        query = type == 1 ? self.name : self.mobile;
        self.inputType = type;
        clearTimeout(self.timer);
        self.timer = setTimeout(() => {
          if (query === "") {
            self.showSelect = false;
            return
          }
          self.axios.post("/treatmng/patient/list", {
            "query": query
          }).then((respone) => {
            var res = respone.data;
            if (res.code === 1000) {
              if (res.data.length > 0) {
                self.patientList = res.data;
                self.showSelect = true;
              } else {
                self.patientList = [];
                self.showSelect = false;
              }
            } else {
              self.$Message.infor(res.msg)
            }
          }).catch(
            (error) => {
              console.log(error)
            }
          )
        }, 300)
      },
      setPatName(event){
        this.set_patient({name:event.target.value});
        this.searchPat(1)
      },
      setPatMobile(event){
        this.set_patient({mobile:event.target.value});
        this.searchPat(2)
      },
      selectPat(pat){
        const today=new Date();
        const birth=new Date(Number(pat.birthday));
        let age=0,birthMonth;
        if(today.getMonth()>=birth.getMonth()){
          birthMonth=today.getMonth()-birth.getMonth();
          age=today.getFullYear()-birth.getFullYear();
        }else {
          birthMonth=today.getMonth()+12-birth.getMonth();
          age=today.getFullYear()-birth.getFullYear()-1;
        }
        this.set_patient({name:pat.name,mobile:pat.mobile,age:age,birthMonth:birthMonth,birthday:pat.birthday,sex:pat.sex})
      },
      hideSelectPat(){
        setTimeout(()=>{
          this.showSelect=false;
        },150);

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

  .pay_line_two .infor_input {
    font-size: 1rem;
    flex: 1;
    border: none;
    outline: none
  }

  .patient_age {
    border: none;
    width: 2rem;
    outline: none;
    text-align: center;
    font-size: 1rem;
    color: #3C3C3C;
  }
  .select_patient{
    width: calc( 100% - 6.25rem);
    border: 1px solid #cccccc;
    border-radius: 0.25rem;
    background: #ffffff;
    max-height: 8.3125rem;
    overflow-y: scroll;
    position: absolute;
    right: 0.9735rem;
    z-index: 900;
    line-height: 2.5rem;
    box-shadow: 0 0.125rem 0.5rem 0.125rem rgba(0,0,0,0.20);
  }
  .select_patient li{
    padding: 0 0.625rem;
    border-bottom: 0.0625rem solid #cccccc;
  }
</style>
