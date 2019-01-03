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
.markdown {
  width: 40%;
  height: 500px;
}
.preview {
  width: 40%;
  text-align: left;
}
</style>
