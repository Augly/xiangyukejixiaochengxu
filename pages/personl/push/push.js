// pages/personl/push/push.js
const config=require('../../../utils/config.js')
let app=getApp()
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
    index:0
  },
  clicktap(e){
    this.setData({
      index: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id==0){
      config.ajax('POST', {
        user_id: app.globalData.user_id
      }, config.user_share, (res) => {
        console.log(res)
        this.setData({
          myShare: res.data.data
        })
      })
    } else if (e.currentTarget.dataset.id == 1){
      config.ajax('POST', {
        user_id: app.globalData.user_id
      }, config.user_interest, (res) => {
        console.log(res)
        this.setData({
          myInterest : res.data.data
        })
      })
    }else{
      config.ajax('POST', {
        user_id: app.globalData.user_id
      }, config.user_need, (res) => {
        console.log(res)
        this.setData({
          myNeed: res.data.data
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
        })
      }
    })
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.user_share,(res)=>{
      console.log(res)
      this.setData({
        myShare:res.data.data
      })
    })

  },
  finish:function(e){
    this.setData({
      index: e.detail.current
    })
  },
  /**
 * 跳转到共享经验详情
 */
  share: function (e) {
    wx.navigateTo({
      url: '../../Release/experience_res/experience_res?share_id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 跳转到兴趣社详情
   */
  lookinterset: function (e) {
    wx.navigateTo({
      url: '../../Release/Interest/Interest?id=' + e.currentTarget.dataset.id,
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