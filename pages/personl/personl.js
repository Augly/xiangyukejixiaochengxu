// pages/personl/personl.js
const config = require("../../utils/config.js");
const app=getApp();
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
    var that=this;
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.person,(res)=>{
      console.log(res)
        that.setData({
          alldata:res.data.data
        })
    })
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
/**
 * 我的发布
 */
  push:function(){
    wx.navigateTo({
      url: 'push/push',
    })
  },
  //我的参与
  myjoin(){
    wx.navigateTo({
      url: '../personl/join/join',
    })
  },
  /***
   * 我的收藏
   */
  Collection(){
    wx.navigateTo({
      url: '../Collection/Collection',
    })
  },

  //我的钱包
  mybill(){
      wx.navigateTo({
        url: 'account/account',
      })
  },
  
  //我的名片
  mycard:function(){
    wx.navigateTo({
      url: '../business_Card/business_Card',
    })
  },
  fans:function(){
    wx.navigateTo({
      url: 'fans/fans?_type=粉丝',
    })
  },
  follow:function(){
    wx.navigateTo({
      url: 'fans/fans?_type=关注',
    })
  },

  _set:function(){
    wx.navigateTo({
      url: 'personl_Set/personl_Set',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    var that = this;
    config.ajax('POST', {
      user_id: app.globalData.user_id
    }, config.person, (res) => {
      console.log(res)
      that.setData({
        alldata: res.data.data
      })
    })
    this.setData({
      userInfo: app.globalData.userInfo
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