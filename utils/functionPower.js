// 授权失败之后的弹窗！
const powerfail = (obj = {}) => {
  console.log(obj.successcall);
  wx.showModal({
    title: obj.title || '提示',
    content: obj.content || '',
    showCancel: obj.showCancel || false,
    cancelText: obj.cancelText || '取消',
    confirmText: obj.confirmText || '知道了',
    success(res) {
      if (res.confirm) {
        obj.successcall ? obj.successcall() : console.log("保存失败，原因暂不明确");
      } else if (res.cancel) {}
    }


  })
}
// 获取用户的个人信息,不需要开启设置
const qcgetUserInfo = data => {
  if (data.detail.userInfo) {
    getApp().globalData.userInfo = data.detail.userInfo;
    // 把个人的信息用string的形式持久化
    wx.setStorageSync(`userInfo`, JSON.stringify(data.detail.userInfo));
  } else {
    powerfail({
      content: '请在设置中打开用户信息选项',
      successcall: function() {
        wx.openSetting();
      }
    })
  }
}
export {
  powerfail,
  qcgetUserInfo
}