import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== "production", // To use strict mode is too difficult..
  state: {
    userData: null,
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
