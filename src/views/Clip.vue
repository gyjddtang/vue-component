<!--
  - Created by Mili on 2017/8/15
 -->

<template lang="html">
  <div class="clipTest">
    <ImageClip :src="imgSrc" @success="clipResult" @cancel="cancel" />
    <img :src="clipSrc">
  </div>
</template>

<script>
  import ImageClip from '../components/ImageClip'

  export default {
    name: 'clipTest',
    components: {
      ImageClip
    },
    data () {
      return {
        imgSrc: require('../assets/image.jpg'),
        clipSrc: void 0
      }
    },
    methods: {
      clipResult ({ base64, blob }) {
        this.clipSrc = base64
        console.log(blob)
      },

      cancel () {
        this.clipSrc = null
      }
    }
  }
</script>

<style scoped>
  .clipTest {
    width: 600px;
    margin: 0 auto;
  }
</style>
