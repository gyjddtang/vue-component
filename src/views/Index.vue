<!--
  - Created by Mili on 2017/8/23
 -->

<template lang="html">
  <div class="indexContainer">
    <img src="../assets/logo.png" />
    <h2>Welcome to Mili's Vue Component</h2>
    <router-link to="clip">imageClip</router-link>
    <router-link to="canvas">canvas</router-link>
    <router-link to="popover">popConfirm</router-link>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style>
  .indexContainer {
    text-align: center;
  }

  .indexContainer h2 {
    margin-bottom: 30px;
  }

  .indexContainer a {
    margin: 5px;
  }
</style>
