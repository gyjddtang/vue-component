<!--
  - Created by Mili on 2017/8/28
 -->

<template lang="html">
  <div class="imgView">
    <p>浏览大图</p>
    <button @click="showView">点我预览图片</button>
    <ImageViewer :visible.sync="visible" :url="url" :initCurrent="1" />
  </div>
</template>

<script>
  import ImageViewer from '../components/ImageViewer'

  export default {
    name: 'imgView',
    components: {
      ImageViewer
    },
    data () {
      return {
        visible: false,
        url: [
          require('../assets/image1.png'),
          require('../assets/image2.jpg'),
          require('../assets/image3.jpg')
        ],
        current: 3
      }
    },
    methods: {
      showView () {
        this.visible = true
      }
    }
  }
</script>

<style>
  .imgView {

  }
</style>
