/**
 * Created by Mili on 2017/8/25.
 */

// 常见特殊符号转义字符
function strEscape (str) {
  str = str.replace(/&ldquo;/g, '“')
  str = str.replace(/&rdquo;/g, '”')
  str = str.replace(/&lsquo;/g, '‘')
  str = str.replace(/&rsquo;/g, '’')
  str = str.replace(/&quot;/g, '"')
  str = str.replace(/&#039;/g, "'")
  str = str.replace(/&lt;/g, '<')
  str = str.replace(/&gt;/g, '>')
  str = str.replace(/&hellip;&hellip;/g, '……')
  str = str.replace(/&mdash;&mdash;/g, '——')
  str = str.replace(/&amp;/g, '&')
  return str
}

// 唯一key值
function getKey () {
  let res = ''
  for (let i = 0; i < 32; i++) {
    res = res + Math.floor(Math.random() * 16).toString(16)
  }
  return res
}

// 元素获取style
function getStyle (ele) {
  if (document.documentElement.currentStyle) {
    return ele.currentStyle
  } else {
    return document.defaultView.getComputedStyle(ele, null)
  }
}

// time
function timeFormat (stamp, isYear) {
  if (!stamp) return
  let date = new Date(stamp)
  let y = date.getFullYear() + '.'
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m + '.' : m + '.'
  let d = date.getDate()
  d = d < 10 ? '0' + d : d

  let h = date.getHours()
  h = h < 10 ? '0' + h : '' + h
  let mi = date.getMinutes()
  mi = mi < 10 ? '0' + mi : '' + mi
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : '' + s

  if (isYear === 'year') {
    return y + m + d
  } else {
    return y + m + d + ' ' + h + ':' + mi + ':' + s
  }
}

// money
function moneyFormat (money) {
  if (money) {
    return '¥' + (Number(money) / 100).toFixed(2)
  } else {
    return '¥0.00'
  }
}

// 判断参数是否是其中之一
function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export { strEscape, getKey, timeFormat, getStyle, moneyFormat, oneOf }
