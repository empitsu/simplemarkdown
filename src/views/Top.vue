<template>
  <div id="top">
    <router-view/>
    <router-link :to="{ name: 'terms' }">Terms of Use</router-link>
  </div>
</template>
<script>
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
        // this code moved to MyHome.vue Becase when I access this app by /memos/1 on the browser, it redirects to memo/0.
        //this.$router.push({ name: "memo", params: { memoId: 0 } });
      } else {
        // User is signed out.
        this.isLogin = false;
        this.$router.push({ name: "home" });
        this.$store.commit("setUserData", null);
      }
    });
  }
};
</script>
