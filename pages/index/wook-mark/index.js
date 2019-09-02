// pages/index/videodown/index.js
Page({
  data: {
    // 图片的列表
    imglist: ['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1686908422,824545380&fm=26&gp=0.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567319624526&di=f15974d1381dc4d403a6a988eb4ee4ee&imgtype=0&src=http%3A%2F%2Fi3.sinaimg.cn%2Fgm%2F2013%2F1209%2FU7240P115DT20131209110946.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567319624525&di=b44409b8b5fdef1f1b7464d17d6e75c2&imgtype=0&src=http%3A%2F%2Fimages.17173.com%2F2013%2Flol%2F2013%2F11%2F15%2F20131115110320106.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567319624523&di=c69e6f754744e97c661668d381987e40&imgtype=0&src=http%3A%2F%2Fy0.ifengimg.com%2Fdbcc8e45854c158f%2F2015%2F0402%2Frdn_551cc05e7c91d.jpg'],
    // 文本
    textlist: ['长度比较短的的标题文字', '长度比较中等的标题文字长度比较中等的标题文字', '长度比较长的标题文字长度比较长的标题文字长度比较长的标题文字'],
    wooklist: [], //列表
  },
  onLoad() {},
  refreshdata() {
    this.setData({
      show: true
    })
  },
  onLoad() {
    this.radomData();
  },
  // 随机出数据
  radomData() {
    let item = {};
    let _length = this.data.wooklist.length || 0;

    for (let i = 0; i < 5; i++) {
      const _radom = Math.floor(Math.random() * 5);
      console.log(_radom);
      item.img = this.data.imglist[_radom];
      this.imageInfo(item.img);
      item.text = this.data.textlist[_radom];
      this.data.wooklist.push(item);
    }
    console.log(this.data.wooklist);
  },
  imageInfo(_src) {
    wx.getImageInfo({
      src: _src,
      success(imageInfo_src) {
        console.log(imageInfo_src)
      }
    })
  }

})