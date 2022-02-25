import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    completedTasksList: [],
  },
  getters: {
  },
  mutations: {
    updataList(state, newItem){
      if(!state.completedTasksList.find(list => list.id == newItem.id)){
        return state.completedTasksList.push(newItem)
      }
    },
    clearList(state){
      return state.completedTasksList = []
    },
    sortList(state){
      return state.completedTasksList.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
          }
        if (nameA > nameB) {
          return 1;
          }
        })
      },
    },
    actions: {
    },
    modules: {
    }
  })

