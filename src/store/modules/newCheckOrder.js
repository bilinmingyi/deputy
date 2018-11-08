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
      items: []
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
    }
  },
  actions: {
    set_patient: ({commit}, obj) => {
      commit(types.SET_PATIENT, obj)
    },
    set_doctorId: ({commit}, obj) => {
      commit(types.SET_DOCTORID, obj)
    },
    push_checkItem: ({commit, obj}) => {
      commit(types.PUSH_CHECKITEM, obj)
    }
  }
};
export default newOne
