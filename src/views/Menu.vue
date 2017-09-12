<!--
  - Created by Mili on 2017/8/31
 -->

<template lang="html">
  <div class="menuContainer">
    <SideBar />
    <div class="rightContainer">
      我是右边的内容<br>我是右边的内容<br>我是右边的内容
    </div>
  </div>
</template>

<script>
  import SideBar from '../components/SideBar'
  export default {
    name: 'menu',
    components: {
      SideBar
    }
  }
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
  }

  .menuContainer {
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .rightContainer {
    flex: 1;
    background: #e7f6ff;
  }
</style>
