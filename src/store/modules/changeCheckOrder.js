import types from "./changeMutationTypes";

const changeOne = {
  namespaced: true,
  state: {
    order: {
      id: 7,
      clinic_id: 5,
      clinic_name: "大医联帮测试诊所",
      order_seqno: "DC0279283644002",
      treat_order_seqno: "",
      doctor_id: 2,
      doctor_name: "demo",
      patient_id: 81,
      patient_name: "这么大",
      patient_mobile: "15622146619",
      patient_age: 18,
      patient_sex: 1,
      trade_price: 40,
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
      status: "WAITCONFIRM",
      memo: "",
      operator_memo: "",
      create_time: 1541558844860,
      creator: "测先生",
      sales_id: 7,
      sales_name: "测先生",
      provider_code: "gz_test006",
      provider: "佛山迪安",
      is_lock: 0,
      items_info: [
        {
          id: 15,
          clinic_id: 5,
          order_seqno: "DC0279283644002",
          treat_order_seqno: "",
          item_id: 5,
          name: "test3",
          provider_code: "gz_test006",
          provider_check_code: "test3",
          sale_price: 50,
          cost_price: 40,
          memo: "3",
          set_id: 0,
          set_name: "",
          set_price: 0,
          container_code: "FS_C12",
          create_time: 1541558844887
        }
      ],
      dyCheckOrderSpecimenInfos: [
        {
          id: 5,
          order_seqno: "DC0279283644002",
          provider: "gz_test006",
          container_code: "FS_C12",
          name: "咽拭子",
          barcode: "652479854641",
          volumn: 1,
          memo: "备注",
          create_time: 1541558844860
        }
      ]
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
    }
  },
  actions: {
    set_order: ({ commit }, obj) => {
      commit(types.SET_ORDER, obj);
    },
    add_project: ({ commit }, obj) => {
      commit(types.ADD_CHECKORDERPROJECT, obj);
    },
    delete_checkProject: ({ commit }, index) => {
      commit(types.DELETE_CHECKPROJECT, index);
    },
    delete_checkSetProject: ({ commit }, index) => {
      commit(types.DELETE_CHECKSETPROJECT, index);
    },
    clear_newProjectList: ({ commit }) => {
      commit(types.CLEAR_NEWPROJECTLST);
    },
    update_imgs: ({ commit }, str) => {
      commit(types.UPDATE_IMGS, str);
    },
    set_payType: ({ commit }, type) => {
      commit(types.SET_PAYTYPE, type);
    },
  }
};
export default changeOne;
