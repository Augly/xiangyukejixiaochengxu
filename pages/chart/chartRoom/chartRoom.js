// pages/chart/chartRoom/chartRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      wx.getSystemInfo({
        success:(res)=>{
          this.setData({
            myheight: res.windowHeight - res.windowWidth/750*150
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    catch (err) {
      wx.showToast({
        title: '获取设备信息失败',
        icon: 'none',
        mask: true,
      })
    }
    finally {

    }
    this.toastedit = this.selectComponent("#myDialog")
    console.log(this.toastedit)  
  },
  DialogSend(){
    this.setData({
      isShow: false
    })
    console.log('点击了确认')
  },
  DialogCel() {
    console.log('点击了取消')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      config: {
        wrapBgcor: 'RGBA(0, 0, 0, 0.8)',   //wrap背景色
        myDialogBgcor: 'rgba(255, 255, 255, 1)', //Dialog背景色
        myDialogMain: '你好呀',  //Dialog内容
        myDialogWidth: '686rpx',  //Dialog宽度
        myDialog_contentPadding: '66rpx 119rpx',  //Dialog内容padding
        myDialog_contentFs: '36rpx',  //Dialog内容字号
        myDialog_bottonFs: '36rpx',  //Dialog按钮字号
        myDialog_delMain: '取消',  //Dialog取消文字
        myDialog_delBgcor: 'RGBA(235, 235, 235, 1)',  //Dialog取消按钮里面的
        myDialog_delCor: 'RGBA(0, 0, 0,1)',
        myDialog_sendMain: '确认',
        myDialog_sendBgcor: 'RGBA(152, 97, 225, 1)',
        myDialog_sendCor: 'RGBA(255, 255, 255, 1)',
        showCel: true
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