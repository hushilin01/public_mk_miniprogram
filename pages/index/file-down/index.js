// pages/index/videodown/index.js
Page({
  data: {
    show: false,
    videPath: 'http://wvideo.spriteapp.cn/video/2019/0828/5d6605930b9d0_wpd.mp4'
  },
  downVideo() {
    this.setData({
      show: true
    })
  }
})