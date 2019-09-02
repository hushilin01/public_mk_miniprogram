// pages/index/videodown/index.js
Page({
  data: {
    keyword: ''
  },
  // 输入框组件的值发生变化
  inputChange(e) {
    this.data.keyword = e.detail;
  },
  // 搜索框点击完成
  confirm: function (e) {
    this.data.keyword = e.detail;
  },
})