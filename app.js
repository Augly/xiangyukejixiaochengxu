//app.js
const config = require("utils/config.js");
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let param = {
          code: res.code
        }
        //参数对象
        config.ajax("POST", param, config.getOpenid, (res) => {
          //ajax访问成功函数
          this.globalData.user_id = res.data.data.user_id
        }, (res) => {
          //ajax访问失败函数
        }, (res) => {
          //不管成功与否都调用函数
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    user_id:null,
    imgurl:'http://xiangyu.wx.bronet.cn/images/',
  }
})