<!--
  - Created by Mili on 2017/8/28
 -->

<template lang="html">
  <div class="imageViewerMask" v-if="visible">
    <div class="imageViewer">
      <div v-if="items.length > 1" class="switchBt" @click="prev"><em></em></div>
      <ul class="swiper" ref="swiper">
        <li v-for="(item, index) of items" :style="{left: item.left + 'px', background: item.loading ? 'transparent' : `url(${item.url})`, opacity: item.opacity}">
          <div v-if="item.loading" class="loading"></div>
        </li>
      </ul>
      <div v-if="items.length > 1" class="switchBt" @click="next"><em></em></div>
    </div>
    <div class="closeBt" @click="hideLayer"><em></em></div>
  </div>
</template>

<script>
  export default {
    name: 'imageViewer',
    props: {
      visible: Boolean,
      url: {
        type: Array,
        validator (val) {
          return val.length > 0
        }
      },
      initCurrent: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        items: [],
        swiperW: 0,
        onlyTwo: false
      }
    },
    watch: {
      visible: function (val) {
        if (val) {
          setTimeout(() => {
            this.swiperW = this.$refs.swiper.offsetWidth
            this.initItems()
          }, 80)
        } else {
          this.items = []
        }
      }
    },
    methods: {
      initItems () {
        // 优先加载 initCurrent 图片
        let img = new Image()
        img.src = this.url[this.initCurrent - 1]

        this.url.map((ele, index) => {
          let _temp = {}
          _temp.left = (index + 1 - this.initCurrent) * this.swiperW
          _temp.flag = index + 1
          _temp.opacity = 1
          _temp.loading = true
          let _img = new Image()
          _img.src = ele
          _img.onload = function () {
            _temp.url = ele
            _temp.loading = false
          }
          this.items.push(_temp)
        })
        // items长度为 1或2
        if (this.items.length <= 2) {
          this.onlyTwo = true
          return
        }
        // initCurrent 开始和末位移动补齐
        if (this.initCurrent === 1) {   // initCurrent首位补齐前一位
          this.items[this.items.length - 1].left = -this.swiperW
        } else if (this.initCurrent === this.items.length) {   // initCurrent末位补齐后一位
          this.items[0].left = this.swiperW
        }
      },

      // 只有两项
      setItems () {
        let w = this.swiperW
        let val1 = this.items[0].left
        let val2 = this.items[1].left
        this.items.map(ele => {
          if (val1 === w || val2 === w) {
            ele.left -= w
          } else if (val1 === -w || val2 === -w) {
            ele.left += w
          }
        })
      },

      prevItems () {
        let n = this.initCurrent
        let len = this.items.length
        let w = this.swiperW
        let step = (len - 1) * w
        let lastVal   // 最后一位的left值
        if (n === 1) {   // initCurrent为 1
          lastVal = (len - 1 - n) * w
        } else if (n === len) {   // initCurrent为 末位
          lastVal = (len + 1 - n) * w
        } else {
          lastVal = (len - n) * w
        }
        this.items.map(ele => {
          if (ele.left === lastVal) {
            ele.left -= step   // 最后一位移至第一位
            ele.opacity = 0   // 隐藏移动中的最后一位
            setTimeout(() => {
              ele.opacity = 1
            }, 300)
          } else {
            ele.left += w   // 其余项右移一位
          }
        })
      },

      nextItems () {
        let n = this.initCurrent
        let len = this.items.length
        let w = this.swiperW
        let step = (len - 1) * w
        let firstVal   // 第一位left值
        if (n === 1) {   // initCurrent为 1
          firstVal = (1 - n - 1) * w
        } else if (n === len) {   // initCurrent为 末位
          firstVal = (1 - n + 1) * w
        } else {
          firstVal = (1 - n) * w
        }
        this.items.map(ele => {
          if (ele.left === firstVal) {
            ele.left += step   // 第一位移至最后一位
            ele.opacity = 0   // 隐藏移动中的第一位
            setTimeout(() => {
              ele.opacity = 1
            }, 300)
          } else {
            ele.left -= w   // 其余项左移一位
          }
        })
      },

      hideLayer () {
        this.$emit('update:visible', false)
      },

      prev () {
        if (this.onlyTwo) {
          this.setItems()
        } else {
          this.prevItems()
        }
      },

      next () {
        if (this.onlyTwo) {
          this.setItems()
        } else {
          this.nextItems()
        }
      }
    }
  }
</script>

<style>
  .imageViewerMask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(41, 42, 44, .6);
    z-index: 1000;
  }

  .imageViewer {
    width: 75%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .imageViewer .swiper {
    width: calc(100% - 232px);
    height: calc(100% - 80px);
    margin: 40px 50px;
    position: relative;
    overflow: hidden;
  }

  .imageViewer .swiper li {
    background-repeat: no-repeat !important;
    background-size: contain !important;
    background-position: center center !important;
    list-style: none;
    width: 100%;
    height: 100%;
    transition: left .3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
  }

  .imageViewer .swiper li .loading {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid;
    border-color: #fff transparent;
    animation: loading 1s infinite;
  }

  .imageViewer .switchBt {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color .2s;
  }

  .imageViewer .switchBt:hover {
    background: #373839;
  }

  .imageViewer .switchBt em {
    width: 20px;
    height: 20px;
    transform: rotate(-45deg);
  }
  .imageViewer .switchBt:last-of-type em {
    transform: rotate(135deg);
  }


  .imageViewer .switchBt em::before {
    content: "";
    display: block;
    width: 26px;
    height: 4px;
    background: #fff;
    border-radius: 2px;
  }

  .imageViewer .switchBt em::after {
    content: "";
    display: block;
    width: 26px;
    height: 4px;
    background: #fff;
    border-radius: 2px;
    transform-origin: 4px 0;
    transform: rotate(90deg);
  }

  .imageViewerMask .closeBt {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #373839;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 40px;
    right: 40px;
  }

  .imageViewerMask .closeBt em {
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transform: rotate(-45deg);
    transition: background-color .2s;
  }

  .imageViewerMask .closeBt em::after {
    content: "";
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transform: rotate(90deg);
    transition: background-color .2s;
  }

  .imageViewerMask .closeBt:hover em,
  .imageViewerMask .closeBt:hover em::after {
    background: #20a0ff;
  }

  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
