<!--
  - Created by Mili on 2017/11/14
 -->

<template lang="html">
  <Transfer
    :dataSource="data"
    :defaultChecked.sync="defaultChecked"
    @loadMore="loadMore"
    @change="change"
    @searchChange="searchChange"
  />
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
        defaultChecked: [],
        index: 0
      }
    },
    mounted () {
      this.setData()
      this.data.map((ele, index) => {
        if (index % 3 === 0) {
          this.defaultChecked.push({ ...ele })
        }
      })
      this.defaultChecked.push({
        label: `第25条数据`,
        key: 25,
        disabled: false
      })
      this.defaultChecked.push({
        label: `第40条数据`,
        key: 40,
        disabled: false
      })
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
            label: `第${this.index}条数据`,
            key: this.index,
            disabled: i === 5
          })
        }
      }
    }
  }
</script>

<style>

</style>
