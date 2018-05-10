// pages/personl/Recharge/Recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapArr: ['10元', '20元', '30元', '40元', '50元', '60元', '70元', '80元', '90元'],
    myindex:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  click:function(e){
    this.setData({
      myindex: e.currentTarget.dataset.id,
      select: this.data.tapArr[e.currentTarget.dataset.id]
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