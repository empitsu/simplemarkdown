<template>
  <div id="home">
    <h1>simple markdown</h1>
    <v-btn depressed color="primary" @click="onClickLoginBtn">Log in via Google</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "Welcome to simpleMarkdown"
    };
  },
  methods: {
    onClickLoginBtn() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          // eslint-disable-next-line
          var user = result.user;
          console.log(`token${token}`);
          // ...
          this.$router.push({ name: "memo", params: { memoId: 0 } });
        })
        .catch(error => {
          // Handle Errors here.
          // eslint-disable-next-line
          var errorCode = error.code;
          // eslint-disable-next-line
          var errorMessage = error.message;
          // The email of the user's account used.
          // eslint-disable-next-line
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // eslint-disable-next-line
          var credential = error.credential;
          // ...
          console.log(`error:${error}`);
        });
    }
  }
};
</script>
<style lang="scss">
.home {
  margin-top: 60px;
}
</style>
