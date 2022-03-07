import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipeOutput: "",
  },
  getters: {
  },
  mutations: {
    sendList(state, recipe){
        state.recipeOutput = recipe;
      }
    },
    actions: {
    },
    modules: {
    }
  })