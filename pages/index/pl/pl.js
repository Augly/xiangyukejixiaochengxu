// pages/index/pl/pl.js
const config=require('../../../utils/config.js')
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
    console.log(options.id)
    this.setData({
      id:options.id
    })
  },
  /**
   * 发表评论
   */
  togo(){
    
    if (this.data.textIpt!=''){
      config.ajax('POST', {
        user_id: app.globalData.user_id,
        jid: this.data.id,
        word: this.data.textIpt,
        position: app.globalData.adder,
        lat: app.globalData.lat,
        lng: app.globalData.lng,
        is_show: 1,
        type:6
      }, config.setJoin, (res) => {
        console.log(res)
        if(res.data.code==1){
          config.mytoast('发表评论成功!', (res) => {
            wx.navigateBack({
              delta: 1,
            })
          })
        }
      }, (res) => {

      })
    }else{
      config.mytoast('评论不能为空',(res)=>{

      })
    }
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
    this.setData({
      textIpt:''
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
   * 发表评论
   */
  textIpt(e){
    this.setData({
      textIpt:e.detail.value
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})