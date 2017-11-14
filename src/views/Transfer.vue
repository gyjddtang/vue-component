<!--
  - Created by Mili on 2017/11/14
 -->

<template lang="html">
  <section class="transferView">
    <Transfer
      :dataSource="data"
      @loadMore="loadMore"
      @change="change"
      @searchChange="searchChange"
    />
  </section>
</template>

<script>
  import Transfer from '../components/Transfer'
  export default {
    name: 'transferView',
    components: {
      Transfer
    },
    data () {
      return {
        data: [],
        index: 0
      }
    },
    mounted () {
      this.setData()
    },
    methods: {
      loadMore () {
        console.log('loadMore')
        setTimeout(() => {
          if (this.index >= 50) return
          this.setData()
        }, 1000)
      },

      change (val) {
        console.log(val)
      },

      searchChange (val) {
        console.log(val)
      },

      setData () {
        for (let i = 0; i < 20; i++) {
          this.index++
          this.data.push({
            data: `第${this.index}条数据`
          })
        }
      }
    }
  }
</script>

<style>
  .transferView {
    width: 600px;
    height: 500px;
  }
</style>
