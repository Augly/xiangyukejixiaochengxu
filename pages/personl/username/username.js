// pages/personl/username/username.js
const config = require("../../../utils/config.js");
const app = getApp();
var myallinfo = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: options.name
    })
  },
  /**
   *修改用户名
   */
  user:function(e){
    this.setData({
      user:e.detail.value
    })
  },
  /**
   * 保存
   */
  submit:function(){
    var that=this;
    config.ajax('POST',{
      user_id: app.globalData.user_id,
      user_nickname: that.data.user
    }, config.setInfo,(res)=>{
          if(res.data.message=='成功'){
            config.mytoast('修改成功!',(res)=>{
              wx.navigateBack({
                delta: 1,
              })
            })
          }
      },(res)=>{

      })},
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
   * 保存修改
   */
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