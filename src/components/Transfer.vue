<!--
  - Created by Mili on 2017/11/14
 -->

<template lang="html">
  <div class="transferContainer">
    <div class="transferPanel">
      <div class="header">
        <span class="title">数据列表 ({{ checkList.length }})</span>
        <a href="javascript:;" class="all" @click="addAll">全部添加</a>
      </div>
      <div class="searchBar" v-if="showSearch">
        <img src="../assets/search.png" alt="icon" class="searchIcon">
        <input type="text" v-model.trim="leftSearch" @keyup.enter="leftSearchTap" :placeholder="placeholder" class="searchInput">
      </div>
      <ul class="body" @scroll="scroll">
        <li class="item" v-for="(item, index) of checkList" @click="listItemClick(item, index)" :key="'checkList' + index">
          <img :src="item.select ? checked : checkbox" alt="check" class="icon">
          <p :style="{ color: item.select ? '#1296db' : '#666' }">{{ item.data }}</p>
        </li>
        <li class="item" v-if="checkList.length === 0">无数据</li>
      </ul>
    </div>
    <img src="../assets/arrow.png" alt="arrow" class="rightArrow">
    <div class="transferPanel">
      <div class="header">
        <span class="title">已选列表 ({{ checkedList.length }})</span>
        <a href="javascript:;" class="all" @click="removeAll">全部移除</a>
      </div>
      <div class="searchBar" v-if="showSearch">
        <img src="../assets/search.png" alt="icon" class="searchIcon">
        <input type="text" v-model.trim="rightSearch" @keyup.enter="rightSearchTap" @blur="rightSearchBlur" :placeholder="placeholder" class="searchInput">
      </div>
      <ul class="body">
        <li class="item" v-for="(item, index) of rightListSource" @click="checkedListClick(item, index)" :key="'checkedList' + index">
          <img :src="item.select ? checked : checkbox" alt="check" class="icon">
          <p :style="{ color: item.select ? '#1296db' : '#666' }">{{ item.data }}</p>
        </li>
        <li class="item" v-if="rightListSource.length === 0">无数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'transfer',
    props: {
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      },
      loadMoreThreshold: {
        type: Number,
        default: 60
      },
      dataSource: Array,
      showSearch: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        checkbox: require('../assets/check_box.png'),
        checked: require('../assets/check_select.png'),
        checkList: [],
        checkedList: [],
        searchCheckedList: [],
        leftSearch: void 0,
        rightSearch: void 0,
        rightIsSearch: false
      }
    },
    computed: {
      rightListSource () {
        return this.rightIsSearch ? this.searchCheckedList : this.checkedList
      }
    },
    watch: {
      dataSource (val) {
        this.checkList = [ ...val ]
      },

      checkedList (val) {
        this.$emit('change', val)
        this.setSearchCheckedList()
      }
    },
    methods: {
      scroll (e) {
        let { scrollHeight, scrollTop, clientHeight } = e.target
        let footer = scrollHeight - scrollTop - clientHeight
        if (footer === 0) {
          this.$emit('loadMore')
        }
      },

      leftSearchTap () {
        this.$emit('searchChange', this.leftSearch)
      },

      rightSearchTap () {
        if (this.rightSearch) {
          this.setSearchCheckedList()
          this.rightIsSearch = true
        } else {
          this.rightIsSearch = false
        }
      },

      setSearchCheckedList () {
        this.searchCheckedList = []
        this.checkedList.map((ele, index) => {
          if (ele.data.indexOf(this.rightSearch) !== -1) {
            this.searchCheckedList.push({ ...ele })
          }
        })
      },

      rightSearchBlur (e) {
        if (this.rightSearch) {
          this.rightIsSearch = true
        } else {
          this.rightIsSearch = false
        }
      },

      listItemClick (item, index) {
        if (item.select) {
          this.checkList.splice(index, 1, { ...item, select: false })
          this.checkedList.map((ele, index) => {
            if (ele.data === item.data) {
              this.checkedList.splice(index, 1)
              return
            }
          })
        } else {
          this.checkList.splice(index, 1, { ...item, select: true })
          this.checkedList.push({ ...item, select: true })
        }
      },

      checkedListClick (item, index) {
        if (this.rightIsSearch) {
          this.searchCheckedList.splice(index, 1)
          this.checkedList.map((ele, index) => {
            if (ele.data === item.data) {
              this.checkedList.splice(index, 1)
            }
            return
          })
        } else {
          this.checkedList.splice(index, 1)
        }
        this.checkList.map((ele, index) => {
          if (ele.data === item.data) {
            this.checkList.splice(index, 1, { ...item, select: false })
          }
          return
        })
      },

      addAll () {
        this.checkList.map((ele, index) => {
          this.checkList.splice(index, 1, { ...ele, select: true })
        })
        this.checkedList = [ ...this.checkList ]
      },

      removeAll () {
        this.checkedList = []
        this.searchCheckedList = []
        this.checkList = [ ...this.dataSource ]
      }
    }
  }
</script>

<style>
  .transferContainer {
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .transferPanel {
    flex: 1;
    border: 1px solid rgb(209, 219, 229);
    border-radius: 4px;
  }

  .transferPanel .header {
    border-bottom: 1px solid rgb(209, 219, 229);
    line-height: 36px;
    background: rgb(251, 253, 255);
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .transferPanel .header .title {
    flex: 1;
  }

  .transferPanel .header .all {
    text-decoration: none;
    font-size: 14px;
    color: #1296db;
  }

  .transferPanel .searchBar {
    margin: 15px 0;
    position: relative;
  }

  .transferPanel .searchBar .searchIcon {
    width: 16px;
    position: absolute;
    top: 50%;
    left: calc(50% - 100px);
    transform: translate(10px, -50%);
  }

  .transferPanel .searchBar .searchInput {
    border: none;
    outline: none;
    width: 200px;
    margin: 0 auto;
    height: 30px;
    border-radius: 15px;
    border: 1px solid rgb(209, 219, 229);
    padding-left: 30px;
    display: block;
    box-sizing: border-box;
  }

  .transferPanel .searchBar .searchInput:focus {
    border-color: #1296db;
  }

  .transferPanel .body {
    height: 246px;
    overflow-y: auto;
    background: #fff;
  }

  .transferPanel .body .item {
    cursor: pointer;
    min-height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
  }

  .transferPanel .body .item:hover {
    color: #1296db;
  }

  .transferPanel .body .item .icon {
    width: 14px;
    display: block;
    margin-right: 10px;
  }

  .transferContainer .rightArrow {
    width: 30px;
    margin: 0 20px;
  }
</style>
