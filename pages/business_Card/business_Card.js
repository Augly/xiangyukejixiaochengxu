// pages/business_Card/business_Card.js
const config=require('../../utils/config.js')
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
    config.ajax('POST',{
      user_id: app.globalData.user_id
    }, config.user_card,(res)=>{
      console.log(res)
      if(res.data.data.sex==1){
          res.data.data.sex="男"
      }else{
        res.data.data.sex = "女"
      }
      this.setData({
        alldata:res.data.data
      })
    })
  },
  /**
   * 编辑名片
   */
  editCard:function(){
    wx.navigateTo({
      url: '../business_edit/business_edit',
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