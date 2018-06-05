// pages/personl/push/push.js
const config=require('../../../utils/config.js')
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 500,
    duration: 300,
    index: 0
  },
  clicktap(e) {
    var that=this
    this.setData({
      index: e.currentTarget.dataset.id
    })
    if(this.data.index=='0'){
      config.ajax('POST', {
        user_id: app.globalData.user_id
      }, config.joinShare, (res) => {
        for(let n=0;n<res.data.data.length;n++){
          res.data.data[n].create_time = config.timeFormat(res.data.data[n].create_time*1000);
        }
        that.setData({
          sharelist:res.data.data
        })
      })
    }else{
      config.ajax('POST', {
        user_id: app.globalData.user_id
      }, config.joinInterest, (res) => {
        console.log(res)
        for (let n = 0; n < res.data.data.length; n++) {
          res.data.data[n].create_time = config.timeFormat(res.data.data[n].create_time * 1000);
        }
        that.setData({
          interestlist: res.data.data
        })
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
        })
      }
    })
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.joinShare,(res)=>{
      for (let n = 0; n < res.data.data.length; n++) {
        res.data.data[n].create_time = config.timeFormat(res.data.data[n].create_time * 1000);
      }
      that.setData({
        sharelist: res.data.data
      })
    })
  },


  finish: function (e) {
    this.setData({
      index: e.detail.current
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