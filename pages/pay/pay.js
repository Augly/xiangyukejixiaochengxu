// pages/pay/pay.js
const app=getApp()
let config=require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (JSON.parse(options.mytype).allow_balance==1){
      this.setData({
        index:1
      })
    }else{
      this.setData({
        index: 2
      })
    }
    this.setData({
      alldata: JSON.parse(options.mytype)
    })
  },

  /**
   * 更换支付方式
   */
  check:function(e){
    this.setData({
      index: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 确认支付
   */
  sumbit:function(){
    var that=this
    config.ajax('POST',{
      user_id: app.globalData.user_id,
      type: that.data.index,
      order_id: that.data.alldata.order_id
    }, config.payOrder,(res)=>{
        if(res.data.code==1){
          if (res.data.data.length == 0 || res.data.data == '' || res.data.data == null || res.data.data == undefined) {
            wx.showToast({
              title: '余额支付成功',
              icon: '',
              duration: 1500,
              mask: true, 
              success:function(res){
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../personl/myBackpaker/myBackpaker',
                  })
                },1500)
              }
            })
          } else {
            config.pay(res, (res) => {
              wx.showToast({
                title: '微信支付成功',
                icon: '',
                duration:1500,
                mask: true,
                success:function(){
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '../personl/myBackpaker/myBackpaker',
                    })
                  }, 1500)
                }
              })
            })
          }
        }else{
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration:1500,
            mask: true,
          })
        }
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