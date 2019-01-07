<template>
  <div id="editor">
    <h1>Edit</h1>
    <p>{{ user.displayName }}</p>
    <v-btn depressed small color="info" @click="onClickLogoutBtn">Logout</v-btn>
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
        <v-btn depressed small color="primary" class="addMemoBtn" @click="onClickAddBtn">Add</v-btn>
        <v-btn depressed small color="warning" class="deleteMemoBtn" v-if="memos.length > 1" @click="onClickDeleteBtn">Delete</v-btn>
        <v-btn depressed small color="success" class="saveMemoBtn" @click="onClickSaveBtn">Save</v-btn>
      </div>
      <MyMemo :memo="this.memos[this.selectedIndex]"></MyMemo>
      <router-view/>
    </div>
  </div>
</template>
<script>
import MyMemo from "./Memo.vue";
export default {
  name: "MyEditor",
  props: ["user"],
  data() {
    return {
      memos: [
        {
          markdown: ""
        }
      ],
      selectedIndex: 0
    };
  },
  computed: {
    selectedIndex() {
      console.log("selectedIndex");
      console.log((this.$router.params && this.$router.params.memoId) || 0);
      return (this.$router.params && this.$router.params.memoId) || 0;
    }
  },
  components: {
    MyMemo: MyMemo
  },
  watch: {
    $route(to, from) {
      console.log("watch route", to, from);
      this.selectedIndex = (to.params && to.params.memoId) || 0;
    }
  },
  beforeRouteUpdate(to, from, next) {
    // somehow it isn't called on router.push()!
    console.log("beforeRouteUpdate");
    // ルート変更に反応する...
    // next() を呼び出すのを忘れないでください
    this.selectedIndex = (to.params && to.memoId) || 0;
    next();
  },
  created() {
    firebase
      .firestore()
      .collection("memos")
      .doc(this.user.uid)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().memos) {
          console.log("get firestroe memos");
          this.memos = doc.data().memos;
          this.$router.push({ name: "memo", params: { memoId: 0 } });
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
      // this.selectedIndex = index;
    },
    onClickDeleteBtn() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        // this.selectedIndex--;
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
          console.log("Document written with ID: ", docRef.id);
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
  margin-top: 20px;
}
.deleteMemoBtn {
  margin: 10px;
}
</style>
