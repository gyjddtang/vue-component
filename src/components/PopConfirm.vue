<!--
  - Created by Mili on 2017/8/23
 -->

<template lang="html">
  <div :class="['popConfirm', popClass]" @mouseenter="handleEvent" @mouseleave="handleEvent">
    <div class="poplayer" :data-placement="placement" v-show="visible">
      <h5 v-if="title" class="title">{{ title }}</h5>
      <p v-if="content">{{ content }}</p>
      <div v-if="trigger === 'confirm'" class="buttonBox">
        <button @click="togglePop">取消</button>
        <button @click="confirm">确定</button>
      </div>
      <slot></slot>
      <div class="popArrow"></div>
    </div>
    <div class="popHandle" @click="handleClick">
      <slot name="reference"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'popConfirm',
    props: {
      popClass: String,
      title: String,
      content: String,
      trigger: {
        type: String,
        default: 'hover',
        validator (val) {
          return ['click', 'hover', 'confirm'].indexOf(val) > -1
        }
      },
      placement: {
        type: String,
        default: 'top',
        validator (val) {
          return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(val) > -1
        }
      }
    },
    data () {
      return {
        visible: false
      }
    },
    watch: {
      visible: function (val) {
        if (!val) {
          this.removeListener()
        }
      }
    },
    brforeDestroy () {
      this.removeListener()
    },
    methods: {
      handleClick () {
        if (this.trigger === 'hover') return
        this.visible = true
        document.addEventListener('mousedown', this.documentClick)
      },

      removeListener () {
        document.removeEventListener('mousedown', this.documentClick)
      },

      handleEvent () {
        if (this.trigger === 'click' || this.trigger === 'confirm') return
        this.togglePop()
      },

      confirm () {
        this.$emit('ok')
        this.togglePop()
      },

      togglePop () {
        this.visible = !this.visible
      },

      documentClick (e) {
        if (this.$el.contains(e.target)) return
        this.togglePop()
      }
    }
  }
</script>

<style>
  .popConfirm {
    position: relative;
  }

  .popConfirm .poplayer {
    font-size: 12px;
    padding: 10px;
    min-width: 180px;
    max-width: 500px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .2);
  }

  .popConfirm .poplayer .title {
    margin-bottom: 5px;
  }

  .popConfirm .poplayer .buttonBox {
    overflow: hidden;
    margin-top: 15px;
  }

  .popConfirm .poplayer .popArrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: #fff;
  }

  .popConfirm .poplayer .buttonBox button {
    float: right;
    width: 40px;
    line-height: 20px;
    margin-left: 10px;
  }

  /*top*/
  .popConfirm .poplayer[data-placement^='top'] {
    bottom: calc(100% + 6px);
  }

  .popConfirm .poplayer[data-placement^='top'] .popArrow {
    bottom: -10px;
  }

  .popConfirm .poplayer[data-placement='top'] {
    left: 50%;
    transform: translateX(-50%);
  }

  .popConfirm .poplayer[data-placement='top'] .popArrow {
    left: calc(50% - 5px);
  }

  .popConfirm .poplayer[data-placement='top-start'] {
    left: 0;
  }

  .popConfirm .poplayer[data-placement='top-start'] .popArrow {
    left: 12px;
  }

  .popConfirm .poplayer[data-placement='top-end'] {
    right: 0;
  }

  .popConfirm .poplayer[data-placement='top-end'] .popArrow {
    right: 12px;
  }

  /*bottom*/
  .popConfirm .poplayer[data-placement^='bottom'] {
    top: calc(100% + 6px);
  }

  .popConfirm .poplayer[data-placement^='bottom'] .popArrow {
    transform: rotateZ(180deg);
    top: -10px
  }

  .popConfirm .poplayer[data-placement='bottom'] {
    left: 50%;
    transform: translateX(-50%);
  }

  .popConfirm .poplayer[data-placement='bottom'] .popArrow {
    left: calc(50% - 5px);
  }

  .popConfirm .poplayer[data-placement='bottom-start'] {
    left: 0;
  }

  .popConfirm .poplayer[data-placement='bottom-start'] .popArrow {
    left: 12px;
  }

  .popConfirm .poplayer[data-placement='bottom-end'] {
    right: 0;
  }

  .popConfirm .poplayer[data-placement='bottom-end'] .popArrow {
    right: 12px;
  }

  /*left*/
  .popConfirm .poplayer[data-placement^='left'] {
    right: calc(100% + 10px);
  }

  .popConfirm .poplayer[data-placement^='left'] .popArrow {
    transform: rotateZ(-90deg);
    right: -10px;
  }

  .popConfirm .poplayer[data-placement='left'] {
    top: 50%;
    transform: translateY(-50%);
  }

  .popConfirm .poplayer[data-placement='left'] .popArrow {
    top: calc(50% - 5px);
  }

  .popConfirm .poplayer[data-placement='left-start'] {
    top: 0;
  }

  .popConfirm .poplayer[data-placement='left-start'] .popArrow {
    top: 10px;
  }

  .popConfirm .poplayer[data-placement='left-end'] {
    bottom: 0;
  }

  .popConfirm .poplayer[data-placement='left-end'] .popArrow {
    bottom: 10px;
  }

  /*right*/
  .popConfirm .poplayer[data-placement^='right'] {
    left: calc(100% + 10px);
  }

  .popConfirm .poplayer[data-placement^='right'] .popArrow {
    transform: rotateZ(90deg);
    left: -10px;
  }

  .popConfirm .poplayer[data-placement='right'] {
    top: 50%;
    transform: translateY(-50%);
  }

  .popConfirm .poplayer[data-placement='right'] .popArrow {
    top: calc(50% - 5px);
  }

  .popConfirm .poplayer[data-placement='right-start'] {
    top: 0;
  }

  .popConfirm .poplayer[data-placement='right-start'] .popArrow {
    top: 10px;
  }

  .popConfirm .poplayer[data-placement='right-end'] {
    bottom: 0;
  }

  .popConfirm .poplayer[data-placement='right-end'] .popArrow {
    bottom: 10px;
  }
</style>
