import {
  testapi
} from '../../../apis/index.js';
Page({
  data: {
    ajax_data: '',
    v_data: [{
      title: '123',
      time: "123"
    }, {
      title: '123',
      time: "123"
    }, {
      title: '123',
      time: "123"
    }, {
      title: '123',
      time: "123"
    }, {
      title: '123',
      time: "123"
    }]
  },
  onLoad() {
    testapi.getsatinApi();
  },

  // 搜索框点击完成
  confirm: (data) => {
    data.detail.detail.value
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    console.log("下拉刷新")
    wx.stopPullDownRefresh();
  },
  todetail: data => {
    console.log(data.currentTarget.dataset.item);
    wx.navigateTo({
      url: `../detail/index?item=` + JSON.stringify(data)
    })
  }


})