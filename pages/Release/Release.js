// pages/Release/Release.js
const config = require("../../utils/config.js");
// 引入SDK核心类
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk=""
var interval = null //倒计时函数
let app=getApp()
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
        console.log(1)
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
    config.ajax('POST',{
      user_id: app.globalData.user_id,
      mobile: that.data.main,
      code: that.data.code
    }, config.bindMobile,(res)=>{
      if(res.data.code==1){
        wx.navigateTo({
          url: 'demanded/demanded?title=' + this.data.title + '&type=' + this.data.array[this.data.index],
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '验证码不正确',
          showCancel: false,
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
        config.ajax('POST',{
          user_id: app.globalData.user_id,
          mobile: that.data.main
        },config.sendCode,(res)=>{
          console.log(res)
        })
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
    config.ajax('POST', {

    }, config.nav, (res) => {
      console.log(res)
      this.setData({
        navData: res.data.data
      })
    }, (res) => {

    })
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
    console.log(this.data.selectIndex)
    if (this.data.selectIndex=='2'){
      config.ajax('POST',{
        user_id: app.globalData.user_id
      }, config.checkMobile,(res)=>{
        console.log(res)

        if(res.data.codo==1){
          wx.navigateTo({
            url: 'demanded/demanded?title=' + this.data.title + '&type=' + this.data.array[this.data.index]
          })
         
        }else{
          // wx.navigateTo({
          //   url: 'demanded/demanded?title=' + this.data.title + '&type=' + this.data.navData.need_name,
          // })
          this.setData({
            phoneMask: true
          })


        }
      })

    } else if (this.data.selectIndex == '1'){
       wx.navigateTo({
         url: 'push_experience/push_experience?title=' + this.data.title + '&type=' + this.data.navData.interest_name,
       })
    }else{
      wx.navigateTo({
        url: 'push_experience/push_experience?title=' + this.data.title + '&type=' + this.data.navData.share_name,
      })
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