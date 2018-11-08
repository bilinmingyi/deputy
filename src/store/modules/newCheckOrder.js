import types from './newMutationTypes'

const newOne = {
  namespaced: true,
  state: {
    patient: {
      name: "",
      mobile: "",
      age: "",
      birthMonth: "",
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
      money: 0,
      isCould: 1,
      doctorRemark: "",
      items: [],
      contains: []
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
    [types.CLEAR_CONTAIN](state){
      state.prescription.contains=[];
    }
  },
  actions: {
    set_patient: ({commit}, obj) => {
      commit(types.SET_PATIENT, obj)
    },
    set_doctorId: ({commit}, obj) => {
      commit(types.SET_DOCTORID, obj)
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
    }
  }
};
export default newOne
