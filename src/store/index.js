import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

import changeCheckOrder from './modules/changeCheckOrder'
import newCheckOrder from './modules/newCheckOrder'

Vue.use(Vuex)

const state={};

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./mutations', './modules/changeCheckOrder','./modules/newCheckOrder'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newMutations = require('./mutations').default;
    const newModuleChange = require('./modules/changeCheckOrder').default;
    const newModuleNew = require('./modules/newCheckOrder').default;
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
      modules: {
        changeCheckOrder: newModuleChange,
        newCheckOrder:newModuleNew
      }
    })
  })
}

export default new Vuex.Store({
  modules:{
    changeCheckOrder,
    newCheckOrder
  },
  state,
  mutations,
  actions
})
