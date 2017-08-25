<!--
  - Created by Mili on 2017/8/24
 -->

<template lang="html">
  <ul>
    <li v-for="n in 6">
      <popConfirm
        title="提示"
        content="确定删除此条数据吗？"
        trigger="confirm"
        placement="top-end"
        popClass="pop"
        @ok="delComfirm"
      >
        <a href="javascript:;" class="deleteBt" slot="reference">删除</a>
      </popConfirm>
    </li>
  </ul>
</template>

<script>
  import popConfirm from '../components/PopConfirm'

  export default {
    name: 'popover',
    components: {
      popConfirm
    },
    methods: {
      delComfirm () {
        console.log('delete')
      }
    }
  }
</script>

<style>
  ul {
    padding: 50px 200px;
  }

  ul li {
    list-style: none;
    margin-bottom: 10px;
    height: 30px;
  }

  li .pop {
    float: right;
    margin-right: 50%;
  }

  li .pop .image {
    width: 500px;
    display: block;
  }

  li .pop .deleteBt {
    text-decoration: none;
  }
</style>
