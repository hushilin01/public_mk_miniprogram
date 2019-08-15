// import regeneratorRuntime from '/utils/runtime.js';
import ghhttp from '/utils/http.js';
import constant from '/utils/constant.js'
import {
  powerfail,
  qcgetUserInfo
} from '/utils/functionPower.js';
//app.js
App({
  onLaunch: function() {
    this.qcshare();
  },
  globalData: {
    ghhttp,
    qcgetUserInfo,
    powerfail,
    userInfo: null

  },
  /**
   * 
   *  统一封装share----分享的设置，
   * 如果不要，则页面的data中设置一个qcappnoshare为true
   * 要设置分享参数的，则设置为qcappshareinfo
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