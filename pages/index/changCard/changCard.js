// pages/index/changCard/changCard.js
const config=require('../../../utils/config.js')
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeCard: {
      changeCard: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //跳页交换名片
    console.log(options)
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      send_id: options.senid
    }, config.userCard, (res) => {
      console.log(res)
      this.setData({
        'changeCard.changeCard': true,
        'changeCard.data': res.data.data[0]
      })
    })
  }, 
   /**
   * 关闭名片按钮
   */
  cendelChangeCard: function () {
    this.setData({
      'changeCard.changeCard': false
    })
    wx.navigateBack({
      delta: 1,
    })
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