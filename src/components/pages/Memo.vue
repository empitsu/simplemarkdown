<template>
<div id="memoDetail">
  <v-textarea class="markdown" v-model="this.memo.markdown"></v-textarea>
  <div class="preview markdown-body" v-html="preview()"></div>
</div>
</template>
<script>
import marked from "marked";

export default {
  name: "MyMemo",
  props: ["memo"],
  methods: {
    preview() {
      return marked(this.memo.markdown);
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
