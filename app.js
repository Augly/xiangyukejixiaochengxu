//app.js
const config = require("utils/config.js");
const QQMapWX = require('utils/qqmap-wx-jssdk.js');
var qqmapsdk = ""
App({
  onLaunch: function () {
    // 登录
    qqmapsdk = new QQMapWX({
      key: 'CRZBZ-GGA6S-AFZOH-6JEIJ-RFOAE-RSB5H'
    });
    var that=this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let param = {
          code: res.code
        }
        //参数对象
        config.ajax("POST", param, config.getOpenid, (res) => {
          //ajax访问成功函数
          that.globalData.user_id = res.data.data.user_id
          wx.getLocation({
            type: 'wgs84',
            success:(res)=>{
              that.globalData.lat = res.latitude
              that.globalData.lng = res.longitude
              qqmapsdk.reverseGeocoder({
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                success: function (res) {
                  console.log(res.result.address_component);
                  that.globalData.adder = res.result.address_component.city + ' · ' + res.result.address_component.district
                },
                fail: function (res) {
                  console.log(res);
                 
                },
                complete: function (res) {
                  // console.log(res);
                }
              });
            },
            fail:(res)=>{
              wx.navigateBack({ delta: 1 })
            }

          })
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
    lat:null,
    lng:null,
    imgurl:'http://xiangyu.wx.bronet.cn/images/',
    adder:null
  }
})



