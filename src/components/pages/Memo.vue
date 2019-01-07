<template>
<div id="memoDetail">
  <!-- 
    somehow it doesn't work
    <v-textarea class="markdown" v-model="memoObj.markdown"></v-textarea> 
    -->
  <v-textarea class="markdown" v-model="memo.markdown"></v-textarea>
  <div class="preview markdown-body" v-html="preview()"></div>
</div>
</template>
<script>
import marked from "marked";

export default {
  name: "MyMemo",
  props: ["memo"],
  data() {
    return {
      memoObj: this.memo
    };
  },
  mounted() {
    console.log(`mounted`);
    console.log(this.memo.markdown);
    console.log(this.memoObj.markdown);
  },
  updated() {
    console.log(`updated`);
    console.log(this.memo.markdown);
    console.log(this.memoObj.markdown);
  },
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
