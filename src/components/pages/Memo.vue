<template>
<div id="memoDetail">
  <!-- 
    Somehow it doesn't work when memoObj's initial value is set from props passed from above.
    <v-textarea class="markdown" v-model="memoObj.markdown"></v-textarea> 
    -->
  <div class="textarea-wrap">
    <p class="textarea-head">textarea</p>
    <v-textarea box height="500px" class="markdown" v-model="markdown"></v-textarea>
  </div>
  <div class="preview-wrap">
    <p class="preview-head">preview</p>
    <div class="preview markdown-body" v-html="preview()"></div>
  </div>
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
      // vue.runtime.esm.js?2b0e:601 [Vue warn]: Error in render: "TypeError: Cannot read property 'markdown' of undefined" occurs when initial params - memoId -  is not "0".
      // because array which is default value of memos in store has only one object.
      return this.$store.state.memos[parseInt(this.$route.params.memoId, 10)];
    },
    markdown: {
      get() {
        return this.memo.markdown;
      },
      set(value) {
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
.textarea-head {
  text-align: center;
}
.textarea-wrap {
  width: 50%;
}
.preview-head {
  text-align: center;
}
.preview-wrap {
  width: 50%;
  text-align: left;
}
</style>
