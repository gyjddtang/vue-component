<!--
  - Created by Mili on 2017/8/15
 -->

<template lang="html">
  <div class="clipTest">
    <input type="file" @change="change" :multiple="false" ref="input">
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
//        imgSrc: require('../assets/image2.jpg'),
        imgSrc: '',
        clipSrc: void 0
      }
    },
    methods: {
      change (e) {
        const files = e.target.files
        if (!files) return
        let postFiles = Array.prototype.slice.call(files)
        if (postFiles.length === 0) return
        let _self = this
        let render = new FileReader()
        render.readAsDataURL(postFiles[0])
        render.onload = function (e) {
          _self.imgSrc = e.target.result
          _self.$refs.input.value = ''
          console.log(_self.$refs.input.value)
        }
      },

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
