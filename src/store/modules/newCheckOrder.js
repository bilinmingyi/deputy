import types from './newMutationTypes'

const newOne = {
  namespaced: true,
  state: {
    patient: {
      name: "",
      mobile: "",
      age: "",
      birthMonth: "0",
      birthday: "",
      sex: 0
    },
    clinic: {
      clinicId: "",
      doctorList: [],
      doctorId: ""
    },
    prescription: {
      recipeType: 7,
      payType: 1,
      money: 0,
      isCould: 1,
      doctorRemark: "",
      items: [],
      contains: [],
      imgList: ['', '', '']
    }
  },
  getters: {},
  mutations: {
    //设置clinic.clinicId
    [types.SET_CLINICID](state, obj) {
      state.clinic.clinicId = obj;
    },
    [types.SET_PATIENT](state, obj) {
      Object.keys(obj).forEach(item => {
        state.patient[item] = obj[item];
      })
    },
    [types.SET_DOCTORID](state, obj) {
      state.clinic.doctorId = obj;
    },
    [types.PUSH_CHECKITEM](state, obj) {
      state.prescription.items.push(obj);
    },
    [types.DELETE_CHECKITEM](state, index) {
      state.prescription.items.splice(index, 1)
    },
    [types.PUSH_CONTAIN](state, obj) {
      state.prescription.contains.push(obj)
    },
    [types.DELETE_CONTAIN](state, index) {
      state.prescription.contains.splice(index, 1)
    },
    [types.CLEAR_CONTAIN](state) {
      state.prescription.contains = [];
    },
    [types.SET_CONTAIN](state, obj) {
      state.prescription.contains = obj;
    },
    [types.SET_PRICE](state, obj) {
      state.prescription.money = obj;
    },
    [types.SET_PAYTYPE](state, obj) {
      state.prescription.payType = obj;
    },
    [types.SET_IMGLIST](state, obj) {
      state.prescription.imgList = JSON.parse(obj);
    },
    [types.SET_REMARK](state, obj) {
      state.prescription.doctorRemark = obj;
    },
    [types.CANCEL_ORDER](state) {
      state.patient = {
        name: "",
        mobile: "",
        age: "",
        birthMonth: "",
        birthday: "",
        sex: 0
      };
      state.clinic = {
        clinicId: "",
        doctorList: [],
        doctorId: ""
      }

      state.prescription = {
        recipeType: 7,
        payType: 1,
        money: 0,
        isCould: 1,
        doctorRemark: "",
        items: [],
        contains: [],
        imgList: ['', '', '']
      }

    }
  },
  actions: {
    set_patient: ({commit}, obj) => {
      commit(types.SET_PATIENT, obj)
    },
    set_doctorId: ({commit}, obj) => {
      commit(types.SET_DOCTORID, obj)
    },
    set_clinicId: ({commit}, obj) =>{
      commit(types.SET_CLINICID,obj)
    },
    push_checkItem: ({commit}, obj) => {
      commit(types.PUSH_CHECKITEM, obj)
    },
    delete_checkItem: ({commit}, index) => {
      commit(types.DELETE_CHECKITEM, index)
    },
    push_contain: ({commit}, obj) => {
      commit(types.PUSH_CONTAIN, obj)
    },
    delete_contain: ({commit}, index) => {
      commit(types.DELETE_CONTAIN, index)
    },
    clear_contain: ({commit}) => {
      commit(types.CLEAR_CONTAIN)
    },
    set_contain: ({commit}, obj) => {
      commit(types.SET_CONTAIN, obj)
    },
    set_price: ({commit}, obj) => {
      commit(types.SET_PRICE, obj)
    },
    set_payType: ({commit}, obj) => {
      commit(types.SET_PAYTYPE, obj)
    },
    set_imgList: ({commit}, obj) => {
      commit(types.SET_IMGLIST, obj)
    },
    set_remark: ({commit}, obj) => {
      commit(types.SET_REMARK, obj)
    },
    cancel_order: ({commit}) => {
      commit(types.CANCEL_ORDER)
    }
  }
};
export default newOne
