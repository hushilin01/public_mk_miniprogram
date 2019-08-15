/**
 * 视频下载的组件
 * params：{
 * initshow：是否展示组件
 * initshowprogress：是否展示进度条
 * initpath:下载路径，
 * }
 */
let downloadTask = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示下载的弹窗
    initshow: {
      type: Boolean,
      value: false,
      observer: function(newvalue, oldvalue) {
        if (newvalue && this.data.initpath) {
          wx.hideLoading();
          console.log("hello,world");
          this.getsetiingconfig();
          // this.save();
        } else {
          wx.showLoading({
            title: '正在准备下载',
          })
        }
      }
    },
    // 是否展示下载的进度条
    initshowprogress: {
      type: Boolean,
      value: true,
    },
    // 下载的路径
    initpath: {
      type: String,
      value: '',
      observer: function(newvalue, oldvalue) {
        // 如果没有下载的路径，并且当前已经打开弹窗了暂时显示转圈圈/
        if (newvalue != oldvalue && newvalue != '' && this.data.initshow) {
          this.save();
          wx.hideLoading();
        }
      }
    }
  },
  data: {
    progress: 0, //下载的进度
  },
  methods: {
    // 获取用户有没有打开下载权限
    getsetiingconfig() {
      let that = this;
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.writePhotosAlbum"] === false) {
            that.setData({
              initshow: false,
            });
            getApp().globalData.powerfail({
              content: '保存图片失败,请检查是否在设置中允许使用相册功能',
              showCancel: true,
              confirmText: '前往设置',
              successcall: function() {
                wx.openSetting({})
              },
            })
          } else {
            that.save();
          }
        }
      })
    },
    // 下载并且保存至本地
    save() {
      let that = this;
      downloadTask = wx.downloadFile({
        url: this.data.initpath,
        success: function(data) {
          console.log(data);
          wx.saveImageToPhotosAlbum({
            filePath: data.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存成功!',
                icon: "none",
                duration: 2000
              })
            },
            fail: function() {
              getApp().globalData.powerfail({
                content: '保存失败',
              })
            },
            complete: function() {
              that.setData({
                initshow: false,
                progress: 0,
              });
              wx.hideLoading();
            }
          })
        },
        fail: () => {
          getApp().globalData.powerfail({
            content: '下载失败,请检查网络',
          })
        }
      })
      // 监听下载的进度
      downloadTask.onProgressUpdate((res) => {
        this.setData({
          progress: res.progress
        });
      })

    },
    // 取消下载
    cancelevent() {
      downloadTask.abort();
      this.setData({
        initshow: false,
        progress: 0, //进度条归0
      })
      wx.showToast({
        title: '已取消下载!',
        icon: "none",
        duration: 2000,
      });
    }
  }
})