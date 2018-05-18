// pages/Release/Release.js
const config = require("../../utils/config.js");
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['跑腿','问答','二手置换'],
    index:0,
    selectIndex:1,
    phoneMask:false,
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    maxlength: 11,
    main: "",
    code: "",
    disabled: true,
    openid: "",
    info: "",
    title:"" //发布标题
  },
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: true
        })
      }
    }, 1000)
  },
  fou: function (e) {
    this.setData({
      main: e.detail.value
    })
  },
  fouone: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  submit: function () {
    var that = this
    var myinfo = JSON.stringify(that.data.info)
    wx.request({
      url: "https://skiing.wx.bronet.cn/index.php/Api/Index/do_bing_phone",
      data: {
        openid: that.data.openid,
        tel: that.data.main,
        code: that.data.code
      },
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        wx.navigateTo({
          url: "../ordel/ordel?info=" + myinfo
        })
      }
    })
  },
  getVerificationCode() {
    var that = this
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    if (reg.test(that.data.main) == true) {
      var that = this
      if (that.data.disabled == true) {
        that.getCode();
        that.setData({
          disabled: false
        })
        // wx.request({
        //   url: "https://skiing.wx.bronet.cn/index.php/Api/Index/send_code",
        //   data: {
        //     openid: that.data.openid,
        //     tel: that.data.main
        //   },
        //   header: {
        //     'Content-type': 'application/x-www-form-urlencoded'
        //   },
        //   method: "POST",
        //   success: function (res) {
        //     if (res.data.state == "success") {
        //       wx.showToast({
        //         title: '验证码已发送',
        //         icon: "success",
        //         duration: 1500
        //       })
        //     }
        //   }
        // })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '手机号格式错误',
        success: function (res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // } else if (res.cancel) {
          //   console.log('用户点击取消')
          // }
        }
      })
    }
    



  },
  getTitle(e){
    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 选择类型
   */
  click(event){
    this.setData({
      selectIndex: config.getDataset(event, 'id')
    })
  },
  /**
   * 下一步
   */
  nextStep(){
    if(this.data.title==""){
      wx.showModal({
        title: '提示',
        content: '标题不能为空!',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确认',
        confirmColor: '',
        success: function(res) {
          if (res.confirm){

          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return false
    }
    if (this.data.selectIndex=='2'){
      this.setData({
        phoneMask:true
      })
    } else if (this.data.selectIndex == '1'){
       wx.navigateTo({
         url: 'push_experience/push_experience?title='+this.data.title,
       })
    }else{

    }
  },
  /**
   * 关闭手机验证
   */
  hidemask(){
    this.setData({
      phoneMask:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
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