<template>
<div id="terms">
  <h1>Terms of Use</h1>
  <p>texttexttexttext</p>
  <!--somehow when use {name:'top'}, it doesn't work well.-->
  <router-link :to="{path:'/'}">back to Top</router-link>
</div>
</template>

<script>
export default {
  name: "MyTerms"
};
</script>
