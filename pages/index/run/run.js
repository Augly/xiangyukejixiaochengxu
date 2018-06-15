// pages/index/run/run.js
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
    console.log(options)
    config.ajax('POST',{
      type:1,
      need_id:options.id,
      user_id: options.userid,
      lat: app.globalData.lat,
      lng: app.globalData.lng
    }, config.errDetail,(res)=>{
      console.log(res.data.data)
      res.data.data.user.distance = (res.data.data.user.distance / 1000).toFixed(2)
      res.data.data.err.create_time = config.timeFormat(res.data.data.err.create_time * 1000)
      
      this.setData({
        alldata:res.data.data
      })
    })
    this.setData({
      imgUrl: config.imgurl + 'kong@2x.png'
    })

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 评价
   */
  pl:function(){
    wx.navigateTo({
      url: '../pl/pl',
    })
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