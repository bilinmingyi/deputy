const newOne = {
  namespaced: true,
  state: {

    patient: {
      name:"",
      mobile:"",
      age:"",
      birthMonth:0,
      birth:"",
      sex:0
    },
    clinic:{
      clinicId:"",
      doctorList:[],
      doctorId:""
    },
    prescription:{
      recipeType:7,
      money:0,
      data:{
        isCould:1,
        doctorRemark:"",
        items:[]
      }
    }



  },
  getters: {},
  mutations: {},
  actions: {}
};
export default newOne
