// pages/personl/Recharge/Recharge.js
var app=getApp()
const config=require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapArr: [{ name: '10元', value: 10 }, { name: '20元', value: 20 }, { name: '30元', value: 30 }, { name: '40元', value: 40 }, { name: '50元', value: 50 }, { name: '60元', value: 60 }, { name: '70元', value: 70 }, { name: '80元', value: 80 }, { name: '90元', value: 90 }],
    myindex: '0',
    value:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  click: function (e) {
    this.setData({
      myindex: e.currentTarget.dataset.id,
      select: this.data.tapArr[e.currentTarget.dataset.id],
      value: this.data.tapArr[e.currentTarget.dataset.id].value
    })
  },
  sureRC(){
    config.ajax('POST',{
      user_id: app.globalData.user_id,
      price:this.data.value
    },config.Recharge,(res)=>{
      config.pay(res,(res)=>{
        console.log(1221)
      })
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