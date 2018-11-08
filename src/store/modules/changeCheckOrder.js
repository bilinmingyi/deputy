import types from './newMutationTypes';

const changeOne={
  namespaced: true,
  state:{
    patient: {
      time: 965535132000,
      patientName: "王尼玛",
      mobile: "13245678901",
      doctor: "李教授",
    },
  },
  getters:{},
  mutations:{
    [types.SET_CONFIRMEDPATIENT](state, obj) {
      Object.keys(obj).forEach(item => {
        state.patient[item] = obj[item];
      })
    }
  },
  actions:{}
};
export default changeOne
