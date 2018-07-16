// pages/personl/personl_Set/personl_Set.js
const config = require("../../../utils/config.js");
const app = getApp();
var myallinfo = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    array: ['男', '女'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    config.ajax('POST', {
      user_id: app.globalData.user_id
    }, config.setInfo, (res) => {
      console.log(res.data.data)
      myallinfo = res.data.data
      that.setData({
        myinfo: res.data.data,
        
      })
    })
  },
  /**
   * 选择性别
   */
  bindPickerSex: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    myallinfo.sex = e.detail.value;
    config.ajax('POST', myallinfo, config.setInfo, (res) => {
      that.setData({
        index: e.detail.value
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 选择出生年月
   */
  bindDate: function (e) {
    var that = this;
    myallinfo.birthday = e.detail.value;
    var st = myallinfo.birthday.split('-')
    var sm = parseInt(st[1] + st[2])
    var n = 0
    if (sm >= 321 && sm <= 419) {
      n ='白羊座'
    } else if (sm >= 420 && sm <= 520) {
      n = '金牛座'
    } else if (sm >= 521 && sm <= 621) {
      n = '双子座'
    } else if (sm >= 622 && sm <= 722) {
      n = '巨蟹座'
    } else if (sm >= 723 && sm <= 822) {
      n = '狮子座'
    } else if (sm >= 823 && sm <= 922) {
      n = '处女座'
    } else if (sm >= 923 && sm <= 1023) {
      n = '天枰座'
    } else if (sm >= 1024 && sm <= 1122) {
      n = '天蝎座'
    } else if (sm >= 1123 && sm <= 1221) {
      n = '射手座'
    } else if (sm >= 1222) {
      n = '魔蝎座'
    } else if (sm >= 120 && sm <= 218) {
      n = '水瓶座'
    } else if (sm >= 219 && sm <= 320) {
      n = '双鱼座'
    }
    myallinfo.constellation =n;
    config.ajax('POST', myallinfo, config.setInfo, (res) => {
      that.setData({
        date: e.detail.value
      })
    })
  },


  /**
   * 修改用户名
   */
  userName: function () {
    wx.navigateTo({
      url: '../username/username?maadder=' + JSON.stringify(this.data.myinfo),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 选择省市区
   */
  bindRegionChange: function (e) {
    var that = this;
    myallinfo.live = e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2];
    config.ajax('POST', myallinfo, config.setInfo, (res) => {
      that.setData({
        region: e.detail.value
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})