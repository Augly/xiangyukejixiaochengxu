let app = getApp()
const config=require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 重新拉起微信授权
  userInfoHandler: function (res) {
    var that = this
    if (res.detail.errMsg == "getUserInfo:fail auth deny") {
    } else if (res.detail.errMsg == "getUserInfo:ok") {
      console.log(res.detail.userInfo)
      app.globalData.userInfo = res.detail.userInfo
      config.ajax('POST',{
        user_id: app.globalData.user_id,
        user_nickname: res.detail.userInfo.nickName,
        avatar: res.detail.userInfo.avatarUrl,
        sex: res.detail.userInfo.gender
      }, config.authorize,(res)=>{
        wx.showLoading({
          title: '正在进入',
          mask: true,
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../begin/begin',
          })
        }, 1000)
      })
      
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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