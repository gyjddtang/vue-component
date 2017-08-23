<!--
  - Created by Mili on 2017/8/21
 -->

<template lang="html">
  <div class="canvasContainer">
    <div class="imgSourceBox">
      <img :src="imgSrc" class="imgSource" ref="imageSource" />
      <canvas ref="canvasImg" width="600" height="400"></canvas>
    </div>
    <div class="canvasBox">
      <img :src="imgSrc" class="imgSource" />
      <canvas ref="canvas" width="600" height="400"></canvas>
    </div>
    <div class="canvasBox">
      <canvas ref="canvas1" width="200" height="200"></canvas>
    </div>
    <img :src="clipSrc" alt="">
  </div>
</template>

<script>
  export default {
    name: 'canvas',
    data () {
      return {
        imgSrc: require('../assets/image.jpg'),
        clipSrc: void 0
      }
    },
    mounted () {
      this.ctx1()
      this.ctx2()
      this.ctx3()
    },
    methods: {
      ctx1 () {
        let cxtImg = this.$refs.canvasImg.getContext('2d')
        // 三角形
        cxtImg.beginPath()
        cxtImg.moveTo(50, 50)
        cxtImg.lineTo(100, 100)
        cxtImg.lineTo(50, 150)
        cxtImg.closePath()
        cxtImg.strokeStyle = '#ff2169'
        cxtImg.fillStyle = '#fff'
        cxtImg.stroke()
        cxtImg.fill()
        // 圆
        cxtImg.beginPath()
        cxtImg.arc(300, 100, 50, 0, 2 * Math.PI)
        cxtImg.fill()
      },
      ctx2 () {
        let ctx = this.$refs.canvas.getContext('2d')
        ctx.save()
        ctx.fillStyle = 'rgba(0 ,0, 0, .4)'
        ctx.fillRect(0, 0, 600, 400)
        ctx.restore()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillRect(100, 50, 200, 100)
      },
      ctx3 () {
        let image = new Image()
        let canvas = this.$refs.canvas1
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(100, 100, 100, 0, 2 * Math.PI)
        ctx.clip()
        image.src = this.imgSrc
        image.onload = () => {
          ctx.drawImage(image, -250, 0, 1200, 400)
          this.clipSrc = canvas.toDataURL()
          canvas.toBlob((blob) => {
            console.log(blob)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .canvasContainer {
    width: 600px;
    margin: 0 auto;
  }

  .imgSourceBox {
    width: 600px;
    height:400px;
    background: #e7f6ff;
    position: relative;
  }

  .imgSourceBox canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .imgSource {
    width: 600px;
    display: block;
  }

  .canvasBox {
    width: 600px;
    height: 400px;
    margin-top: 40px;
    background: #e7f6ff;
    position: relative;
  }

  .canvasBox canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
