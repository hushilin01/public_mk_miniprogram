//视频详情
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showprogress: true,
    progress: 0,
    srcpath: ''
  },
  onShow: function() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    setTimeout(function() {
      that.setData({
        // 文件路径
        // srcpath: `http://baobab.kaiyanapp.com/api/v1/playUrl?vid=146036&resourceType=video&editionType=high&source=qcloud&playUrlType=url_oss`
        // 图片路径
        srcpath: `http://7xi8d6.com1.z0.glb.clouddn.com/20171113084220_LuJgqv_sakura.gun_13_11_2017_8_42_12_311.jpeg`
      })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  },
  opensettinng: function() {
    wx.openSetting({});
  },
  savevideo() {
    this.setData({
      show: true
    })

  }
})