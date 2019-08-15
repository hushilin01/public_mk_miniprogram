// url:路径
// params：参数
// args:其他参数
import constant from './constant.js';
export default function ghhttp({
  url,
  params = {},
  ...args
}) {
  // 增加token
  Object.assign(args, {
    token: wx.getStorageSync('token')
  })
  // 所有的请求，header默认携带token
  let header = args.header || {
    'Content-Type': 'application/json',
    'token': args.token || ''
  }
  //请求的参数
  let data = params || {}
  // 请求的方式
  let method = args.method || 'GET'
  // hideLoading可以控制是否显示加载状态
  if (!args.hideLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  // 如果请求带http的话，则不添加域名
  if (!/^(http|https):/.test(url)) {
    url = `${constant.domain}${url}`
  }
  //promise封装请求
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data: params,
      header,
      success: (res) => {
        if (res && res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
        errormessage();
      },
      complete: (e) => {
        wx.hideLoading();
      }
    })
  })
  // 
  function errormessage() {
    wx.showToast({
      title: '请求接口失败',
      duration: 2000,
      icon: 'none'
    })
  }

}