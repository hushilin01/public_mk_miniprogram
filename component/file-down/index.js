/**
 * 视频下载的组件
 * params：{
 * initshow：是否展示组件
 * initpath:下载路径，
 * }
 * call劫持时候似乎有点问题，所以改用const that=this
 */
let that;
const constant = require("../../utils/constant.js");
let downloadTask = null;
Component({
  data: {
    showProgress: true, //是否展示进度条
  },
  ready() {
    that = this;
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示下载的弹窗
    initshow: {
      type: Boolean,
      value: false,
      observer: function(newvalue, oldvalue) {
        //true则开始
        this.readyToDown();
      }
    },
    // 下载的路径
    initpath: {
      type: String,
      value: '',
      observer: function(newvalue, oldvalue) {
        // 如果没有下载的路径，并且当前已经打开弹窗了暂时显示转圈圈/
        this.readyToDown();
      }
    }
  },
  data: {
    progress: 0, //下载的进度
  },
  methods: {
    // 下载前的准备
    readyToDown() {
      wx.hideLoading();
      // 如果没有路径，则是显示滚动
      if (!this.data.initpath) {
        wx.showLoading({
          title: '正在准备下载~',
        })

      } else if (this.data.initshow) {
        this.getsetiingconfig();
      } else {}

    },
    // 获取用户有没有打开下载权限
    getsetiingconfig() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting["scope.writePhotosAlbum"] === false) {
            getApp().globalData.powerfail({
              content: '保存视频失败,请检查是否在设置中允许使用相册功能',
              showCancel: true,
              confirmText: '前往设置',
              successcall: function() {
                wx.openSetting({})
              },
            })
            that.init();
          } else {
            this.checkNetworkStatus();
          }
        }
      })
    },
    // 下载并且保存至本地
    save() {
      downloadTask = wx.downloadFile({
        url: this.data.initpath,
        success: (downres) => {
          this.saveByType(downres.tempFilePath);
        },
        fail: () => {
          getApp().globalData.powerfail({
            content: '下载失败,请检查网络',
          })
        },
        complete: function() {
          that.init();
        }
      })
      // 监听下载的进度
      downloadTask.onProgressUpdate((onProgreesres) => {
        // 下载网页等，没有progress，则显示下载中
        if (onProgreesres.progress) {
          this.setData({
            showProgress: false,
            progress: 0
          })
          // 取消掉监听进度的事件
          downloadTask.offProgressUpdate(offProgressres => {})
        }
        this.setData({
          showProgress: true,
          progress: onProgreesres.progress || 0
        });
      })
    },
    // 取消下载
    cancelevent() {
      downloadTask ? downloadTask.abort() : '';
      that.init();
      wx.showToast({
        title: '已取消下载!',
        icon: "none",
        duration: 2000,
      });
    },
    //当前网络环境
    checkNetworkStatus() {
      wx.getNetworkType({
        success: (networkres) => {
          if (networkres.networkType === 'none') {
            wx.showToast({
              title: '当前无网络',
              icon: "none"
            })
          } else if (networkres.networkType === 'wifi') {
            this.save();
          } else {
            wx.showModal({
              title: '提示',
              content: '当前为非wifi环境下载，是否继续？',
              success: (modalres) => {
                if (modalres.confirm) {
                  this.save();
                } else {
                  wx.showToast({
                    title: '已取消下载',
                    icon: "none"
                  })
                  that.init();
                }
              }
            })
          }
        },
      })
    },
    // 根据文件的尾缀来辨别类型
    saveByType: (_path) => {
      // 视频文件
      let _pathlist = _path.split('.');
      let _type = _pathlist[_pathlist.length - 1];
      // 视频文件
      if (constant.videoType.indexOf(_type) != -1) {
        that.saveVideoLocal(_path);
      } else {
        wx.showToast({
          title: `该文件的类型为：${_type},未定义操作`,
          icon: "none"
        })
      }
    },
    // 保存视频至本地
    saveVideoLocal(_path) {
      wx.saveVideoToPhotosAlbum({
        filePath: _path,
        success() {
          wx.showToast({
            title: '保存成功!',
            icon: "none",
            duration: 2000
          })
        },
        fail: function() {
          wx.showToast({
            title: '保存失败',
            icon: "none"
          })
        },
      })
    },
    //下载之后的初始化
    init() {
      that.setData({
        initshow: false,
        progress: 0,
        showProgress: true
      });
    }

  }
})