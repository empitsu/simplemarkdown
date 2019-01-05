<template>
  <div id="editor">
    <h1>編集画面</h1>
    <p>{{ user.displayName }}</p>
    <button @click="onClickLogoutBtn">ログアウト</button>
    <div class="editorWrapper">
      <div class="memoListWrapper">
        <ul>
          <li class="memoList" v-for="(memo, index) in memos" :key="index" @click="onClickMemo(index)" :data-selected="index==selectedIndex">
            <p class="memoTitle">{{ displayTitle(memo.markdown) }}</p>
          </li>
        </ul>
        <button class="addMemoBtn" @click="onClickAddBtn">メモの追加</button>
        <button class="deleteMemoBtn" v-if="memos.length > 1" @click="onClickDeleteBtn">選択中のメモの削除</button>
        <button class="saveMemoBtn" @click="onClickSaveBtn">メモの保存</button>
      </div>
      <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
      <div class="preview" v-html="preview()"></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
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
    preview() {
      return marked(this.memos[this.selectedIndex].markdown);
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
  border-top: 1px solid #000;
}
.memoList {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 1px solid #000;
  &:nth-child(event) {
    background-color: #ccc;
  }
  &[data-selected="true"] {
    background-color: #ccf;
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
.markdown {
  width: 40%;
  height: 500px;
}
.preview {
  width: 40%;
  text-align: left;
}
</style>
