// import regeneratorRuntime from '/utils/runtime.js';
const constant = require('/utils/constant.js')
const util = require('/utils/util.js')
//app.js
App({
  onLaunch: function() {
    this.qcshare();
    this.wxLogin();
  },
  // 几个共有方法
  util,
  constant,
  globalData: {
    userInfo: null,
    domain: constant.domain,
    openid: '', //用户唯一表示
  },
  // 用户登录小程序，获取唯一标识
  /**
   * 警告，正常情况要后台去获取，这时间不够，暂时前端获取
   * 
   */
  wxLogin() {
    wx.login({
      success: (res) => {
        // 前端去获取用户的唯一标识，有风险性
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: constant.miniProgrammerInfo.APPID,
            secret: constant.miniProgrammerInfo.SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          success: (usertokeninfo) => {
            this.globalData.openid = usertokeninfo.data.openid;
            wx.setStorage({
              key: 'openid',
              data: usertokeninfo.data.openid,
            })
          }
        })
      }
    })
  },
  /**
   * 
   *  统一封装share----分享的设置，
   * 如果不要，则页面的data中设置一个qcappnoshare为true
   * 要设置分享参数的，则设置为qcappshareinfo
   * 页面内的shareinfomessage方法必须保留
   */
  qcshare() {
    wx.onAppRoute(function(data) {
      // 当前页面
      let view = getCurrentPages()[getCurrentPages().length - 1];
      console.log(view);
      let _data = null;
      if (view) {
        _data = view.data;
        // 如果页面含有qcappnoshare这个变量，则不分享
        if (data.qcappnoshare) {
          return;
        } else {
          view.onShareAppMessage = function() {
            console.log(`${constant.shareinfo.path}`);
            //分享配置
            let shareinfo = {
              title: constant.shareinfo.title,
              path: _data.qcappshareinfo ? `/${view.route}?${JSON.stringify(_data.qcappshareinfo)}` : `/${view.route}`,
              imageUrl: constant.shareinfo.imageUrl ? constant.shareinfo.imageUrl : undefined
            };
            // 如果要全部到首页，则再这儿改动下
            shareinfo.path = `${constant.shareinfo.path}`
            return shareinfo;

          }
        }
      }
    })
  }
})