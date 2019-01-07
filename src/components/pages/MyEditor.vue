<template>
  <div id="editor">
    <header class="header">
      <h1>Simple Markdown</h1>
      <ul class="header__nav">
        <li class="header__nav-item"><p>{{ user.displayName }}</p></li>
        <li class="header__nav-item"><v-btn depressed small @click="onClickLogoutBtn">Logout</v-btn></li>
      </ul>
    </header>
    <ul class="memolist-menu">
      <li class="memolist-menu__item"><v-btn depressed small color="primary" class="addMemoBtn" @click="onClickAddBtn">Add</v-btn></li>
      <li class="memolist-menu__item"><v-btn depressed small color="warning" class="deleteMemoBtn" v-if="memos.length > 1" @click="onClickDeleteBtn">Delete</v-btn></li>
      <li class="memolist-menu__item"><v-btn depressed small color="success" class="saveMemoBtn" @click="onClickSaveBtn">Save</v-btn></li>
  </ul>
    <div class="editorWrapper">
      <div class="memoListWrapper">
        <v-list two-line>
          <template v-for="(memo, index) in memos"  >
            <v-list-tile
                avatar
                ripple
                :key="`title${index}`"
                @click="onClickMemo(index)"
                :data-selected="index==selectedIndex"
                class="memo-list-tile"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ displayTitle(memo.markdown) }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider
                v-if="index + 1 < memos.length"
                :key="index"
            ></v-divider>
          </template>
        </v-list>

      </div>
      <MyMemo></MyMemo>
    </div>
  </div>
</template>
<script>
import MyMemo from "./Memo.vue";
export default {
  name: "MyEditor",
  data() {
    return {
      selectedIndex: 0
    };
  },
  computed: {
    memos() {
      return this.$store.state.memos;
    },
    user() {
      return this.$store.state.userData;
    }
  },
  components: {
    MyMemo: MyMemo
  },
  // watch: {
  // even if this component itself is NOT called by router, this event can be called on router.push()
  //   $route(to, from) {
  //     console.log("watch route", to, from);
  //     this.selectedIndex = (to.params && to.params.memoId) || 0;
  //   }
  // },
  beforeRouteUpdate(to, from, next) {
    // unless this component itself is called by router, this event isn't called on router.push()!
    this.selectedIndex = (to.params && to.params.memoId) || 0;
    console.log("beforeRouteUpdate", this.selectedIndex);
    next();
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("User is signed in.");
        // this.isLogin = true;
        this.$store.commit("setUserData", user);
        firebase
          .firestore()
          .collection("memos")
          .doc(this.user.uid)
          .get()
          .then(doc => {
            if (doc.exists && doc.data().memos) {
              console.log("get firestroe memos");
              this.$store.commit("setMemos", doc.data().memos);
              // this.$router.push({
              //   name: "memo",
              //   params: { memoId: this.selectedIndex }
              // });
            }
          });
      } else {
        // User is signed out.
        // this.isLogin = false;
        // this.$router.push({ name: "home" });
        // this.$store.commit("setUserData", null);
      }
    });
  },
  mounted() {
    document.onkeydown = e => {
      if (e.key == "s" && (e.metaKey || e.ctrlKey)) {
        this.onClickSaveBtn();
        return false;
      }
    };
  },
  beforeDestroy() {
    document.onkeydown = null;
  },
  methods: {
    onClickLogoutBtn() {
      firebase.auth().signOut();
    },
    onClickAddBtn() {
      this.memos.push({ markdown: "untitled" });
    },
    onClickMemo(index) {
      this.$router.push({ name: "memo", params: { memoId: index } });
    },
    onClickDeleteBtn() {
      // todo: set through mutations
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        this.$router.push({
          name: "memo",
          params: { memoId: this.selectedIndex - 1 }
        });
      }
    },
    onClickSaveBtn() {
      // Initialize Cloud Firestore through Firebase
      var db = firebase.firestore();
      db.collection("memos")
        .doc(this.user.uid)
        .set({ memos: this.memos })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    displayTitle(text) {
      return text.split(/\n/)[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  &__nav {
    display: flex;
    align-items: center;
  }
  &__nav-item {
    list-style: none;
    > p {
      margin-bottom: 0;
    }
  }
}
.memolist-menu {
  display: flex;
  align-items: center;
  &__item {
    list-style: none;
  }
}
.editorWrapper {
  display: flex;
}
.memoWrapper {
  width: 20%;
  border-top: 1px solid #000;
}
.memoListWrapper {
  width: 20%;
}
.memo-list-tile {
  /deep/ [data-selected="true"] {
    background: rgba(0, 0, 0, 0.04);
  }
}

.memoTitle {
  height: 1.5em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}
.addMemoBtn {
  // margin-top: 20px;
}
.deleteMemoBtn {
  margin: 10px;
}
</style>
