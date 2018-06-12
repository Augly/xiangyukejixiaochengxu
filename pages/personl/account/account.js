// pages/personl/account/account.js
const config=require('../../../utils/config.js')
let app=getApp();
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
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.myBalance,(res)=>{
      console.log(res)
      this.setData({
        balance: res.data.data.balance
      })
    })
  },
  /**
   * 充值
   */
  cz:function(){
    wx.navigateTo({
      url: '../Recharge/Recharge',
    })
  },
  /**
   * 提现
   */
  tx:function(){
    wx.navigateTo({
      url: '../Put_forward/Put_forward',
    })
  },
  /**
   * 提现规则
   */
  rule:function(){
    wx.navigateTo({
      url: '../rule/rule',
    })
  },
  /**
   * 我的礼物
   */
  mygift:function(){
    wx.navigateTo({
      url: '../mygift/mygift',
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