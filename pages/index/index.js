//index.js
//获取应用实例
const app = getApp();
const config = require("../../utils/config.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index:1,
    myindex:1,
    myimgUrl: config.myimgUrl,
    imgUrls: [
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
      'http://xiangyu.wx.bronet.cn/images/abanner@2x.png',
    ],
    note:[
      {
        title: '为爱的人准备礼物',
        mian_imgurl: 'http://xiangyu.wx.bronet.cn/images/e01@2x.png',
        authur_imgurl: 'http://xiangyu.wx.bronet.cn/images/apic01@2x.png',
        authur_name: '仇益阳',
        authur_adder: '天津.建国楼',
        authur_distance: '0.5km',
        authur_called: true,
        authur_type: 'type_one',
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
        authur_act:'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
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
         authur_act: 'http://xiangyu.wx.bronet.cn/images/a01@2x.png'
       },
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    circular:true,
    true: true,
    scrollView:{
      width:'100%',
      height:'100%',
    },
  },

  //事件处理函数
  navClick: function(event) {
    var that=this
    this.setData({
      index: event.currentTarget.dataset.id
    })
    if (event.currentTarget.dataset.id=='2'){
      //获取共享经验数据
      config.ajax('POST', {
        user_id: app.globalData.user_id,
        lat: app.globalData.lat,
        lng: app.globalData.lng
      }, config.getexper, (res) => {
        console.log(res.data.data.list)

        for (let i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].distance = (res.data.data.list[i].distance / 1000).toFixed(2)
        }
        that.setData({
          note: res.data.data.list
        })
      })
    } else if (event.currentTarget.dataset.id == '3'){
      //获取兴趣社数据
      config.ajax('POST', {}, config.interestSort, (res) => {
        console.log(res.data.data)
        that.setData({
          interestSort: res.data.data
        })
      })

      config.ajax('POST', {
        user_id: app.globalData.user_id,
        lat: app.globalData.lat,
        lng: app.globalData.lng,
        sort_id:''
      }, config.insterstList, (res) => {
        
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].distance = (res.data.data[i].distance / 1000).toFixed(2)
        }
        console.log(res.data.data)
        that.setData({
          interestList: res.data.data
        })
        that.setData({
          'interestList.myimgUrl':config.myimgUrl
        })
      })
    }
  },
  demindtap:function(event){
    this.setData({
      myindex: event.currentTarget.dataset.id
    })
  },
  scrolltolower:function(){
      console.log(1)
  },
  /**
   * 获取设备信息
   */
  getSystemInfo(){
    let that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          'scrollView.height': res.windowHeight+'px',
        })
      }
    })
  },
  onLoad: function () {
    this.setData({
      imgurl: app.globalData.imgurl
    })
    this.getSystemInfo()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
