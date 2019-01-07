<template>
<div id="memoDetail">
  <!-- 
    somehow it doesn't work
    <v-textarea class="markdown" v-model="memoObj.markdown"></v-textarea> 
    -->
  <v-textarea class="markdown" v-model="markdown"></v-textarea>
  <div class="preview markdown-body" v-html="preview()"></div>
</div>
</template>
<script>
import marked from "marked";

export default {
  name: "MyMemo",
  // props: ["memo"],
  // data() {
  //   return {
  //     memoObj: this.memo
  //   };
  // },
  computed: {
    memo() {
      return this.$store.state.memos[parseInt(this.$route.params.memoId, 10)];
    },
    markdown: {
      get() {
        return this.memo.markdown;
      },
      set(value) {
        console.log("set", value);
        this.$store.commit("updateMarkdown", {
          value: value,
          index: parseInt(this.$route.params.memoId, 10)
        });
      }
    }
  },
  methods: {
    preview() {
      return marked(this.markdown);
    }
  }
};
</script>
<style lang="scss" scoped>
#memoDetail {
  width: 100%;
  display: flex;
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
