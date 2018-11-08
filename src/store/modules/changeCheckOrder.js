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
    }
  },
  getters: {
    orderPrice: (state) => {
      let arr = state.order.items_info;
      let price = 0;
      arr.forEach((item) => {
        price += item.cost_price;
      })
      return price;
    }
  },
  mutations: {
    [types.SET_ORDER](state, obj) {
      Object.keys(obj).forEach(item => {
        state.order[item] = obj[item];
      });
    },
    [types.ADD_CHECKORDERPROJECT](state, projectList) {
      state.order.items_info[item] = state.order.items_info[item].concat(projectList);
    },
    [types.DELETE_CHECKORDERPROJECT](state, index) {
      state.order.items_info.splice(index, 1);
    }
  },
  actions: {
    set_order: ({ commit }, obj) => {
      commit(types.SET_ORDER, obj);
    },
    add_project: ({ commit }, projectList) => {
      commit(types.ADD_CHECKORDERPROJECT, projectList);
    },
    delete_project: ({ commit }, index) => {
      commit(types.DELETE_CHECKORDERPROJECT, index);
    },
  }
};
export default changeOne;
