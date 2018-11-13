import types from "./changeMutationTypes";

const changeOne = {
  namespaced: true,
  state: {
    order: {
      id: -1,
      clinic_id: -1,
      clinic_name: "",
      order_seqno: "",
      treat_order_seqno: "",
      doctor_id: -1,
      doctor_name: "",
      patient_id: -1,
      patient_name: "",
      patient_mobile: "",
      patient_age: 0,
      patient_sex: 0,
      trade_price: 0,
      check_images: "",
      confirm_time: 0,
      check_time: 0,
      charge_time: 0,
      deliver_time: 0,
      pay_type: 0,
      pay_time: 0,
      pay_image: "",
      is_paid: 0,
      amount_receivable: 0,
      amount_receipts: 0,
      amount_arrears: 0,
      status: "",
      memo: "",
      operator_memo: "",
      create_time: 0,
      creator: "",
      sales_id: 0,
      sales_name: "",
      provider_code: "",
      provider: "",
      is_lock: 0,
      items_info: [],
      dyCheckOrderSpecimenInfos: []
    },
    newProjects: {
      check_list: [],
      checkset_list: []
    },
    newImgList: '',
  },
  getters: {
    orderPrice: state => {
      let arr = state.order.items_info;
      let price = 0;
      arr.forEach(item => {
        price += item.cost_price;
      });
      return price;
    },
    curProjects: state => {
      let arr = state.order.items_info;
      let res = {
        check_list: [],
        checkset_list: []
      };
      if (!Array.isArray(arr)) return res;
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].set_id !== 0) {
          let flag = true;
          for (let j = 0, jLen = res.checkset_list.length; j < jLen; j++) {
            if (res.checkset_list[j].set_id === arr[i].set_id) {
              flag = false;
              res.checkset_list[j].checks.push(arr[i]);
              break;
            }
          }
          if (flag) {
            res.checkset_list.push({
              set_id: arr[i].set_id,
              set_name: arr[i].set_name,
              checks: [arr[i]]
            });
          }
        } else {
          res.check_list.push(arr[i]);
        }
      }
      return res;
    },
    imgDataList: state => {
      let imgs = state.order.check_images;
      if (imgs) {
        return imgs;
      } else {
        return '["", "", ""]';
      }
    }
  },
  mutations: {
    [types.SET_ORDER](state, obj) {
      Object.keys(obj).forEach(item => {
        state.order[item] = obj[item];
      });
    },
    [types.ADD_CHECKORDERPROJECT](state, obj) {
      if (obj.type === 1) {
        state.newProjects.check_list.push(obj.project);
      } else if (obj.type === 2) {
        state.newProjects.checkset_list.push(obj.project);
      }
    },
    [types.DELETE_CHECKPROJECT](state, obj) {
      let arr = state.order.items_info;
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].set_id == 0 && arr[i].item_id === obj.item_id) {
          arr.splice(i, 1);
          return;
        }
      }
    },
    [types.DELETE_CHECKSETPROJECT](state, obj) {
      let arr = state.order.items_info;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].set_id === obj.set_id) {
          arr.splice(i--, 1);
        }
      }
    },
    [types.CLEAR_NEWPROJECTLST](state) {
      state.newProjects = {
        check_list: [],
        checkset_list: []
      };
    },
    [types.UPDATE_IMGS](state, str) {
      state.order.check_images = JSON.parse(str)
    },
    [types.SET_PAYTYPE](state, type) {
      state.order.pay_type = type
    },
    [types.RESET_ORDER](state) {

      state.order = {
        id: -1,
        clinic_id: -1,
        clinic_name: "",
        order_seqno: "",
        treat_order_seqno: "",
        doctor_id: -1,
        doctor_name: "",
        patient_id: -1,
        patient_name: "",
        patient_mobile: "",
        patient_age: 0,
        patient_sex: 0,
        trade_price: 0,
        check_images: "",
        confirm_time: 0,
        check_time: 0,
        charge_time: 0,
        deliver_time: 0,
        pay_type: 0,
        pay_time: 0,
        pay_image: "",
        is_paid: 0,
        amount_receivable: 0,
        amount_receipts: 0,
        amount_arrears: 0,
        status: "",
        memo: "",
        operator_memo: "",
        create_time: 0,
        creator: "",
        sales_id: 0,
        sales_name: "",
        provider_code: "",
        provider: "",
        is_lock: 0,
        items_info: [],
        dyCheckOrderSpecimenInfos: []
      }
      state.newProjects = {
        check_list: [],
        checkset_list: []
      }
      state.newImgList = ''
    }
  },
  actions: {
    set_order: ({commit}, obj) => {
      commit(types.SET_ORDER, obj);
    },
    add_project: ({commit}, obj) => {
      commit(types.ADD_CHECKORDERPROJECT, obj);
    },
    delete_checkProject: ({commit}, index) => {
      commit(types.DELETE_CHECKPROJECT, index);
    },
    delete_checkSetProject: ({commit}, index) => {
      commit(types.DELETE_CHECKSETPROJECT, index);
    },
    clear_newProjectList: ({commit}) => {
      commit(types.CLEAR_NEWPROJECTLST);
    },
    update_imgs: ({commit}, str) => {
      commit(types.UPDATE_IMGS, str);
    },
    set_payType: ({commit}, type) => {
      commit(types.SET_PAYTYPE, type);
    },
    reset_order: ({commit}) => {
      commit(types.RESET_ORDER);
    }
  }
};
export default changeOne;
