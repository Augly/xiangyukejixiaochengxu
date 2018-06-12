// pages/personl/Put_forward/Put_forward.js
const config=require('../../../utils/config.js')
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myviff: 0.00
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
   * 输入提现金额
   */
  iptall:function(e){
    if (e.detail.value > this.data.bill.balance){
      this.setData({
        myviff: this.data.bill.balance
      })
    } else if (e.detail.value == '' || e.detail.value ==0){
      this.setData({
        myviff:0.00
      })
    }
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
    if (this.data.myviff>0){
      config.ajax('POST', {
        user_id: app.globalData.user_id,
        price: this.data.myviff,
        time: that.data.bill.time,
        authcode: that.data.bill.authcode
      }, config.tx, (res) => {
        console.log(res)
        wx.showToast({
          title: '提现成功',
          icon: 'none',
        })
      })
    }
  },
  //全部提现
  allmoney:function(){
    var that = this
    config.ajax('POST', {
      user_id: app.globalData.user_id,
      price: this.data.bill.balance,
      time: that.data.bill.time,
      authcode: that.data.bill.authcode
    }, config.tx, (res) => {
      console.log(res)
      wx.showToast({
        title: '提现成功',
        icon: 'none',
      })
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