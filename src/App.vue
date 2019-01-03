<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <MyHome v-if="!isLogin"></MyHome>
    <MyEditor v-if="isLogin" :user="userData"></MyEditor>
  </div>
</template>
<script>
import MyHome from "./components/pages/MyHome.vue";
import MyEditor from "./components/pages/MyEditor.vue";
export default {
  name: "App",
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


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
