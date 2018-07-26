// pages/index/wantBill/wantBill.js
// const config=require('/utils/config.js');

const config=require('../../../utils/config.js');
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'06:00',
    sureTitle:'确认接单'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    config.ajax('POST',{
      err_id:options.id,
      lat: app.globalData.lat,
      lng: app.globalData.lng
    }, config.receipt,(res)=>{
      console.log(res)
      this.setData({
        alldata:res.data.data
      })
    },(res)=>{

    })
  },
  change(e){
    this.setData({
      time: e.detail.value
    })
  },
  tologn(){
    config.ajax('POST', {
      err_id: this.data.id,
      lat: app.globalData.lat,
      lng: app.globalData.lng,
      send_time: this.data.time,
      recieve_id: app.globalData.user_id
    }, config.receipt, (res) => {
      console.log(res)
      if(res.data.code='0'){
        config.mytoast(res.data.message,(res)=>{

        })
      }
      // this.setData({
      //   alldata: res.data.data
      // })
    }, (res) => {

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