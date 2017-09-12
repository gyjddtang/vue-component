<!--
  - Created by Mili on 2017/8/15
 -->

<template lang="html">
  <div class="imageClip">
    <div
      class="imgSourceBox"
      ref="imgDragBox"
      @mousedown.prevent="imgDragStart"
    >
      <img class="imgSource" :src="src" :style="imgSourceStyle" ref="image">
      <canvas ref="canvas" width="600" height="400"></canvas>
      <canvas ref="clipCvs" :width="clipSize" :height="clipSize"></canvas>
    </div>
    <div class="handleBox">
      <div class="handleBt" @click="minusBtClick">
        <div class="minus"></div>
      </div>
      <div class="sliderBox" :style="sliderBoxStyle" ref="sliderBox">
        <div
          :class="['slider', { dragging: sliderDragging }]"
          @mousedown.prevent="sliderStart"
          :style="sliderStyle"
        ></div>
      </div>
      <div class="handleBt" @click="plusBtClick">
        <div class="plus"></div>
      </div>
    </div>
    <div class="clipHandle">
      <button @click="clipClick">确定</button>
      <button @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'imageClip',
    props: {
      src: String
    },
    data () {
      return {
        sliderPre: 0,   // slider百分比
        sliderPos: 0,   // slider滑动到的新位置
        sliderStartX: 0,   // slider开始滑动的位置
        sliderMaxX: 480,
        sliderDragging: false,
        imgStartXY: {   // img开始移动的位置
          x: 0,
          y: 0
        },
        imgLastXY: {   // img停止移动时的位置
          x: 0,
          y: 0
        },
        imgNewXY: {   // img移动到的新位置
          x: 0,
          y: 0
        },
        clipSize: 360   // 裁剪尺寸
      }
    },
    computed: {
      sliderBoxStyle: function () {
        let pre = this.sliderPre * 100
        return {
          background: `linear-gradient(90deg, #4db3ff ${pre}%, #F1F6FA ${pre}%)`
        }
      },

      sliderStyle: function () {
        return {
          left: `${this.sliderMaxX * this.sliderPre - 10}px`
        }
      },

      imgSourceStyle: function () {
        return {
          transform: `translate(${this.imgNewXY.x}px, ${this.imgNewXY.y}px) scale(${parseFloat(this.sliderPre) + 0.5})`
        }
      }
    },
    mounted () {
      // 设置初始值
      this.sliderMaxX = this.$refs.sliderBox.offsetWidth
      this.sliderPre = 0.5
      this.sliderPos = this.sliderMaxX * this.sliderPre
      this.initCanvas()
    },
    methods: {
      imgDragStart (e) {
        this.imgStartXY.x = e.clientX
        this.imgStartXY.y = e.clientY
        this.$refs.imgDragBox.addEventListener('mousemove', this.imgDraging)
        this.$refs.imgDragBox.addEventListener('mouseup', this.imgDragEnd)
        this.$refs.imgDragBox.addEventListener('mouseleave', this.imgDragEnd)
      },

      imgDraging (e) {
        this.imgNewXY.x = this.imgLastXY.x + e.clientX - this.imgStartXY.x
        this.imgNewXY.y = this.imgLastXY.y + e.clientY - this.imgStartXY.y
      },

      imgDragEnd (e) {
        this.$refs.imgDragBox.removeEventListener('mousemove', this.imgDraging)
        this.$refs.imgDragBox.removeEventListener('mouseup', this.imgDragEnd)
        this.$refs.imgDragBox.removeEventListener('mouseleave', this.imgDragEnd)
        let translate = this.getTranslate(this.$refs.image)
        this.imgLastXY.x = parseFloat(translate.x)
        this.imgLastXY.y = parseFloat(translate.y)
      },

      getTranslate (ele) {
        let transform = ele.style.transform.split(' ')
        return {
          x: Number(transform[0].slice(10, transform[0].length - 3)),
          y: Number(transform[1].slice(0, transform[1].length - 3)),
          scale: Number(transform[2].slice(6, transform[2].length - 1))
        }
      },

      sliderStart (e) {
        if (this.dragging) return
        this.sliderDragging = true
        this.sliderStartX = e.clientX
        window.addEventListener('mousemove', this.sliderDargging)
        window.addEventListener('mouseup', this.sliderEnd)
      },

      sliderDargging (e) {
        let left = this.sliderPos + e.clientX - this.sliderStartX
        if (left <= 0) {
          this.sliderPre = 0
        } else if (left >= this.sliderMaxX) {
          this.sliderPre = 1
        } else {
          this.sliderPre = parseFloat((left / this.sliderMaxX).toFixed(3))
        }
      },

      sliderEnd (e) {
        this.sliderDragging = false
        window.removeEventListener('mousemove', this.sliderDargging)
        window.removeEventListener('mouseup', this.sliderEnd)

        let left = this.sliderPos + e.clientX - this.sliderStartX
        if (left <= 0) {
          this.sliderPos = 0
        } else if (left >= this.sliderMaxX) {
          this.sliderPos = this.sliderMaxX
        } else {
          this.sliderPos = left
        }
      },

      plusBtClick () {
        if (this.sliderPre > 0.99 && this.sliderPre < 1) {
          this.sliderPre = 1
          this.sliderPos = this.sliderMaxX
        } else if (this.sliderPre <= 0.99) {
          this.sliderPre = (parseFloat(this.sliderPre) + 0.01).toFixed(3)
          this.sliderPos = this.sliderMaxX * this.sliderPre
        }
      },

      minusBtClick () {
        if (this.sliderPre < 0.01 && this.sliderPre > 0) {
          this.sliderPre = 0
          this.sliderPos = 0
        } else if (this.sliderPre >= 0.01) {
          this.sliderPre = (parseFloat(this.sliderPre) - 0.01).toFixed(3)
          this.sliderPos = this.sliderMaxX * this.sliderPre
        }
      },

      initCanvas () {
        // 遮罩层
        let w = this.$refs.canvas.width
        let h = this.$refs.canvas.height
        let ctx = this.$refs.canvas.getContext('2d')
        ctx.save()
        ctx.fillStyle = 'rgba(0, 0, 0, .4)'
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        ctx.arc(w / 2, h / 2, this.clipSize / 2, 0, 2 * Math.PI)
        ctx.fill()
      },

      clipClick () {
        let clipCvs = this.$refs.clipCvs
        let ctx = clipCvs.getContext('2d')
        let image = this.$refs.image
        let transform = this.getTranslate(image)
        let w = image.width * transform.scale
        let h = image.height * transform.scale
        let dx = -(w / 2) + transform.x + this.clipSize / 2
        let dy = -(h / 2) + transform.y + this.clipSize / 2
        ctx.restore()   // 重置到最近保存属性
        ctx.clearRect(0, 0, this.clipSize, this.clipSize)   // 清除画布
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.clipSize / 2, this.clipSize / 2, this.clipSize / 2, 0, 2 * Math.PI)
        ctx.clip()
        ctx.drawImage(image, dx, dy, w, h)
        // 返回结果
        clipCvs.toBlob(res => {
          this.$emit('success', { base64: clipCvs.toDataURL(), blob: res })
        })
      },

      cancel () {
        let ctx = this.$refs.clipCvs.getContext('2d')
        ctx.restore()
        ctx.clearRect(0, 0, this.clipSize, this.clipSize)
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>
  .imageClip {
    width: 600px;
  }

  .imgSourceBox {
    width: 100%;
    height: 400px;
    overflow: hidden;
    background: #fff;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    cursor: grab;
    user-select: none;
    position: relative;
    overflow: hidden;
  }

  .imgSourceBox canvas:first-of-type {
    position: absolute;
    top: 0;
    left: 0;
  }

  .imgSourceBox canvas:last-of-type {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
  }

  .imgSource {
    display: block;
    user-select: none;
  }

  .handleBox {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .handleBt {
    width: 40px;
    height: 40px;
    border: 1px solid #E1E6EB;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .handleBt:hover {
    border-color: #4db3ff;
  }

  .handleBt .minus {
    width: 16px;
    height: 2px;
    background: #5F6369;
  }

  .handleBt .plus {
    width: 2px;
    height: 16px;
    background: #5F6369;
  }

  .handleBt .plus::after {
    content: "";
    display: block;
    width: 16px;
    height: 2px;
    background: #5F6369;
    transform: translate(-7px, 7px);
  }

  .handleBt:hover .minus,
  .handleBt:hover .plus,
  .handleBt:hover .plus::after {
    background: #4db3ff;
  }

  .sliderBox {
    width: 480px;
    height: 6px;
    border-radius: 8px;
    position: relative;
  }

  .slider {
    background: linear-gradient(-180deg, #FFFFFF 0%, #F0F5F9 97%);
    border: 1px solid #E1E6EB;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    top: calc(50% - 10px);
    user-select: none;
    cursor: grab;
  }

  .slider:hover {
    transform: scale(1.25);
    background: linear-gradient(-180deg, #FFFFFF 0%, #4db3ff 97%);
    border-color: #4db3ff;
  }

  .slider.dragging {
    transform: scale(1.25);
    background: linear-gradient(-180deg, #FFFFFF 0%, #4db3ff 97%);
    border-color: #4db3ff;
    cursor: grabbing;
  }

  .clipHandle {
    margin-top: 40px;
  }

  .clipHandle button {
    width: 80px;
    line-height: 30px;
    margin-right: 10px;
  }
</style>
