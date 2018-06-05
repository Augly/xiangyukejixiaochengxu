// pages/personl/Put_forward/Put_forward.js
const config=require('../../../utils/config.js')
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.withdraw,(res)=>{
      console.log(res)
      that.setData({
        bill:res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 提现规则
   */
  rule(){
    wx.navigateTo({
      url: '../rule/rule',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 提现提交
   */
  tx:function(){
    var that=this
    config.ajax('POST',{
      user_id: app.globalData.user_id,
      price:0.5,
      time: that.data.bill.time,
      authcode:that.data.bill.authcode
    },config.tx,(res)=>{
      console.log(res)
    })
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