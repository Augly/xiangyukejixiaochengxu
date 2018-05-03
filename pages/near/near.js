// pages/near/near.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollView: {
      width: '100%',
      height: '100%',
    },
    note: [
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_class: 'one',
        authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_class: 'two',
        authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_class:'one',
        authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_class: 'one',
        authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
        authur_class: 'two',
        authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
      },
    ],
  },
  /**
    * 获取设备信息
    */
  getSystemInfo() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          'scrollView.height': res.windowHeight + 'px',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo()
  },
  /**
   * 滑动事件
   */
  scrolltolower: function () {
    console.log(1)
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