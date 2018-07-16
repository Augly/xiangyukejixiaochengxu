// pages/test/test.js
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

    
  },
  /**
   * 创建一个链接
   */
  test(){
   
  },

  ipt(e){
    this.setData({
      vl:e.detail.value
    })
  },

  send(){
    var that=this
    wx.sendSocketMessage({
      data:that.data.vl,
      success:function(res){ 
        console.log('已发送' + that.data.vl)
      },
      fail:function(){
        console.log('发送失败')
      },
      complete:function(){
        // console.log(13)
      }
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
    wx.connectSocket({
      url: 'wss://xiangyu.lu.broteam.cn:9501',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        wx.onSocketOpen(function (res) {
          console.log('WebSocket连接已打开！')
          wx.sendSocketMessage({
            data: '1',
            success: function () {
              console.log('第一次发送1')
            },
            fail: function () {
              console.log('发送失败')
            },
            complete: function () {
              // console.log(23)
            }
          })
        })
        wx.onSocketMessage(function (res) {
          console.log('收到消息')
          console.log('收到服务器内容：' + res.data)
        })
        wx.onSocketClose(function (res) {
          console.log('WebSocket 已关闭！')
        })
        wx.onSocketError(function (res) {
          console.log('WebSocket连接打开失败，请检查！')
        })
      },
      fail: function () {
        console.log(res)
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})