import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== "production", // when it is uncommented to use strict mode, it's too difficult to resolve all erros.
  state: {
    userData: {
      displayName: ""
    },
    memos: [{ markdown: "" }]
  },
  mutations: {
    setUserData(state, user) {
      state.userData = user;
    },
    setMemos(state, memos) {
      state.memos = memos;
    },
    updateMarkdown(state, params) {
      state.memos[params.index].markdown = params.value;
    }
  },
  actions: {}
});
