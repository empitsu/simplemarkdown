<template>
<div id="top">
  <MyHome v-if="!isLogin"></MyHome>
  <MyEditor v-if="isLogin" :user="userData"></MyEditor>
  <router-link :to="{ name: 'terms' }">Terms of Use</router-link>
</div>
</template>
<script>
import MyHome from "../components/pages/MyHome.vue";
import MyEditor from "../components/pages/MyEditor.vue";

export default {
  name: "Top",
  data() {
    return {
      isLogin: false
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("User is signed in.");
        this.isLogin = true;
        this.$store.commit("setUserData", user);
      } else {
        // User is signed out.
        this.isLogin = false;
        this.$store.commit("setUserData", null);
      }
    });
  },
  components: {
    MyHome: MyHome,
    MyEditor: MyEditor
  }
};
</script>
