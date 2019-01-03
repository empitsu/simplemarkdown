<template>
  <div id="editor">
    <h1>編集画面</h1>
    <p>{{ user.displayName }}</p>
    <button @click="onClickLogoutBtn">ログアウト</button>
  </div>
</template>
<script>
export default {
  name: "MyEditor",
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    onClickLogoutBtn() {
      firebase.auth().signOut();
    }
  }
};
</script>
