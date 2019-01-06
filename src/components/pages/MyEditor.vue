<template>
  <div id="editor">
    <h1>編集画面</h1>
    <p>{{ user.displayName }}</p>
    <button @click="onClickLogoutBtn">ログアウト</button>
    <div class="editorWrapper">
      <div class="memoListWrapper">
        <v-list two-line>
          <template v-for="(memo, index) in memos"  >
            <v-list-tile
                avatar
                ripple
                :key="index"
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
        <v-btn depressed small color="primary" class="addMemoBtn" @click="onClickAddBtn">メモの追加</v-btn>
        <button class="deleteMemoBtn" v-if="memos.length > 1" @click="onClickDeleteBtn">選択中のメモの削除</button>
        <button class="saveMemoBtn" @click="onClickSaveBtn">メモの保存</button>
      </div>
      <MyMemo :memo="this.memos[this.selectedIndex]"></MyMemo>
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
  components: {
    MyMemo: MyMemo
  },
  created() {
    firebase
      .firestore()
      .collection("memos")
      .doc(this.user.uid)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().memos) {
          this.memos = doc.data().memos;
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
      this.memos.push({ markdown: "無題のメモ" });
    },
    onClickMemo(index) {
      this.selectedIndex = index;
    },
    onClickDeleteBtn() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
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
  baxckground: #000;
  > [data-selected="true"] {
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
